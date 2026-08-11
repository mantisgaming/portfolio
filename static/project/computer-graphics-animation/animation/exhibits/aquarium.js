let bodyVerts = cube();
let tailVerts = tetra()
let fishRadiusX = 0.5;
let fishRadiusY = 0.5;
let fishRadiusZ = 1.0;
const objRadius = 0.5; //forcefield
const objForce = 0.0001;

class Aquarium {
    position = [-8, 0, 0];
    aquariumVAO;
    aquariumMesh;
    aquariumNormals;
    tankScale = scalem(1, 4, 3);

    fish = []; //array to hold fish and do boid checking

    //sam albert gerald bob charlie
    fishBodyVAO;
    fishMesh;
    fishMeshNormals;
    fishTailVAO;
    fishTail;
    fishTailNormals;

    treasureVAO;
    treasureMesh;
    treasureNormals;
    treasureScale = scalem(0.5, 0.8, 0.5);

    constructor() {
        this.createAquarium();
        this.createFish();
        this.createTreasureChest();
    }

    /* Handles collisions between every particle with every other particle
*/
    handleFishCollisions() {
        for (let i = 0; i < this.fish.length - 1; i++) {
            for (let j = i + 1; j < this.fish.length; j++) {
                const a = this.fish[i];
                const b = this.fish[j];
                a.handleCollisions(b);
            }
        }
    }

    createAquarium(){
        //Aquarium
        // Create and bind vao
        this.aquariumVAO = gl.createVertexArray();
        gl.bindVertexArray(this.aquariumVAO);

        // Create, bind, and populate buffers
        //Vertices
        this.aquariumMesh = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aquariumMesh);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(cube()), gl.STATIC_DRAW);
        //Normals
        this.aquariumNormals = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.aquariumNormals);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(cube()), gl.STATIC_DRAW);

        // Set attributes
        loadDefaultAttributes();
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

    createTreasureChest(){
        // Create and bind vao
        this.treasureVAO = gl.createVertexArray();
        gl.bindVertexArray(this.treasureVAO);

        // Create, bind, and populate buffers
        //Vertices
        this.treasureMesh = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.treasureMesh);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(cube()), gl.STATIC_DRAW);
        //Normals
        this.treasureNormals = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.treasureNormals);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(cube()), gl.STATIC_DRAW);

        // Set attributes
        loadDefaultAttributes();
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

    createFish(){
        this.fishBodyVAO = gl.createVertexArray();
        gl.bindVertexArray(this.fishBodyVAO);

        this.fishMesh = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.fishMesh);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(bodyVerts), gl.STATIC_DRAW);

        setAttribute("a_Point", (loc) => {
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
        });

        this.fishMeshNormals = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.fishMeshNormals);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(bodyVerts), gl.STATIC_DRAW);

        setAttribute("a_Normal", (loc) => {
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
        });

        this.fishTailVAO = gl.createVertexArray();
        gl.bindVertexArray(this.fishTailVAO);
        this.fishTail = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.fishTail);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(tailVerts), gl.STATIC_DRAW);
        setAttribute("a_Point", (loc) => {
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
        });

        this.fishTailNormals = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.fishTailNormals);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(tailVerts), gl.STATIC_DRAW);
        setAttribute("a_Normal", (loc) => {
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
        });

        for(let i = 0; i < 5; i++){ //make a bunch of fish
            let posX = Math.random() * 1.5 - 0.5;
            let posY = Math.random() * 3.0 + 0.5; //don't ever want this to be negative or the fish goes underground
            let posZ = Math.random() * 2.0 - 1.0;
            //Math.random() * (max - min) + min from MDN
            let velocityX = Math.random()/50;
            let velocityY = Math.random()/50;
            let velocityZ = (Math.random() + -0.3)/50;
            var newFish = new Fish(vec3(posX, posY, posZ), vec3(velocityX, velocityY, velocityZ),
                this.fishBodyVAO, this.fishTailVAO);
            this.fish.push(newFish);
        }

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    drawTreasure(){
        loadDefaultModelUniforms();
        setUniform("u_ModelMat", (loc) => {
            gl.uniformMatrix4fv(loc, false, flatten(mult(translate(this.position), this.treasureScale)));
        });
        gl.bindVertexArray(this.treasureVAO);
        setAttribute("a_Color", (loc) => {
            gl.disableVertexAttribArray(loc);
            gl.vertexAttrib3f(loc, 0.459, 0.251, 0.043); //brown chest
        });
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        gl.bindVertexArray(null);
    }

    drawAquarium(){
        //draw aquarium tank
        gl.depthMask(false);
        loadDefaultModelUniforms();
        setUniform("u_ModelMat", (loc) => {
            gl.uniformMatrix4fv(loc, false, flatten(mult(translate(this.position), this.tankScale)));
        });
        gl.bindVertexArray(this.aquariumVAO);
        
        setAttribute("a_Opacity", (loc) => {
            gl.vertexAttrib1f(loc, 0.2);
        });

        setAttribute("a_Shinyness", (loc) => {
            gl.vertexAttrib1f(loc, 50);
        });

        setAttribute("a_Color", (loc) => {
            gl.disableVertexAttribArray(loc);
            gl.vertexAttrib3f(loc, 0, 0.5, 1.0); //blue water
        });
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        gl.bindVertexArray(null);
        gl.depthMask(true);
    }

    /**
     * @override
     * @param {number} dt Change in time since last update
     */
    render(dt) {
        loadDefaultModelUniforms();
        //draw fish
        this.drawTreasure();
        this.handleFishCollisions();
        for(const f of this.fish){
            f.update(dt);
            f.draw(dt);
        }
        this.drawAquarium();
    }
}

