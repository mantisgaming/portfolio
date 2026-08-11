/** @type {WebGL2RenderingContext} */
var gl;

/** @type {HTMLCanvasElement} */
var canvas;

/** @type {number} */
var startTime;
/** @type {number} */
var previousTime;

// General WebGL data
/** @type {WebGLShader} */
var shaderProgram;

// Ground Plane
/** @type {WebGLBuffer} */
var groundPlaneBuffer;
/** @type {WebGLBuffer} */
var groundPlaneElementBuffer;
/** @type {WebGLVertexArrayObject} */
var groundPlaneVAO;

//Exhibits
/** @type {ExhibitRobotArm} */
var robotArmExhibit;
/** @type {Aquarium} */
var aquariumExhibit;
/** @type {RollerCoasterExhibit} */
var rollerCoasterExhibit;
/** @type {ExhibitNewtonsCradle} */
var newtonsCradleExhibit;

/**
 * @abstract
 * @class
 */
class Exhibit {
  /** @type {[number, number, number]} */
  position = [0, 0, 0];

  /**
   * Update and render the animation
   * @abstract
   * @param {number} dt Change in time since last update
   */
  render(dt) {}
}

/**
 *
 * @class
 */
class Player {
  position = [0, 1.75, 0];
  orientation = [0, 0];
  moveInput = [0, 0];

  sensitivity = 0.2;
  moveSpeed = 4;

  get cameraMatrix() {
    return mult(
      mult(
        mult(perspective(90, 16 / 9, 0.03, 50), rotateX(-this.orientation[1])),
        rotateY(-this.orientation[0]),
      ),
      translate(negate(this.position)),
    );
    //return mult(translate(0, 0.5, 0), perspective(90, 16 / 9, 0.03, 20));
  }

  /**
   *
   * @param {MouseEvent} e Mouse move event
   */
  mouseMove(e) {
    this.orientation[0] += -e.movementX * this.sensitivity;
    this.orientation[1] += -e.movementY * this.sensitivity;

    this.orientation[0] += 360;
    this.orientation[0] %= 360;
    this.orientation[1] = Math.min(90, Math.max(-90, this.orientation[1]));
  }

  /**
   *
   * @param {KeyboardEvent} e Key down event
   */
  keyDown(e) {
    if (e.repeat) return;
    switch (e.key.toLowerCase()) {
      case "w":
        this.moveInput = add(this.moveInput, [0, -1]);
        break;
      case "a":
        this.moveInput = add(this.moveInput, [-1, 0]);
        break;
      case "s":
        this.moveInput = add(this.moveInput, [0, 1]);
        break;
      case "d":
        this.moveInput = add(this.moveInput, [1, 0]);
        break;
    }
  }

  /**
   *
   * @param {KeyboardEvent} e Key up event
   */
  keyUp(e) {
    if (e.repeat) return;
    switch (e.key.toLowerCase()) {
      case "w":
        this.moveInput = subtract(this.moveInput, [0, -1]);
        break;
      case "a":
        this.moveInput = subtract(this.moveInput, [-1, 0]);
        break;
      case "s":
        this.moveInput = subtract(this.moveInput, [0, 1]);
        break;
      case "d":
        this.moveInput = subtract(this.moveInput, [1, 0]);
        break;
    }
  }

  /**
   *
   * @param {number} dt Change in time since last update
   */
  update(dt) {
    // do nothing if there is no movement
    if (length(this.moveInput) < 0.01) return;

    // Calculate movement direction
    var normalizedInput = normalize([...this.moveInput]);
    var rotatedInput = mult(
      mat2([
        Math.cos(radians(this.orientation[0])),
        Math.sin(radians(this.orientation[0])),
        -Math.sin(radians(this.orientation[0])),
        Math.cos(radians(this.orientation[0])),
      ]),
      normalizedInput,
    );

    // Update player position
    this.position = add(
      this.position,
      scale(dt * this.moveSpeed, vec3(rotatedInput[0], 0, rotatedInput[1])),
    );

    // Clamp player position
    this.position[0] = Math.min(9, Math.max(-9, this.position[0]));
    this.position[2] = Math.min(9, Math.max(-9, this.position[2]));
  }
}

/** @type {Player} */
const player = new Player();

