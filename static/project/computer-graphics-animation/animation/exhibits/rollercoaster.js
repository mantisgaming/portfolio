let rollerCoasterSplines = `
# Number of splines
1

# Spline 1
# Number of control points
16
# Spline time
20

# Control point 1: Start
# Position
0.0, 0.0, 0.0
# Rotation
0.0, 0.0, 0.0

# Control point 2: Turn left
# Position
2.0, 0.0, 0.25
# Rotation
0.0, -10.0, 0.0

# Control point 3: Turn left again
# Position
2.0, 0.0, -0.75
# Rotation
0.0, 170.0, 0.0

# Control point 4: Start climb
# Position
0.0, 0.0, -1.0
# Rotation
0.0, 180.0, -45.0

# Control point 5
# Position
-1.0, 1.0, -1.0
# Rotation
0.0, 180.0, -10.0

# Control point 6
# Position
-2.0, 1.0, -1.0
# Rotation
0.0, 180.0, 20.0

# Control point 7: Start drop
# Position
-3.0, 2.0, -1.0
# Rotation
0.0, 180.0, -50.0

# Control point 8
# Position
-3.5, 0.66, -1.0
# Rotation
-30.0, 200.0, 90.0

# Control point 9: Start of corkscrew thingy
# Position
-4.2, 0.15, 0.0
# Rotation
0.0, 230.0, 0.0

# Control point 10
# Position
-5.0, 1.0, 0.8
# Rotation
90.0, 230.0, -90.0

# Control point 11
# Position
-5.5, 2.0, 0.0
# Rotation
0.0, 40.0, -180.0

# Control point 12
# Position
-6.0, 0.5, -0.5
# Rotation
00.0, -70.0, 0.0

# Control point 13: End of corkscrew thingy
# Position
-5.0, 0.0, 1.4
# Rotation
0.0, -20.0, 0.0

# Control point 14: Start of small hill
# Position
-3.0, 0.0, 1.0
# Rotation
0.0, 30.0, 30.0

# Control point 15
# Position
-2.0, 0.5, 0.6
# Rotation
0.0, 30.0, -40.0

# Control point 16
# Position
-1.5, 0.1, 0.4
# Rotation
0.0, 30.0, 0.0`;

/**
 * @class
 */
class RollerCoasterExhibit {
    /** @type {[number, number, number]} */
    position = [2, 1, -6];

    // Interpolation variables
    startTime = 0.0;
    curveTime = 0.0;
    curveNum = 0;

    // Roller coaster track splines
    trackSplines = [];
    trackPointPositions = [];
    trackPointRotations = [];

    // Roller coaster track
    /** @type {WebGLVertexArrayObject} */
    trackVAO;
    /** @type {WebGLBuffer} */
    trackVertsBuffer;
    /** @type {WebGLBuffer} */
    trackIndicesBuffer;
    /** @type {WebGLBuffer} */
    trackNormsBuffer;
    /** @type {number} */
    trackIndices;

    // Roller coaster car body
    /** @type {WebGLVertexArrayObject} */
    bodyVAO;
    /** @type {WebGLBuffer} */
    bodyVertsBuffer;
    /** @type {WebGLBuffer} */
    bodyNormsBuffer;
    /** @type {mat4} */
    bodyScale = scalem(0.4, 0.08, 0.28);

    // Roller coaster car wheel
    /** @type {WebGLVertexArrayObject} */
    wheelVAO;
    /** @type {WebGLBuffer} */
    wheelVertsBuffer;
    /** @type {WebGLBuffer} */
    wheelIndicesBuffer;
    /** @type {WebGLBuffer} */
    wheelNormsBuffer;
    /** @type {mat4} */
    wheelScale = scalem(0.1, 0.1, 0.1);
    wheelTranslates = [
        translate( 0.28, -0.07,  0.16),
        translate( 0.28, -0.07, -0.16),
        translate(-0.28, -0.07,  0.16),
        translate(-0.28, -0.07, -0.16)
    ];
    /** @type {number} */
    wheelIndices;