class Fish{
    //these are relative to one another, we need to add a offset of -8 for putting in aquarium
    fishBodyScale = scalem(0.2, 0.2, 0.2);
    bodyOffset = translate(-8.0, 0.5, 0.0);
    fishTailScale = scalem(0.2, 0.2, 0.2);
    tailOffset;
    theta;
    constructor(position, velocity, fishVAO, tailVAO) {
        this.position = position;
        this.velocity = velocity;
        this.fishVAO = fishVAO;
        this.tailVAO = tailVAO;
        this.theta = Math.random();
    }

    // Update position based on velocity
    update(dt) {
        this.theta += dt * 5; //needs to move faster to match speed for realism
        const speed = length(this.velocity);

        var force = [0, 0, 0];
        //avoid treasure chest
        const displacement = subtract(this.position, [-8, 0, 0]);
        const direction = normalize([...displacement]);
        const distance = length(displacement);

        const newForce = scale(objForce / (distance * distance), direction);

        force = add(force, newForce);

        if (distance < 2 * objRadius) {
            const overlap = 2 * objRadius - distance;
            this.position = add(this.position, scale(overlap, direction));
        }

        this.velocity = add(this.velocity, force);
        this.position = add(this.position, this.velocity);

        //checks walls
        //wall scaling is 1, 4, 3
        if (this.position[0] > 1 - fishRadiusX) {
            this.position[0] = 1 - fishRadiusX;
            this.velocity[0] *= -1;
        }

        if (this.position[0] < -1 + fishRadiusX) {
            this.position[0] = -1 + fishRadiusX;
            this.velocity[0] *= -1;
        }

        if (this.position[1] > 4 - fishRadiusY) {
            this.position[1] = 4 - fishRadiusY;
            this.velocity[1] *= -1;
        }

        if (this.position[1] < fishRadiusY) {
            this.position[1] = fishRadiusY;
            this.velocity[1] *= -1;
        }

        if (this.position[2] > 3 - fishRadiusZ) {
            this.position[2] = 3 - fishRadiusZ;
            this.velocity[2] *= -1;
        }

        if (this.position[2] < -3 + fishRadiusZ) {
            this.position[2] = -3 + fishRadiusZ;
            this.velocity[2] *= -1;

        }
        if(this.velocity[2] > 0){
            this.tailOffset = mult(translate(-8.0, 0.5, -0.2), rotateY(180));
        }
        else{
            this.tailOffset = translate(-8.0, 0.5, 0.3);
        }

        normalize(this.velocity);
        this.velocity = scale(speed, this.velocity);
        this.position = add(this.position, scale(dt, this.velocity));
    }