function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById("webgl");

  // Get the rendering context for WebGL
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }

  // Initialize shaders
  shaderProgram = initShaders(gl, "vshader", "fshader");
  gl.useProgram(shaderProgram);

  // Set up the viewport
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0, 0, 0, 1);

  // Enable backface culling
  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK);
  gl.frontFace(gl.CCW);

  // Enable depth test
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);

  //enable blend for transparency
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  loadLighting();
  loadEnvironment();

  robotArmExhibit = new ExhibitRobotArm();
  aquariumExhibit = new Aquarium();
  rollerCoasterExhibit = new RollerCoasterExhibit();
  newtonsCradleExhibit = new ExhibitNewtonsCradle();

  createGroundPlane();

  // Initialize time
  startTime = window.performance.now() / 1000;
  previousTime = startTime;

  // Begin render loop
  requestAnimFrame(render);

  canvas.addEventListener("mousemove", (e) => {
    player.mouseMove(e);
  });

  window.addEventListener("keydown", (e) => {
    player.keyDown(e);
  });

  window.addEventListener("keyup", (e) => {
    player.keyUp(e);
  });

  canvas.addEventListener("mousedown", (e) => {
    canvas.requestPointerLock({
      unadjustedMovement: true,
    });
  });
}

function createGroundPlane() {
  groundPlaneVAO = gl.createVertexArray();
  gl.bindVertexArray(groundPlaneVAO);

  // Create ground plane mesh
  groundPlaneBuffer = gl.createBuffer();
  groundPlaneElementBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, groundPlaneBuffer);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, groundPlaneElementBuffer);

  // Triangle fan layout
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-10, 0, -10, -10, 0, 10, 10, 0, 10, 10, 0, -10]),
    gl.STATIC_DRAW,
  );

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 0, 2, 3]),
    gl.STATIC_DRAW,
  );

  setAttribute("a_Point", (loc) => {
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
  });

  gl.bindVertexArray(null);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

/**
 * Helper function for applying shader uniforms
 *
 * @param {string} name The name of the uniform in the shader
 * @param {(location: WebGLUniformLocation) => void} apply The function to apply the uniform configuration
 */
function setUniform(name, apply) {
  const uniformLocation = gl.getUniformLocation(shaderProgram, name);
  if (uniformLocation !== null) apply(uniformLocation);
  else console.warn(`Uniform not found: ${name}`);
}

/**
 * Helper function for applying vertex attributes
 *
 * @param {string} name The name of the attribute in the shader
 * @param {(location: number) => void} apply The function to apply the attribute configuration
 */
function setAttribute(name, apply) {
  const attributeLocation = gl.getAttribLocation(shaderProgram, name);
  if (attributeLocation >= 0) apply(attributeLocation);
  else console.warn(`Attribute not found: ${name}`);
}

function loadDefaultModelUniforms() {
  setUniform("u_NormalMat", (loc) => {
    gl.uniformMatrix3fv(loc, false, flatten(mat3()));
  });

  setUniform("u_ModelMat", (loc) => {
    gl.uniformMatrix4fv(loc, false, flatten(mat4()));
  });

  setUniform("u_bone_0", (loc) => {
    gl.uniformMatrix4fv(loc, false, flatten(mat4()));
  });

  setUniform("u_bone_1", (loc) => {
    gl.uniformMatrix4fv(loc, false, flatten(mat4()));
  });

  setUniform("u_bone_2", (loc) => {
    gl.uniformMatrix4fv(loc, false, flatten(mat4()));
  });

  setUniform("u_bone_3", (loc) => {
    gl.uniformMatrix4fv(loc, false, flatten(mat4()));
  });

  setUniform("u_DiffuseTexture", (loc) => {
    gl.uniform1i(loc, 0);
  });
}

function loadDefaultAttributes() {
  setAttribute("a_Point", (loc) => {
    gl.vertexAttrib3f(loc, 0, 0, 0);
  });

  setAttribute("a_Color", (loc) => {
    gl.vertexAttrib3f(loc, 1, 1, 1);
  });

  setAttribute("a_UV", (loc) => {
    gl.vertexAttrib2f(loc, 0, 0);
  });

  setAttribute("a_Normal", (loc) => {
    gl.vertexAttrib3f(loc, 0, 0, 0);
  });

  setAttribute("a_boneWeights", (loc) => {
    gl.vertexAttrib4f(loc, 0, 0, 0, 0);
  });

  setAttribute("a_Shinyness", (loc) => {
    gl.vertexAttrib1f(loc, 20);
  });

  setAttribute("a_DiffuseColor", (loc) => {
    gl.vertexAttrib3f(loc, 1, 1, 1);
  });

  setAttribute("a_SpecularColor", (loc) => {
    gl.vertexAttrib3f(loc, 1, 1, 1);
  });

  setAttribute("a_UseDiffuseTexture", (loc) => {
    gl.vertexAttrib1f(loc, 0);
  });

  setAttribute("a_UseEnvironmentMap", (loc) => {
    gl.vertexAttrib1f(loc, 0);
  });

  setAttribute("a_DoRefraction", (loc) => {
    gl.vertexAttrib1f(loc, 0);
  });

  setAttribute("a_Opacity", (loc) => {
    gl.vertexAttrib1f(loc, 1);
  });
}