    /**
     * Set up the roller coaster exhibit.
     */
    constructor() {
        // Generate the splines the roller coaster car will follow
        this.trackSplines = constructSplines(rollerCoasterSplines);

        // Set up the vertex array object for the track
        let trackControlPointPositions = [];
        let trackControlPointRotations = [];
        for (let i = 0; i < this.trackSplines.length; i++) {
            let splinePositions = this.trackSplines[i].controlPointPositions;
            let splineRotations = this.trackSplines[i].controlPointRotations;
            for (let position of splinePositions) {
                trackControlPointPositions.push(position);
            }
            for (let rotation of splineRotations) {
                trackControlPointRotations.push(rotation);
            }
        }

        this.trackPointPositions = trackControlPointPositions;
        this.trackPointRotations = calculateSplineQuaternions(trackControlPointRotations);

        this.createTrack();

        // Set up the vertex array objects for the roller coaster car
        this.createCarBody();
        this.createCarWheel();
    }

    /**
     * Set up the vertex array object for the roller coaster track.
     */
    createTrack() {
        this.trackVAO = gl.createVertexArray();
        gl.bindVertexArray(this.trackVAO);

        let track = tube(this.trackPointPositions, 0.08);
        this.trackIndices = track.indices.length;

        let trackVerts = track.verts;
        let trackIndices = track.indices;
        let trackNorms = track.norms;

        loadDefaultAttributes();

        this.trackIndicesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.trackIndicesBuffer);
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(trackIndices),
            gl.STATIC_DRAW,
        );

        // Create roller coaster track
        this.trackVertsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.trackVertsBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(trackVerts),
            gl.STATIC_DRAW,
        );

        setAttribute("a_Point", (loc) => {
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
        });

        this.trackNormsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.trackNormsBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(trackNorms),
            gl.STATIC_DRAW,
        );

        setAttribute("a_Normal", (loc) => {
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
        });

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    /**
     * Set up the vertex array object for the roller coaster car body.
     */
    createCarBody() {
        this.bodyVAO = gl.createVertexArray();
        gl.bindVertexArray(this.bodyVAO);

        let bodyVerts = cube();
        let bodyNorms = bodyVerts;

        loadDefaultAttributes();
        
        // Create roller coaster car body
        this.bodyVertsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bodyVertsBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            flatten(bodyVerts),
            gl.STATIC_DRAW,
        );

        setAttribute("a_Point", (loc) => {
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
        });

        this.bodyNormsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bodyNormsBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            flatten(bodyNorms),
            gl.STATIC_DRAW,
        );

        setAttribute("a_Normal", (loc) => {
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
        });

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    /**
     * Set up the vertex array object for the roller coaster car wheel.
     */
    createCarWheel() {
        this.wheelVAO = gl.createVertexArray();
        gl.bindVertexArray(this.wheelVAO);

        let wheel = sphere();

        let wheelVerts = wheel.verts;
        let wheelIndices = wheel.indices;
        let wheelNorms = wheel.norms;

        this.wheelIndices = wheelIndices.length;

        loadDefaultAttributes();
        
        this.wheelIndicesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wheelIndicesBuffer);
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(wheelIndices),
            gl.STATIC_DRAW,
        );

        // Create roller coaster car wheel
        this.wheelVertsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.wheelVertsBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(wheelVerts),
            gl.STATIC_DRAW,
        );

        setAttribute("a_Point", (loc) => {
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
        });

        this.wheelNormsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.wheelNormsBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(wheelNorms),
            gl.STATIC_DRAW,
        );

        setAttribute("a_Normal", (loc) => {
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
        });

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    /**
     * Update and render the animation
     * @abstract
     * @param {number} dt Change in time since last update
     */
    render(dt) {
        const elapsedTime = previousTime + dt - startTime;
        const curveElapsed = elapsedTime - this.curveTime;
        let t = curveElapsed / (this.trackSplines[0].moveTime / (this.trackSplines[0].nControlPoints - 1));

        if (t >= 1) {
            this.curveTime = elapsedTime;
            this.curveNum++;
            t = 0.0;
        }

        if (this.curveNum >= this.trackSplines[0].nControlPoints) {
            this.curveNum = 0;
            this.startTime = elapsedTime;
        }

        const exhibitTransform = translate(this.position);

        // Calculate based on dt where the car will be on the track
        const numPoints = this.trackPointPositions.length;
        let p0 = this.trackPointPositions[(this.curveNum - 1) % numPoints];
        if (this.curveNum == 0) {
            p0 = this.trackPointPositions[numPoints - 1];
        }
        let p1 = this.trackPointPositions[(this.curveNum + 0) % numPoints];
        let p2 = this.trackPointPositions[(this.curveNum + 1) % numPoints];
        let p3 = this.trackPointPositions[(this.curveNum + 2) % numPoints];

        const currentPosition = catmullRom(p0, p1, p2, p3, t);
        const trackTranslate = translate(currentPosition[0], currentPosition[1], currentPosition[2]);

        const q1 = this.trackPointRotations[(this.curveNum + 0) % numPoints];
        const q2 = this.trackPointRotations[(this.curveNum + 1) % numPoints];
        const trackRotate = quatToMatrix(slerp(q1, q2, t));

        const trackTransform = mult(mult(trackTranslate, trackRotate), translate(0.0, 0.2, 0.0));

        const rollerCoasterCarTransform = mult(exhibitTransform, trackTransform);

        loadDefaultModelUniforms();
        // Draw roller coaster track
        setUniform("u_ModelMat", (loc) => {
            gl.uniformMatrix4fv(loc, false, flatten(exhibitTransform));
        });
        gl.bindVertexArray(this.trackVAO);
        gl.drawElements(gl.TRIANGLES, this.trackIndices, gl.UNSIGNED_SHORT, 0);
        
        loadDefaultModelUniforms();
        // Draw roller coaster car body
        setUniform("u_ModelMat", (loc) => {
            gl.uniformMatrix4fv(loc, false, flatten(mult(rollerCoasterCarTransform, this.bodyScale)));
        });
        
        setUniform("u_NormalMat", (loc) => {
            gl.uniformMatrix3fv( loc, false, flatten(normalMatrix(rollerCoasterCarTransform, true)));
        });
        
        gl.bindVertexArray(this.bodyVAO);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        
        loadDefaultModelUniforms();
        // Draw roller coaster car wheel
        for (let i = 0; i < 4; i++) {
            setUniform("u_ModelMat", (loc) => {
                gl.uniformMatrix4fv(loc, false, flatten(mult(mult(rollerCoasterCarTransform, this.wheelTranslates[i]), this.wheelScale)));
            });
            gl.bindVertexArray(this.wheelVAO);
            gl.drawElements(gl.TRIANGLES, this.wheelIndices, gl.UNSIGNED_SHORT, 0);
        }

        gl.bindVertexArray(null);
    }
}