    /**
     * Handles collisions between this fish and another fish f.
     */
    handleCollisions(f) {
        const relativeVelocity = subtract(this.velocity, f.velocity);
        const displacement = subtract(f.position, this.position);
        const distance = length(displacement);

        // If they are not overlapping
        if (distance > objRadius * 2)
            return;

        // If they are not moving towards each other
        if (dot(relativeVelocity, displacement) / length(relativeVelocity) / distance < 0)
            return;

        const overlap = objRadius * 2 - distance;
        const direction = normalize([...displacement]);
        this.position = subtract(this.position, scale(overlap / 2, direction));
        f.position = add(f.position, scale(overlap / 2, direction));

        const impulse = scale(dot(relativeVelocity, direction), direction);

        this.velocity = subtract(this.velocity, impulse);
        f.velocity = add(f.velocity, impulse);

    }

    draw(dt){
        loadDefaultModelUniforms();
        let transMatrix = mult(mult(translate(this.position), this.bodyOffset), this.fishBodyScale);
        setUniform("u_ModelMat", (loc) => {
            gl.uniformMatrix4fv(loc, false, flatten(transMatrix));
        });

        setUniform("u_NormalMat", (loc) => {
            gl.uniformMatrix3fv(loc, false, flatten(normalMatrix(transMatrix, true)));
        });

        setAttribute("a_Color", (loc) => {
            gl.disableVertexAttribArray(loc);
            gl.vertexAttrib3f(loc, 1, 0.325, 0.11);
        });
        gl.bindVertexArray(this.fishVAO);
        gl.drawArrays(gl.TRIANGLES, 0, bodyVerts.length);

        //Tail
        gl.bindVertexArray(this.tailVAO);
        let posTailMat = mult(mult(translate(this.position), this.tailOffset), rotateY(90));
        //rotate so it aligns with body correctly
        let tailAngle = Math.sin(this.theta) * 30; //multiply by 30 to cap max angle at 45 on either side so it looks semirealistic
        //console.log(tailAngle);
        let transTailMat = mult(mult(posTailMat, rotateY(tailAngle)), this.fishTailScale);
        //apply tail movement
        setUniform("u_ModelMat", (loc) => {
            gl.uniformMatrix4fv(loc, false, flatten(transTailMat));
        });
        
        setUniform("u_NormalMat", (loc) => {
            gl.uniformMatrix3fv(loc, false, flatten(normalMatrix(transTailMat, true)));
        });

        setAttribute("a_Color", (loc) => {
            gl.disableVertexAttribArray(loc);
            gl.vertexAttrib3f(loc, 1, 0.325, 0.11);
        });
        gl.drawArrays(gl.TRIANGLES, 0, tailVerts.length);
        gl.bindVertexArray(null);
    }
}


/**
 * Create the vertices for a tetrahedron.
 *
 * @returns An array containing the vertices of the tetrahedron
 */
function tetra(){
    let a = vec3(1.0, 0.0, 0.0);
    let b = vec3(-1.0, 1.0, 1.0);
    let c = vec3(-1.0, -1.0, 1.0);
    let d = vec3(-1.0, 0.0, -1.0);

    let points = [
        //triangles, a b c, a c d, a d b, b c d
        a, b, c,
        a, c, d,
        a, d, b,
        b, d, c
    ];
    return points;
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