function loadLighting() {
  // Ambient Light
  setUniform("u_ALColor", (loc) => {
    gl.uniform3f(loc, 0.1, 0.1, 0.1);
  });

  // Directional Light
  setUniform("u_DLColor", (loc) => {
    gl.uniform3f(loc, 0.1, 0.1, 0.1);
  });

  setUniform("u_DLDirection", (loc) => {
    gl.uniform3f(loc, 0, -1, 0);
  });

  // Point lights
  setPointLight(0, [-5, 5, 5], 10, [1, 0.5, 0.5]);
  setPointLight(1, [5, 5, 5], 20, [0.5, 1, 0.5]);
  setPointLight(2, [5, 5, -5], 10, [1, 0.5, 0.5]);
  setPointLight(3, [-5, 5, -5], 20, [0.5, 0.5, 1]);
  setPointLight(4, [0, 8, 0], 20, [1, 1, 1], .9, [-1.5, -1, 0]);
  setPointLight(5, [0, 0, 0], 0);
  setPointLight(6, [0, 0, 0], 0);
  setPointLight(7, [0, 0, 0], 0);
}

/**
 * @param {number} index Light index (range 0-7 inclusive)
 * @param {[number, number, number]} point The location of the light
 * @param {number} intensity The intensity of the light
 * @param {[number, number, number]} color The color of the light
 * @param {number} factor The angle of the light if it is a spotlight (-1 to 1). -1 is a point light.
 * @param {[number, number, number]} direction The direction the spot light is pointing in
 */
function setPointLight(
  index,
  point,
  intensity = 10,
  color = [1, 1, 1],
  factor = -1,
  direction = [1, 0, 0],
) {
  setUniform(`u_PLPoint[${index}]`, (loc) => {
    gl.uniform3fv(loc, point, 0, 3);
  });

  setUniform(`u_PLColor[${index}]`, (loc) => {
    gl.uniform3fv(loc, scale(intensity, color), 0, 3);
  });

  setUniform(`u_PLFactor[${index}]`, (loc) => {
    gl.uniform1f(loc, factor);
  });

  setUniform(`u_PLDirection[${index}]`, (loc) => {
    gl.uniform3fv(loc, direction, 0, 3);
  });
}

function loadEnvironment() {
  setUniform("u_EnvironmentMap", (loc) => {
    gl.uniform1i(loc, 1);
  });
}

function render() {
  const currentTime = window.performance.now() / 1000;
  const deltaTime = currentTime - previousTime;
  previousTime = currentTime;

  // Clear the canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // TODO: update and draw stuff
  player.update(deltaTime);

  setUniform("u_VPMat", (loc) => {
    gl.uniformMatrix4fv(loc, false, flatten(player.cameraMatrix));
  });

  setUniform("u_CPoint", (loc) => {
    gl.uniform3fv(loc, player.position);
  });

  // Draw ground plane
  drawGroundPlane();

  // Render exhibits
  robotArmExhibit.render(deltaTime);
  rollerCoasterExhibit.render(deltaTime);
  aquariumExhibit.render(deltaTime);
  newtonsCradleExhibit.render(deltaTime);

  const frameEndTime = window.performance.now() / 1000;

  setTimeout(
    () => {
      requestAnimationFrame(render);
    },
    1000 / 60 - (frameEndTime - currentTime) * 1000,
  );
}

function drawGroundPlane() {
  gl.bindVertexArray(groundPlaneVAO);
  loadDefaultModelUniforms();

  loadDefaultAttributes();

  setAttribute("a_Normal", (loc) => {
    gl.vertexAttrib3f(loc, 0, 1, 0);
  });

  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

  gl.bindVertexArray(null);
}