/**
 * Constructs splines from the input file.
 *
 * @param splineFile The file defining the splines
 */
function constructSplines(splineFile) {
    let splines = [];
    let splineLines = splitAndSanitizeFile(splineFile);
    let nSplines = parseInt(splineLines[0]);
    let splineStartLine = 1;

    for (let i = 0; i < nSplines; i++) {
        let nControlPoints = parseInt(splineLines[splineStartLine]);
        let splineEndLine = splineStartLine + 2 + (nControlPoints * 2);
        let newSplineLines = splineLines.slice(splineStartLine, splineEndLine);
        let newSpline = new Spline(newSplineLines);

        splineStartLine = splineEndLine;
        splines.push(newSpline);
    }

    return splines;
}

/**
 * Splits a text file into individual lines, filtering out blank lines and lines starting with a hashtag.
 *
 * @param file      The text file to process
 * @returns {*}     An array of lines from the text file
 */
function splitAndSanitizeFile(file) {
    let lines = file.split('\n');
    lines = lines.filter(line => {
        return (line.search(/\S/) == false && line.startsWith("#") == false);
    });
    lines = lines.map(line => {
        return line.trim();
    });
    return lines;
}

/**
 * Create the vertices for a cube.
 * 
 * @returns An array containing the vertices of the cube
 */
function cube() {
    var verts = [];
    verts = verts.concat(quad( 1, 0, 3, 2 ));
    verts = verts.concat(quad( 2, 3, 7, 6 ));
    verts = verts.concat(quad( 3, 0, 4, 7 ));
    verts = verts.concat(quad( 6, 5, 1, 2 ));
    verts = verts.concat(quad( 4, 5, 6, 7 ));
    verts = verts.concat(quad( 5, 4, 0, 1 ));
    return verts;
}

/**
 * Create the vertices for a quad.
 * 
 * @param {number} a The cube index of the first point of the quad
 * @param {number} b The cube index of the second point of the quad
 * @param {number} c The cube index of the third point of the quad
 * @param {number} d The cube index of the fourth point of the quad
 * @returns An array containing the vertices of the quad
 */
function quad(a, b, c, d) {
    var verts = [];

    var vertices = [
        vec3( -1.0, -1.0,  1.0),
        vec3( -1.0,  1.0,  1.0),
        vec3(  1.0,  1.0,  1.0),
        vec3(  1.0, -1.0,  1.0),
        vec3( -1.0, -1.0, -1.0),
        vec3( -1.0,  1.0, -1.0),
        vec3(  1.0,  1.0, -1.0),
        vec3(  1.0, -1.0, -1.0)
    ];

    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        verts.push(vertices[indices[i]]);
    }

    return verts;
}

