/**
 * Exhibit of a robot arm IK animation
 */
class ExhibitNewtonsCradle {
  position = [7, 1.25, 0];

  sphereVAO;
  sphereMesh;
  sphereElements;
  elementCount;

  swingRadius = 5;
  ballSpacing = 2;

  ball1velocity = [0, 0];
  ball2velocity = [0, 0];
  ball1position = [0, -this.swingRadius];
  ball2position = [this.swingRadius, 0];

  gravity = 100;
  totalEnergy = this.gravity * this.ball2position[1];

  constructor() {
    // Create and bind vao
    this.sphereVAO = gl.createVertexArray();
    gl.bindVertexArray(this.sphereVAO);

    // Create model buffers
    this.sphereMesh = gl.createBuffer();
    this.sphereElements = gl.createBuffer();

    // Bind model buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, this.sphereMesh);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sphereElements);

    var { verts, indices } = sphere();

    this.elementCount = indices.length;

    // Populate vertex data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

    // Populate element data
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW,
    );

    // Set attributes
    setAttribute("a_Point", (loc) => {
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    });

    setAttribute("a_Normal", (loc) => {
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    });

    gl.bindVertexArray(null);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  /**
   * @override
   * @param {number} dt Change in time since last update
   */
  render(dt) {
    this.ball1velocity[1] -= this.gravity * dt;
    this.ball2velocity[1] -= this.gravity * dt;

    const ball1Tangent = [this.ball1position[1], -this.ball1position[0]];
    normalize(ball1Tangent);
    this.ball1velocity = scale(
      dot(ball1Tangent, this.ball1velocity),
      ball1Tangent,
    );

    const ball2Tangent = [this.ball2position[1], -this.ball2position[0]];
    normalize(ball2Tangent);
    this.ball2velocity = scale(
      dot(ball2Tangent, this.ball2velocity),
      ball2Tangent,
    );

    this.ball1position = add(this.ball1position, scale(dt, this.ball1velocity));
    this.ball2position = add(this.ball2position, scale(dt, this.ball2velocity));

    normalize(this.ball1position);
    this.ball1position = scale(this.swingRadius, this.ball1position);
    normalize(this.ball2position);
    this.ball2position = scale(this.swingRadius, this.ball2position);

    if (length(this.ball1velocity) > 0.01) {
      normalize(this.ball1velocity);
      this.ball1velocity = scale(
        Math.sqrt(
          (this.totalEnergy - this.ball1position[1] * this.gravity) * 2,
        ),
        this.ball1velocity,
      );
    }

    if (length(this.ball2velocity) > 0.01) {
      normalize(this.ball2velocity);
      this.ball2velocity = scale(
        Math.sqrt(
          (this.totalEnergy - this.ball2position[1] * this.gravity) * 2,
        ),
        this.ball2velocity,
      );
    }

    if (this.ball2position[0] < 0) {
      this.ball1position = [...this.ball2position];
      this.ball1velocity = [...this.ball2velocity];

      this.ball2position = [0, -this.swingRadius];
      this.ball2velocity = [0, 0];
    }

    if (this.ball1position[0] > 0) {
      this.ball2position = [...this.ball1position];
      this.ball2velocity = [...this.ball1velocity];

      this.ball1position = [0, -this.swingRadius];
      this.ball1velocity = [0, 0];
    }

    gl.bindVertexArray(this.sphereVAO);
    loadDefaultModelUniforms();
    loadDefaultAttributes();

    var translationMatrix = mult(scalem(0.1, 0.1, 0.1), rotateY(90));

    setUniform("u_NormalMat", (loc) => {
      gl.uniformMatrix3fv(
        loc,
        false,
        flatten(normalMatrix(translationMatrix, true)),
      );
    });

    var transMatrix;

    for (let i = 1; i < 4; i++) {
      transMatrix = mult(
        translate(this.position),
        mult(
          translationMatrix,
          mult(translate(i * this.ballSpacing, 0, 0), rotateX(90)),
        ),
      );

      setUniform("u_ModelMat", (loc) => {
        gl.uniformMatrix4fv(loc, false, flatten(transMatrix));
      });

      setUniform("u_NormalMat", (loc) => {
        gl.uniformMatrix3fv(
          loc,
          false,
          flatten(normalMatrix(transMatrix, true)),
        );
      });

      gl.drawElements(gl.TRIANGLES, this.elementCount, gl.UNSIGNED_SHORT, 0);
    }

    // End ball 1
    transMatrix = mult(
      mult(translate(this.position), translationMatrix),
      mult(
        translate(
          this.ball1position[0],
          this.ball1position[1] + this.swingRadius,
          0,
        ),
        rotateX(90),
      ),
    );

    setUniform("u_ModelMat", (loc) => {
      gl.uniformMatrix4fv(loc, false, flatten(transMatrix));
    });

    setUniform("u_NormalMat", (loc) => {
      gl.uniformMatrix3fv(loc, false, flatten(normalMatrix(transMatrix, true)));
    });
    gl.drawElements(gl.TRIANGLES, this.elementCount, gl.UNSIGNED_SHORT, 0);

    // End ball 2
    transMatrix = mult(
      translate(this.position),
      mult(
        translationMatrix,
        mult(
          translate(
            this.ball2position[0] + this.ballSpacing * 4,
            this.ball2position[1] + this.swingRadius,
            0,
          ),
          rotateX(90),
        ),
      ),
    );

    setUniform("u_ModelMat", (loc) => {
      gl.uniformMatrix4fv(loc, false, flatten(transMatrix));
    });

    setUniform("u_NormalMat", (loc) => {
      gl.uniformMatrix3fv(loc, false, flatten(normalMatrix(transMatrix, true)));
    });

    gl.drawElements(gl.TRIANGLES, this.elementCount, gl.UNSIGNED_SHORT, 0);

    gl.bindVertexArray(null);
  }
}
