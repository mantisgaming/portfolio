/**
 * Exhibit of a robot arm IK animation
 */
class ExhibitRobotArm {
  position = [2, 0, 6];

  boneLength = 1.5; // bone length

  armVAO;
  armMesh;
  armElements;
  elementCount;

  angle1 = 45;
  angle2 = 45;
  angle3 = -90;

  animationTime = 0;
  targetPosition = [0, 0];

  constructor() {
    // Create and bind vao
    this.armVAO = gl.createVertexArray();
    gl.bindVertexArray(this.armVAO);

    // Create model buffers
    this.armMesh = gl.createBuffer();
    this.armElements = gl.createBuffer();

    // Bind model buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, this.armMesh);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.armElements);

    var points = [];
    var indices = [];
    const height = this.boneLength * 2;
    const radius = 0.2;

    for (var i = 0; i < 12; i++) {
      for (var j = 0; j < 12; j++) {
        points.push([
          Math.cos((j / 12) * 2 * Math.PI) * radius * (1 - i / 11),
          (i / 11) * height,
          -Math.sin((j / 12) * 2 * Math.PI) * radius * (1 - i / 11),
          Math.cos((j / 12) * 2 * Math.PI) * radius,
          0,
          -Math.sin((j / 12) * 2 * Math.PI) * radius,
          i == 0 ? 0 : i < 6 ? 1 : 0,
          i < 6 ? 0 : 1,
          0,
          0,
        ]);

        const a = j + i * 12;
        const b = ((j + 1) % 12) + i * 12;
        const c = ((j + 1) % 12) + (i + 1) * 12;
        const d = j + (i + 1) * 12;

        if (i < 11) indices.push(a, b, c, a, c, d);
      }
    }

    this.elementCount = indices.length;

    // Populate vertex data
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(points.flat()),
      gl.STATIC_DRAW,
    );

    // Populate element data
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW,
    );

    // Set attributes
    setAttribute("a_Point", (loc) => {
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 10 * 4, 0 * 4);
    });

    setAttribute("a_Normal", (loc) => {
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 10 * 4, 3 * 4);
    });

    setAttribute("a_boneWeights", (loc) => {
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 10 * 4, 6 * 4);
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
    this.animationTime += dt;
    this.animationTime %= 2;

    this.targetPosition = [
      Math.sin(this.animationTime * Math.PI) * 0.75,
      Math.cos(this.animationTime * Math.PI) * 0.75 + 1.5,
      0.5,
    ];

    this.solveIK();

    gl.bindVertexArray(this.armVAO);

    loadDefaultModelUniforms();
    setUniform("u_ModelMat", (loc) => {
      gl.uniformMatrix4fv(
        loc,
        false,
        flatten(
          mult(
            translate(this.position),
            mult(rotateY(this.angle1), scalem(2, 2, 2)),
          ),
        ),
      );
    });
    
    setUniform("u_NormalMat", (loc) => {
      gl.uniformMatrix3fv(
        loc,
        false,
        flatten(
          normalMatrix(
            mult(
              translate(this.position),
              mult(rotateY(this.angle1), scalem(2, 2, 2)),
            ),
            true,
          ),
        ),
      );
    });

    loadDefaultAttributes();
    setUniform("u_bone_0", (loc) => {
      gl.uniformMatrix4fv(loc, false, flatten(rotateX(this.angle2)));
    });

    setUniform("u_bone_1", (loc) => {
      gl.uniformMatrix4fv(
        loc,
        false,
        flatten(
          mult(
            mult(rotateX(this.angle2), translate(0, this.boneLength, 0)),
            mult(rotateX(this.angle3), translate(0, -this.boneLength, 0)),
          ),
        ),
      );
    });

    gl.drawElements(gl.TRIANGLES, this.elementCount, gl.UNSIGNED_SHORT, 0);

    gl.bindVertexArray(null);
  }

  solveIK() {
    this.angle1 =
      (Math.atan2(this.targetPosition[0], this.targetPosition[2]) * 180) /
      Math.PI;

    const rotatedTarget = mult(rotateY(-this.angle1), [
      ...this.targetPosition,
      1,
    ]);
    const target2D = [rotatedTarget[2], rotatedTarget[1]];
    const { angle1, angle2 } = inverseKinematics(
      target2D[0],
      target2D[1],
      -1,
      1,
      this.boneLength,
      this.boneLength,
    );
    this.angle2 = (angle1 * 180) / Math.PI - 90;
    this.angle3 = (angle2 * 180) / Math.PI;
  }
}

function inverseKinematics(X, Y, elbowX, elbowY, length1, length2) {
  const L1 = Math.abs(length1);
  const L2 = Math.abs(length2);

  const L1Sqr = L1 * L1;
  const L2Sqr = L2 * L2;

  const lengthSqr = Math.min(
    Math.max(X * X + Y * Y, Math.abs(Math.pow(L1 - L2, 2))),
    Math.pow(L1 + L2, 2),
  );
  const length = Math.sqrt(lengthSqr);

  const thetaElbow = Math.atan2(elbowY, elbowX);

  const thetaT = Math.atan2(Y, X);
  var theta1 = 0;
  var theta2 = 0;

  var difference = thetaElbow - thetaT;

  while (difference < -Math.PI) difference += 2 * Math.PI;
  while (difference > Math.PI) difference -= 2 * Math.PI;

  if (difference < 0) {
    theta1 =
      -Math.acos((L1Sqr + lengthSqr - L2Sqr) / (2 * L1 * length)) + thetaT;
    theta2 = Math.acos((lengthSqr - L1Sqr - L2Sqr) / (2 * L1 * L2));
  } else {
    theta1 =
      Math.acos((L1Sqr + lengthSqr - L2Sqr) / (2 * L1 * length)) + thetaT;
    theta2 = -Math.acos((lengthSqr - L1Sqr - L2Sqr) / (2 * L1 * L2));
  }

  return {
    angle1: theta1,
    angle2: theta2,
  };
}