/**
 * Create the vertices for a sphere.
 * 
 * @returns An object containing three arrays: the sphere's vertices, indices, and normals
 */
function sphere() {
    let verts = [];
    let norms = [];
    let indices = [];

    let x, y, z, xy;
    let nx, ny, nz, lengthInv = 1.0;

    sectorCount = 6;
    stackCount = 6;

    let sectorStep = 2 * Math.PI / sectorCount;
    let stackStep = Math.PI / stackCount;
    let sectorAngle, stackAngle;

    for (let i = 0; i <= stackCount; ++i) {
        stackAngle = Math.PI / 2 - i * stackStep;
        xy = Math.cos(stackAngle);
        z = Math.sin(stackAngle);

        for (let j = 0; j <= sectorCount; ++j) {
            sectorAngle = j * sectorStep;

            x = xy * Math.cos(sectorAngle);
            y = xy * Math.sin(sectorAngle);

            verts.push(x, y, z);

            nx = x * lengthInv;
            ny = y * lengthInv;
            nz = z * lengthInv;

            norms.push(nx, ny, nz);
        }
    }

    let k1, k2;

    for (let i = 0; i < stackCount; ++i) {
        k1 = i * (sectorCount + 1);
        k2 = k1 + sectorCount + 1;

        for (let j = 0; j < sectorCount; ++j, ++k1, ++k2) {
            if (i != 0) {
                indices.push(k1, k2, k1 + 1);
            }

            if (i != stackCount - 1) {
                indices.push(k1 + 1, k2, k2 + 1);
            }
        }
    }

    return {verts, indices, norms};
}

/**
 * Create the vertices for a cylinder.
 * 
 * @returns An object containing three arrays: the cylinders's vertices, indices, and normals
 */
function cylinder() {
    let verts = [];
    let norms = [];
    let indices = [];

    let sectorCount = 8;

    let sectorStep = 2 * Math.PI / sectorCount;
    let sectorAngle;

    let circleVerts = [];

    for (let i = 0; i <= sectorCount; ++i) {
        sectorAngle = i * sectorStep;
        circleVerts.push(Math.cos(sectorAngle), Math.sin(sectorAngle), 0);
    }

    for (let i = 0; i < 2; ++i) {
        let h = -1 / 2 + i;

        for (let j = 0, k = 0; j <= sectorCount; ++j, k += 3) {
            let ux = circleVerts[k];
            let uy = circleVerts[k + 1];
            let uz = circleVerts[k + 2];

            verts.push(ux, uy, h);
            norms.push(ux, uy, uz);
        }
    }

    let baseCenterIndex = verts.length / 3;
    let topCenterIndex = baseCenterIndex + sectorCount + 1;

    for (let i = 0; i < 2; ++i) {
        let h = -1 / 2 + i;
        let nz = -1 + i * 2;

        verts.push(0, 0, h);
        norms.push(0, 0, nz);

        for (let j = 0, k = 0; j < sectorCount; ++j, k += 3) {
            let ux = circleVerts[k];
            let uy = circleVerts[k + 1];

            verts.push(ux, uy, h);
            norms.push(0, 0, nz);
        }
    }

    let k1 = 0;
    let k2 = sectorCount + 1;
    for (let i = 0; i < sectorCount; ++i, ++k1, ++k2) {
        indices.push(k1, k1 + 1, k2);
        indices.push(k2, k1 + 1, k2 + 1);
    }

    for (let i = 0, k = baseCenterIndex + 1; i < sectorCount; ++i, ++k) {
        if (i < sectorCount - 1) {
            indices.push(baseCenterIndex, k + 1, k);
        }
        else {
            indices.push(baseCenterIndex, baseCenterIndex + 1, k);
        }
    }

    for (let i = 0, k = topCenterIndex + 1; i < sectorCount; ++i, ++k) {
        if (i < sectorCount - 1) {
            indices.push(topCenterIndex, k, k + 1);
        }
        else {
            indices.push(topCenterIndex, k, topCenterIndex + 1);
        }
    }

    return {verts, indices, norms};
}

/**
 * Create the vertices for a tube stretched along a set of spline points.
 * 
 * @returns An object containing three arrays: the tubes's vertices, indices, and normals
 */
function tube(splinePoints, radius) {
    let verts = [];
    let norms = [];
    let indices = [];

    let sectorCount = 5;

    let trackPoints = catmullRomPoints(splinePoints);

    let points = [];
    for (let i = 0; i < trackPoints.length; i += 3) {
        points.push(vec3(trackPoints[i], trackPoints[i + 1], trackPoints[i + 2]));
    }

    let frames = [];

    let tangents = points.map((p, i) => {
        let prev = points[Math.max(i - 1, 0)];
        let next = points[Math.min(i + 1, points.length - 1)];
        return normalize(subtract(next, prev));
    })

    let up = vec3(0, 1, 0);
    if (Math.abs(dot(tangents[0], up)) > 0.99) {
        up = vec3(1, 0, 0);
    }

    let normal = normalize(cross(up, tangents[0]));
    let binormal = normalize(cross(tangents[0], normal));

    frames.push({ tangent: tangents[0], normal, binormal });

    for (let i = 1; i < points.length; i++) {
        let tangent = tangents[i];
        normal = normalize(subtract(normal, scale(dot(normal, tangent), tangent)));
        binormal = normalize(cross(tangent, normal));
        frames.push({ tangent: tangent, normal, binormal });
    }

    for (let i = 0; i < points.length; i++) {
        let tangent = frames[i].tangent;
        let normal = frames[i].normal;
        let binormal = frames[i].binormal;

        for (let j = 0; j <= sectorCount; j++) {
            let angle = (j / sectorCount) * 2 * Math.PI;

            let nx = normal[0] * Math.cos(angle) + binormal[0] * Math.sin(angle);
            let ny = normal[1] * Math.cos(angle) + binormal[1] * Math.sin(angle);
            let nz = normal[2] * Math.cos(angle) + binormal[2] * Math.sin(angle);

            verts.push(points[i][0] + radius * nx);
            verts.push(points[i][1] + radius * ny);
            verts.push(points[i][2] + radius * nz);

            norms.push(nx, ny, nz);
        }
    }

    let ringSize = sectorCount + 1;
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < sectorCount; j++) {
            let a = i % points.length * ringSize + j;
            let b = (i + 1) % points.length * ringSize + j;
            let c = (i + 1) % points.length * ringSize + (j + 1);
            let d = i % points.length * ringSize + (j + 1);
            indices.push(a, d, b);
            indices.push(b, d, c);
        }
    }

    return {verts, indices, norms};
}

/**
 * Create the vertices for a Catmull Rom spline with the given control points and number of segments.
 * 
 * @returns An array containing the points of the curve
 */
function catmullRomPoints(points, segments = 10) {
    let curve = [];
    let M = mat4(
        vec4(-1,  3, -3,  1),
        vec4( 2, -5,  4, -1),
        vec4(-1,  0,  1,  0),
        vec4( 0,  2,  0,  0)
    );

    for (let curveNum = 0; curveNum < points.length; curveNum++) {
        for (let i = 0; i < segments; i++) {
            let t = i / segments;
            let tMatrix = vec4(
                t*t*t,
                t*t,
                t,
                1
            );

            let Bx = vec4(
                points[(curveNum + 0) % points.length][0],
                points[(curveNum + 1) % points.length][0],
                points[(curveNum + 2) % points.length][0],
                points[(curveNum + 3) % points.length][0]
            );
            let By = vec4(
                points[(curveNum + 0) % points.length][1],
                points[(curveNum + 1) % points.length][1],
                points[(curveNum + 2) % points.length][1],
                points[(curveNum + 3) % points.length][1]
            );
            let Bz = vec4(
                points[(curveNum + 0) % points.length][2],
                points[(curveNum + 1) % points.length][2],
                points[(curveNum + 2) % points.length][2],
                points[(curveNum + 3) % points.length][2]
            );
            
            let pointx = mult(M, Bx);
            let pointy = mult(M, By);
            let pointz = mult(M, Bz);
            
            pointx = dot(tMatrix, pointx);
            pointy = dot(tMatrix, pointy);
            pointz = dot(tMatrix, pointz);
            
            curve.push(pointx / 2);
            curve.push(pointy / 2);
            curve.push(pointz / 2);
        }
    }

    return curve;
}

/**
 * Calculates a point along a Catmull Rom curve.
 *
 * @param p0 The first point defining the curve
 * @param p1 The second point defining the curve
 * @param p2 The third point defining the curve
 * @param p3 The fourth point defining the curve
 * @param t The parameter defining the distance along the curve
 * 
 * @returns An array containing the x, y, and z coordinates of the point
 */
function catmullRom(p0, p1, p2, p3, t) {
    let point = [];

    let M = mat4(
        vec4(-1,  3, -3,  1),
        vec4( 2, -5,  4, -1),
        vec4(-1,  0,  1,  0),
        vec4( 0,  2,  0,  0)
    );

    let tMatrix = vec4(
        t*t*t,
        t*t,
        t,
        1
    );

    let Bx = vec4(p0[0], p1[0], p2[0], p3[0]);
    let By = vec4(p0[1], p1[1], p2[1], p3[1]);
    let Bz = vec4(p0[2], p1[2], p2[2], p3[2]);

    point.push(dot(tMatrix, mult(M, Bx)) / 2);
    point.push(dot(tMatrix, mult(M, By)) / 2);
    point.push(dot(tMatrix, mult(M, Bz)) / 2);

    return point;
}

/**
 * Calculates the quaternion representation for the rotations of the given control points.
 * 
 * @param controlPoints An array of the spline control points.
 * 
 * @returns An array containing the quaternion representations.
 */
function calculateSplineQuaternions(controlPointRotations) {
    splineQuaternions = [];

    for (let i = 0; i < controlPointRotations.length; i++) {
        splineQuaternions.push(eulersToQuaternion(controlPointRotations[i]));
    }

    return splineQuaternions;
}

/**
 * Convert a set of x, y, and z Euler angles into a single quaternion.
 * 
 * @param x The x Euler angle
 * @param y The y Euler angle
 * @param z The z Euler angle
 * 
 * @returns A quaternion representing a rotation on each axis by the respective angle
 */
function eulersToQuaternion(x, y, z) {
    if ( Array.isArray(x) ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    let qx = vec4(Math.sin(radians(x) / 2), 0.0, 0.0, Math.cos(radians(x) / 2));
    let qy = vec4(0.0, Math.sin(radians(y) / 2), 0.0, Math.cos(radians(y) / 2));
    let qz = vec4(0.0, 0.0, Math.sin(radians(z) / 2), Math.cos(radians(z) / 2));

    return normalize(quatMult(quatMult(qz, qy), qx));
}

/**
 * Multiply two [x, y, z, w] quaternions.
 * 
 * @param q1 The first quaternion to multiply
 * @param q2 The second quaternion to multiply
 * 
 * @returns A quaternion representing the input quaternions multiplied
 */
function quatMult(q1, q2) {
    let a1 = q1[3];
    let a2 = q2[3];
    let v1 = vec3(q1[0], q1[1], q1[2]);
    let v2 = vec3(q2[0], q2[1], q2[2]);

    let vectorCoeffs = add(add(scale(a1, v2), scale(a2, v1)), cross(v1, v2));
    let q1q2 = vec4(vectorCoeffs[0], vectorCoeffs[1], vectorCoeffs[2], a1 * a2 - dot(v1, v2));
    return q1q2;
}

/**
 * Convert an [x, y, z, w] quaternion into its 4x4 matrix equivalent.
 * 
 * @param q The quaternion to convert
 * 
 * @returns A 4x4 matrix representing the converted quaternion
 */
function quatToMatrix(q) {
    const [x, y, z, w] = q;
    return mat4(
        vec4(1 - 2 * (y * y + z * z),     2 * (x * y - w * z),     2 * (x * z + w * y),     0),
        vec4(    2 * (x * y + w * z), 1 - 2 * (x * x + z * z),     2 * (y * z - w * x),     0),
        vec4(    2 * (x * z - w * y),     2 * (y * z + w * x), 1 - 2 * (x * x + y * y),     0),
        vec4()
    );
}

/**
 * Calculate a spherical interpolation rotation between two quaternions.
 * 
 * @param q1 The quaternion defining the first rotation
 * @param q2 The quaternion defining the second rotation
 * @param t The value defining the amount interpolated between the rotations
 * 
 * @returns A quaternion representing the interpolated rotation based on t
 */
function slerp(q1, q2, t) {
    let theta = Math.acos(Math.abs(dot(q1, q2)));

    let a = Math.sin((1-t) * theta) / Math.sin(theta);
    let b = Math.sin(   t  * theta) / Math.sin(theta);

    if (theta == 0) {
        return q1;
    }

    let qa = scale(a, q1);
    let qb = scale(b, q2);

    return add(qa, qb);
}