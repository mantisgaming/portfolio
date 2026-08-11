/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/webgl-utils.ts":
/*!********************************!*\
  !*** ./src/lib/webgl-utils.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebGLUtils: () => (/* binding */ WebGLUtils)
/* harmony export */ });
/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */
const WebGLUtils = function () {
    /**
     * Creates the HTLM for a failure message
     * @param {string} canvasContainerId id of container of th
     *        canvas.
     * @return {string} The html.
     */
    var makeFailHTML = function (msg) {
        return '' +
            '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
            '<td align="center">' +
            '<div style="display: table-cell; vertical-align: middle;">' +
            '<div style="">' + msg + '</div>' +
            '</div>' +
            '</td></tr></table>';
    };
    /**
     * Mesasge for getting a webgl browser
     * @type {string}
     */
    var GET_A_WEBGL_BROWSER = '' +
        'This page requires a browser that supports WebGL.<br/>' +
        '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';
    /**
     * Mesasge for need better hardware
     * @type {string}
     */
    var OTHER_PROBLEM = '' +
        "It doesn't appear your computer can support WebGL.<br/>" +
        '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';
    /**
     * Creates a webgl context. If creation fails it will
     * change the contents of the container of the <canvas>
     * tag to an error message with the correct links for WebGL.
     * @param {Element} canvas. The canvas element to create a
     *     context from.
     * @param {WebGLContextCreationAttirbutes} opt_attribs Any
     *     creation attributes you want to pass in.
     * @return {WebGLRenderingContext} The created context.
     */
    var setupWebGL = function (canvas, opt_attribs) {
        function showLink(str) {
            let container = canvas.parentNode;
            if (container) {
                container.innerHTML = makeFailHTML(str);
            }
        }
        ;
        if (!window.WebGLRenderingContext) {
            showLink(GET_A_WEBGL_BROWSER);
            return null;
        }
        let context = create3DContext(canvas, opt_attribs);
        if (!context) {
            showLink(OTHER_PROBLEM);
        }
        return context;
    };
    /**
     * Creates a webgl context.
     * @param {!Canvas} canvas The canvas tag to get context
     *     from. If one is not passed in one will be created.
     * @return {!WebGLContext} The created context.
     */
    var create3DContext = function (canvas, opt_attribs) {
        let names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        let context = null;
        for (let i = 0; i < names.length; ++i) {
            try {
                context = canvas.getContext(names[i], opt_attribs);
            }
            catch (e) { }
            if (context) {
                break;
            }
        }
        return context;
    };
    return {
        create3DContext: create3DContext,
        setupWebGL: setupWebGL
    };
}();
/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


/***/ }),

/***/ "./src/project-2/lib/Camera.ts":
/*!*************************************!*\
  !*** ./src/project-2/lib/Camera.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Camera: () => (/* binding */ Camera)
/* harmony export */ });
/* harmony import */ var _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math/Matrix */ "./src/project-2/lib/Math/Matrix.ts");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transform */ "./src/project-2/lib/Transform.ts");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Renderer */ "./src/project-2/lib/Renderer.ts");



// A class representing a camera
class Camera {
    // Initialize the camera
    constructor(options) {
        // Camera properties that apply to all cameras
        this.transform = new _Transform__WEBPACK_IMPORTED_MODULE_1__.Transform();
        this.clearBackground = true;
        this.clearColor = [0, 0, 0];
        this.aspectRatio = options.aspectRatio;
        this.near = options.near;
        this.far = options.far;
    }
    // The view transformation matrix
    get ViewMatrix() {
        return this.transform.InverseMatrix;
    }
    // The inverse of ViewMatrix
    get InverseViewMatrix() {
        return this.transform.Matrix;
    }
    // The projection transformation matrix
    get ProjectionMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Identity(4);
    }
    // The view projection matrix that the camera represents
    get ViewProjectionMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.MultiplyM(this.ProjectionMatrix, this.ViewMatrix);
    }
    // Render a list of drawable elements and all enabled drawable elements
    render() {
        if (this.clearBackground) {
            // Clear the background if enabled
            gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        else {
            // Clear only the depth buffer if not enabled
            gl.clear(gl.DEPTH_BUFFER_BIT);
        }
        // Draw every element
        _Renderer__WEBPACK_IMPORTED_MODULE_2__.Renderer.renderers.forEach(renderer => {
            if (renderer.enabled)
                renderer.draw(this);
        });
    }
}


/***/ }),

/***/ "./src/project-2/lib/CameraPerspective.ts":
/*!************************************************!*\
  !*** ./src/project-2/lib/CameraPerspective.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CameraPerspective: () => (/* binding */ CameraPerspective)
/* harmony export */ });
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Camera */ "./src/project-2/lib/Camera.ts");
/* harmony import */ var _Math_Matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Math/Matrix */ "./src/project-2/lib/Math/Matrix.ts");


// Default parameters for a perspective camera
const defaultCameraPerspectiveOptions = {
    fov: 90,
    aspectRatio: 16 / 9,
    near: 0.03,
    far: -500
};
// A class representing a perspective camera
class CameraPerspective extends _Camera__WEBPACK_IMPORTED_MODULE_0__.Camera {
    // Initialize a perspective camera
    constructor(options) {
        let conf = defaultCameraPerspectiveOptions;
        Object.assign(conf, options);
        super(conf);
        this.fov = conf.fov;
    }
    // Get the projection matrix of the camera
    get ProjectionMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_1__.MatMath.Frustum(this.fov, this.aspectRatio, this.near, this.far);
    }
}


/***/ }),

/***/ "./src/project-2/lib/Light.ts":
/*!************************************!*\
  !*** ./src/project-2/lib/Light.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AmbientLight: () => (/* binding */ AmbientLight),
/* harmony export */   DirectionalLight: () => (/* binding */ DirectionalLight),
/* harmony export */   Light: () => (/* binding */ Light),
/* harmony export */   PointLight: () => (/* binding */ PointLight),
/* harmony export */   SpotLight: () => (/* binding */ SpotLight)
/* harmony export */ });
/* harmony import */ var _Math_Utill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math/Utill */ "./src/project-2/lib/Math/Utill.ts");
/* harmony import */ var _Math_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Math/Vector */ "./src/project-2/lib/Math/Vector.ts");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Transform */ "./src/project-2/lib/Transform.ts");



// class representing any type of light
class Light {
    constructor(color = [1, 1, 1], intensity = 1) {
        this.transform = new _Transform__WEBPACK_IMPORTED_MODULE_2__.Transform();
        this.color = color;
        this.intensity = intensity;
        this.enabled = true;
    }
}
// singleton ambient light class
class AmbientLight extends Light {
    // format the light data for a shader
    static getShaderInfo() {
        if (this.instance == undefined || !this.instance.enabled) {
            return {
                color: [0, 0, 0],
                intensity: 0
            };
        }
        return {
            color: this.instance.color,
            intensity: this.instance.intensity
        };
    }
    constructor(color = [1, 1, 1], intensity = 1) {
        super(color, intensity);
        if (AmbientLight.instance != undefined)
            throw new Error("Only one directional light is supported");
        AmbientLight.instance = this;
    }
}
// singleton directional light class
class DirectionalLight extends Light {
    // format the light data for a shader
    static getShaderInfo() {
        if (this.instance == undefined || !this.instance.enabled) {
            return {
                color: [0, 0, 0],
                direction: [0, 0, 0],
                intensity: 0
            };
        }
        return {
            color: this.instance.color,
            direction: _Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.Negate(this.instance.transform.Up),
            intensity: this.instance.intensity
        };
    }
    constructor(rotation = [0, 0, 0], color = [1, 1, 1], intensity = 1) {
        super(color, intensity);
        this.transform.rotation = rotation;
        if (DirectionalLight.instance != undefined)
            throw new Error("Only one directional light is supported");
        DirectionalLight.instance = this;
    }
}
// point light class
class PointLight extends Light {
    // get 8 lights for a shader to use
    static getShaderInfo() {
        const lightCount = 8;
        let result = this.instances.map(light => light.getShaderInfo());
        while (result.length < lightCount) {
            result.push(this.emptyLight);
        }
        while (result.length > lightCount) {
            result.pop();
        }
        return result;
    }
    constructor(point = [0, 0, 0], color = [1, 1, 1], intensity = 1) {
        super(color, intensity);
        this.transform.position = point;
        PointLight.instances.push(this);
    }
    // format the light data for a shader
    getShaderInfo() {
        return {
            color: this.color,
            intensity: this.enabled ? this.intensity : 0,
            point: this.transform.position,
            factor: -1,
            direction: [1, 0, 0]
        };
    }
}
PointLight.instances = [];
// default shader info representing no light
PointLight.emptyLight = {
    color: [0, 0, 0],
    direction: [0, 0, 0],
    factor: 0,
    intensity: 0,
    point: [0, 0, 0]
};
// spot light class
class SpotLight extends PointLight {
    constructor(point = [0, 0, 0], rotation = [0, 0, 0], angle = 90, color = [1, 1, 1], intensity = 1) {
        super(point, color, intensity);
        this.angle = angle;
        this.transform.rotation = rotation;
    }
    // format the light data for a shader
    getShaderInfo() {
        let info = super.getShaderInfo();
        info.factor = Math.cos((0,_Math_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(this.angle / 2));
        info.direction = _Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.Negate(this.transform.Up);
        return info;
    }
}


/***/ }),

/***/ "./src/project-2/lib/MTLParser.ts":
/*!****************************************!*\
  !*** ./src/project-2/lib/MTLParser.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLParser: () => (/* binding */ MTLParser)
/* harmony export */ });
/* harmony import */ var _Utill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utill */ "./src/project-2/lib/Utill.ts");
/* harmony import */ var _Texture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Texture */ "./src/project-2/lib/Texture.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class MTLParser {
    constructor() {
        this.materials = {};
        this.current = {};
    }
    get Materials() {
        return this.materials;
    }
    // parse an MTL file
    parse(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield (0,_Utill__WEBPACK_IMPORTED_MODULE_0__.LoadFile)(path, "text/plain; charset=x-user-defined");
            this.path = path.substring(0, path.lastIndexOf("/") + 1);
            const data = response;
            yield this.parseData(data);
        });
    }
    // read the MTL data line by line
    parseData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reset();
            let lines = data.split("\n");
            for (let i = 0; i < lines.length; i++) {
                yield this.parseLine(lines[i], i);
            }
        });
    }
    // clear the MTL Parser object
    reset() {
        this.materials = {};
    }
    // parse an MTL line
    parseLine(line, lineNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            // split the line
            let args = line.split(/\s+/);
            // get operation
            let operation = args.shift();
            // ignore comments and empty lines
            if (line.trim() == "")
                return;
            if (operation == "#")
                return;
            if (operation == undefined)
                return;
            // parse the operation
            try {
                yield this.callLineParser(operation, args);
            }
            catch (e) {
                console.warn(`Parsing error on line ${lineNumber}: "${line}"\n${e.message}`);
            }
        });
    }
    callLineParser(operation, args) {
        return __awaiter(this, void 0, void 0, function* () {
            // find parser function
            let handler;
            handler = this[`parse_${operation}`];
            // check if the function has been found
            if (typeof handler != "function") {
                //throw new Error(`Parse handler for ${operation} not found`);
                return;
            }
            // call parser function
            yield handler.bind(this)(args);
        });
    }
    // newmtl line
    parse_newmtl(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.materials[args[0]] = {};
            this.current = this.materials[args[0]];
        });
    }
    // Ns line
    parse_Ns(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.current.specularExponent = parseFloat(args[0]);
        });
    }
    // Kd line
    parse_Kd(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.current.diffuseColor = [
                parseFloat(args[0]),
                parseFloat(args[1]),
                parseFloat(args[2])
            ];
        });
    }
    // Ks line
    parse_Ks(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.current.specularColor = [
                parseFloat(args[0]),
                parseFloat(args[1]),
                parseFloat(args[2])
            ];
        });
    }
    // map_Kd line
    parse_map_Kd(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.current.diffuseTexture = new _Texture__WEBPACK_IMPORTED_MODULE_1__.Texture();
            yield this.current.diffuseTexture.loadTexture(this.path + args[0]);
        });
    }
}


/***/ }),

/***/ "./src/project-2/lib/Material.ts":
/*!***************************************!*\
  !*** ./src/project-2/lib/Material.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Material: () => (/* binding */ Material)
/* harmony export */ });
/* harmony import */ var _Light__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Light */ "./src/project-2/lib/Light.ts");
/* harmony import */ var _Math_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Math/Vector */ "./src/project-2/lib/Math/Vector.ts");


// class representing a material
class Material {
    constructor(data, shader) {
        this.useEnvironmentReflections = false;
        this.doRefraction = false;
        this.data = data;
        this.shader = shader;
    }
    // activate this material for use in the next draw call
    activate() {
        gl.useProgram(this.shader.program);
        this.shader.bindMeshAttribs();
        // set material uniforms
        this.shader.setUniform3f("u_DiffuseColor", this.data.diffuseColor);
        this.shader.setUniform3f("u_SpecularColor", this.data.specularColor);
        this.shader.setUniform1f("u_Shinyness", this.data.specularExponent);
        // set diffuse texture map
        if (this.data.diffuseTexture) {
            this.data.diffuseTexture.attachToSlot(0);
        }
        // set environment map
        if (this.environmentMap) {
            this.environmentMap.attachToSlot(1);
        }
        // set whether or not the diffuse texture is in use
        this.shader.setUniform1i("u_UseDiffuseTexture", this.data.diffuseTexture != undefined ? 1 : 0);
        // set whether or not to use the environment map for reflections
        this.shader.setUniform1i("u_UseEnvironmentMap", this.useEnvironmentReflections ? 1 : 0);
        // set whether or not to use the environment map for refractions
        this.shader.setUniform1i("u_DoRefraction", this.doRefraction ? 1 : 0);
        // set texture buffer indices
        this.shader.setUniform1i("u_DiffuseTexture", 0);
        this.shader.setUniform1i("u_EnvironmentMap", 1);
        // set ambient light data
        let ambientData = _Light__WEBPACK_IMPORTED_MODULE_0__.AmbientLight.getShaderInfo();
        this.shader.setUniform3f("u_ALColor", _Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.Multiply(ambientData.color, ambientData.intensity));
        // set directional light data
        let directionalData = _Light__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight.getShaderInfo();
        this.shader.setUniform3f("u_DLColor", _Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.Multiply(directionalData.color, directionalData.intensity));
        this.shader.setUniform3f("u_DLDirection", directionalData.direction);
        // set point/spot light data
        let spotData = _Light__WEBPACK_IMPORTED_MODULE_0__.PointLight.getShaderInfo();
        this.shader.setUniform3fv("u_PLColor", spotData.map(a => _Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.Multiply(a.color, a.intensity)));
        this.shader.setUniform3fv("u_PLPoint", spotData.map(a => a.point));
        this.shader.setUniform3fv("u_PLDirection", spotData.map(a => a.direction));
        this.shader.setUniform1fv("u_PLFactor", spotData.map(a => a.factor));
    }
}


/***/ }),

/***/ "./src/project-2/lib/Math/Matrix.ts":
/*!******************************************!*\
  !*** ./src/project-2/lib/Math/Matrix.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MatMath: () => (/* binding */ MatMath)
/* harmony export */ });
/* harmony import */ var _Utill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utill */ "./src/project-2/lib/Math/Utill.ts");
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _MatMath_MakeEmptyA;

// Matrix math
class MatMath {
    // Create an empty matrix
    static MakeEmpty(width, height, value = 0) {
        return __classPrivateFieldGet(this, _a, "m", _MatMath_MakeEmptyA).call(this, width, height, value);
    }
    // Multiply two matrices
    static MultiplyM(a, b) {
        let matA = a;
        let matB = b;
        let x = a.length;
        let w = b.length;
        let h = matA[0].length;
        let result = __classPrivateFieldGet(this, _a, "m", _MatMath_MakeEmptyA).call(this, w, h);
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                for (let k = 0; k < x; k++) {
                    result[i][j] += matA[k][j] * matB[i][k];
                }
            }
        }
        return result;
    }
    // Multiply a matrix by a vector
    static MultiplyV(a, b) {
        let matA = a;
        let w = b.length;
        let h = matA[0].length;
        let result = Array(h).fill(0);
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                result[j] += matA[i][j] * b[i];
            }
        }
        return result;
    }
    // Multiply a series of square matricies
    static Product(size, ...a) {
        return a.reduce((acc, vec) => this.MultiplyM(acc, vec), this.Identity(size));
    }
    // Transpose of a matrix
    static Transpose(a) {
        let matA = a;
        let w = matA.length;
        let h = matA[0].length;
        let result = __classPrivateFieldGet(this, _a, "m", _MatMath_MakeEmptyA).call(this, h, w);
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                result[j][i] = matA[i][j];
            }
        }
        return result;
    }
    // Crop or expand a matrix to a different size
    static Resize(a, w, h) {
        let matA = a;
        let result = __classPrivateFieldGet(this, _a, "m", _MatMath_MakeEmptyA).call(this, w, h);
        for (let i = 0; i < w && i < matA.length; i++) {
            for (let j = 0; j < h && j < matA[0].length; j++) {
                result[i][j] = matA[i][j];
            }
        }
        return result;
    }
    // Generate an identity matrix
    static Identity(size) {
        let result = __classPrivateFieldGet(this, _a, "m", _MatMath_MakeEmptyA).call(this, size, size, 0);
        for (let i = 0; i < size; i++) {
            result[i][i] = 1;
        }
        return result;
    }
    // Calculate determinant of 2x2 matrix
    static Det2(a) {
        let m = a;
        return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    }
    // Calculate determinant of 3x3 matrix
    static Det3(a) {
        let m = a;
        return (m[0][0] * m[1][1] * m[2][2] +
            m[1][0] * m[2][1] * m[0][2] +
            m[2][0] * m[0][1] * m[1][2] -
            m[2][0] * m[1][1] * m[0][2] -
            m[1][0] * m[0][1] * m[2][2] -
            m[0][0] * m[2][1] * m[1][2]);
    }
    // Calculate determinant of 4x4 matrix
    static Det4(a) {
        let m = a;
        return (-m[0][0] * m[1][1] * m[2][2] * m[3][3]
            + m[1][0] * m[2][1] * m[3][2] * m[0][3]
            - m[2][0] * m[3][1] * m[0][2] * m[1][3]
            + m[3][0] * m[0][1] * m[1][2] * m[2][3]
            + m[3][0] * m[2][1] * m[1][2] * m[0][3]
            - m[2][0] * m[1][1] * m[0][2] * m[3][3]
            + m[1][0] * m[0][1] * m[3][2] * m[2][3]
            - m[0][0] * m[3][1] * m[2][2] * m[1][3]);
    }
    // Calculate inverse of 2x2 matrix
    static Inverse2(a) {
        let m = a;
        let d = this.Det2(a);
        return [
            [m[1][1] / d, -m[1][0] / d],
            [-m[0][1] / d, m[0][0] / d]
        ];
    }
    // Calculate inverse of 3x3 matrix
    static Inverse3(a) {
        let m = a;
        let d = this.Det3(a);
        return [
            [
                this.Det2([
                    [m[1][1], m[1][2]],
                    [m[2][1], m[2][2]]
                ]) / d,
                this.Det2([
                    [m[0][2], m[0][1]],
                    [m[2][2], m[2][1]]
                ]) / d,
                this.Det2([
                    [m[0][1], m[0][2]],
                    [m[1][1], m[1][2]]
                ]) / d
            ],
            [
                this.Det2([
                    [m[1][2], m[1][0]],
                    [m[2][2], m[2][0]]
                ]) / d,
                this.Det2([
                    [m[0][0], m[0][2]],
                    [m[2][0], m[2][2]]
                ]) / d,
                this.Det2([
                    [m[0][2], m[0][0]],
                    [m[1][2], m[1][0]]
                ]) / d
            ],
            [
                this.Det2([
                    [m[1][0], m[1][1]],
                    [m[2][0], m[2][1]]
                ]) / d,
                this.Det2([
                    [m[0][1], m[0][0]],
                    [m[2][1], m[2][0]]
                ]) / d,
                this.Det2([
                    [m[0][0], m[0][1]],
                    [m[1][0], m[1][1]]
                ]) / d
            ]
        ];
    }
    // Calculate inverse of 4x4 matrix
    static Inverse4(a) {
        let inv = inverse4(this.Transpose(a));
        return this.Transpose(inv);
    }
    // Generate a scale transformation matrix
    static Scale(scale) {
        let result = this.Identity(4);
        result[0][0] = scale[0];
        result[1][1] = scale[1];
        result[2][2] = scale[2];
        return result;
    }
    // Generate a uniform scale transformation matrix
    static ScaleU(scale) {
        let result = this.Identity(4);
        result[0][0] = scale;
        result[1][1] = scale;
        result[2][2] = scale;
        return result;
    }
    // Generate a translation transformation matrix
    static Translate(disp) {
        let result = this.Identity(4);
        result[3][0] = disp[0];
        result[3][1] = disp[1];
        result[3][2] = disp[2];
        return result;
    }
    // Generate a rotation transformation matrix about the X axis
    static RotateX(theta) {
        let result = this.Identity(4);
        result[1][1] = Math.cos((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(theta));
        result[2][1] = -Math.sin((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(theta));
        result[1][2] = Math.sin((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(theta));
        result[2][2] = Math.cos((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(theta));
        return result;
    }
    // Generate a rotation transformation matrix about the Y axis
    static RotateY(theta) {
        let result = this.Identity(4);
        result[0][0] = Math.cos((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(theta));
        result[2][0] = Math.sin((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(theta));
        result[0][2] = -Math.sin((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(theta));
        result[2][2] = Math.cos((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(theta));
        return result;
    }
    // Generate a rotation transformation matrix about the Z axis
    static RotateZ(theta) {
        let result = this.Identity(4);
        result[0][0] = Math.cos((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(theta));
        result[1][0] = -Math.sin((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(theta));
        result[0][1] = Math.sin((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(theta));
        result[1][1] = Math.cos((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(theta));
        return result;
    }
    // Generate an orthographic projection matrix
    static Ortho(left, right, bottom, top, near, far) {
        let result = this.Identity(4);
        result[0][0] = 2 / (right - left);
        result[1][1] = 2 / (top - bottom);
        result[2][2] = 2 / (far - near);
        result[3][0] = -(right + left) / (right - left);
        result[3][1] = -(top + bottom) / (top - bottom);
        result[3][2] = -(far + near) / (far - near);
        return result;
    }
    // Generate a frustum (perspective) projection matrix
    static Frustum(fov, aspect, near, far) {
        let f = 1.0 / Math.tan((0,_Utill__WEBPACK_IMPORTED_MODULE_0__.DegToRad)(fov) / 2);
        let d = far - near;
        let result = this.Identity(4);
        result[0][0] = f / aspect;
        result[1][1] = f;
        result[2][2] = -(near + far) / d;
        result[3][2] = -2 * near * far / d;
        result[2][3] = -1;
        result[3][3] = 0;
        return result;
    }
    // Generate a shadow projection matrix
    static Shadow(height) {
        let result = this.Identity(4);
        result[1][3] = 1 / -height;
        result[3][3] = 0;
        return result;
    }
}
_a = MatMath, _MatMath_MakeEmptyA = function _MatMath_MakeEmptyA(width, height, value = 0) {
    // initialize an empty column vector
    let column = [];
    for (let i = 0; i < height; i++) {
        column.push(value);
    }
    // create an empty matrix and fill it with copies of the empty column vector
    let result = [];
    for (let i = 0; i < width; i++) {
        result.push([...column]);
    }
    return result;
};
// Below is code coppied from the original math library in MV.js
// I didn't feel like writing a mat4 inverse function
function vec3(...args) {
    var result = [...args];
    switch (result.length) {
        case 0: result.push(0.0);
        case 1: result.push(0.0);
        case 2: result.push(0.0);
    }
    return result.splice(0, 3);
}
function vec4(...args) {
    var result = [...args];
    switch (result.length) {
        case 0: result.push(0.0);
        case 1: result.push(0.0);
        case 2: result.push(0.0);
        case 3: result.push(1.0);
    }
    return result.splice(0, 4);
}
function mat4(...args) {
    var v = [...args];
    var m = [];
    switch (v.length) {
        case 0:
            v[0] = 1;
        case 1:
            m = [
                vec4(v[0], 0.0, 0.0, 0.0),
                vec4(0.0, v[0], 0.0, 0.0),
                vec4(0.0, 0.0, v[0], 0.0),
                vec4(0.0, 0.0, 0.0, v[0])
            ];
            break;
        default:
            m.push(vec4(v));
            v.splice(0, 4);
            m.push(vec4(v));
            v.splice(0, 4);
            m.push(vec4(v));
            v.splice(0, 4);
            m.push(vec4(v));
            break;
    }
    m.matrix = true;
    return m;
}
function det3(m) {
    var d = m[0][0] * m[1][1] * m[2][2]
        + m[0][1] * m[1][2] * m[2][0]
        + m[0][2] * m[2][1] * m[1][0]
        - m[2][0] * m[1][1] * m[0][2]
        - m[1][0] * m[0][1] * m[2][2]
        - m[0][0] * m[1][2] * m[2][1];
    return d;
}
function det4(m) {
    var m0 = [
        vec3(m[1][1], m[1][2], m[1][3]),
        vec3(m[2][1], m[2][2], m[2][3]),
        vec3(m[3][1], m[3][2], m[3][3])
    ];
    var m1 = [
        vec3(m[1][0], m[1][2], m[1][3]),
        vec3(m[2][0], m[2][2], m[2][3]),
        vec3(m[3][0], m[3][2], m[3][3])
    ];
    var m2 = [
        vec3(m[1][0], m[1][1], m[1][3]),
        vec3(m[2][0], m[2][1], m[2][3]),
        vec3(m[3][0], m[3][1], m[3][3])
    ];
    var m3 = [
        vec3(m[1][0], m[1][1], m[1][2]),
        vec3(m[2][0], m[2][1], m[2][2]),
        vec3(m[3][0], m[3][1], m[3][2])
    ];
    return m[0][0] * det3(m0) - m[0][1] * det3(m1)
        + m[0][2] * det3(m2) - m[0][3] * det3(m3);
}
function inverse4(m) {
    var a = mat4();
    var d = det4(m);
    var a00 = [
        vec3(m[1][1], m[1][2], m[1][3]),
        vec3(m[2][1], m[2][2], m[2][3]),
        vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a01 = [
        vec3(m[1][0], m[1][2], m[1][3]),
        vec3(m[2][0], m[2][2], m[2][3]),
        vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a02 = [
        vec3(m[1][0], m[1][1], m[1][3]),
        vec3(m[2][0], m[2][1], m[2][3]),
        vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a03 = [
        vec3(m[1][0], m[1][1], m[1][2]),
        vec3(m[2][0], m[2][1], m[2][2]),
        vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a10 = [
        vec3(m[0][1], m[0][2], m[0][3]),
        vec3(m[2][1], m[2][2], m[2][3]),
        vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a11 = [
        vec3(m[0][0], m[0][2], m[0][3]),
        vec3(m[2][0], m[2][2], m[2][3]),
        vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a12 = [
        vec3(m[0][0], m[0][1], m[0][3]),
        vec3(m[2][0], m[2][1], m[2][3]),
        vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a13 = [
        vec3(m[0][0], m[0][1], m[0][2]),
        vec3(m[2][0], m[2][1], m[2][2]),
        vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a20 = [
        vec3(m[0][1], m[0][2], m[0][3]),
        vec3(m[1][1], m[1][2], m[1][3]),
        vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a21 = [
        vec3(m[0][0], m[0][2], m[0][3]),
        vec3(m[1][0], m[1][2], m[1][3]),
        vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a22 = [
        vec3(m[0][0], m[0][1], m[0][3]),
        vec3(m[1][0], m[1][1], m[1][3]),
        vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a23 = [
        vec3(m[0][0], m[0][1], m[0][2]),
        vec3(m[1][0], m[1][1], m[1][2]),
        vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a30 = [
        vec3(m[0][1], m[0][2], m[0][3]),
        vec3(m[1][1], m[1][2], m[1][3]),
        vec3(m[2][1], m[2][2], m[2][3])
    ];
    var a31 = [
        vec3(m[0][0], m[0][2], m[0][3]),
        vec3(m[1][0], m[1][2], m[1][3]),
        vec3(m[2][0], m[2][2], m[2][3])
    ];
    var a32 = [
        vec3(m[0][0], m[0][1], m[0][3]),
        vec3(m[1][0], m[1][1], m[1][3]),
        vec3(m[2][0], m[2][1], m[2][3])
    ];
    var a33 = [
        vec3(m[0][0], m[0][1], m[0][2]),
        vec3(m[1][0], m[1][1], m[1][2]),
        vec3(m[2][0], m[2][1], m[2][2])
    ];
    a[0][0] = det3(a00) / d;
    a[0][1] = -det3(a10) / d;
    a[0][2] = det3(a20) / d;
    a[0][3] = -det3(a30) / d;
    a[1][0] = -det3(a01) / d;
    a[1][1] = det3(a11) / d;
    a[1][2] = -det3(a21) / d;
    a[1][3] = det3(a31) / d;
    a[2][0] = det3(a02) / d;
    a[2][1] = -det3(a12) / d;
    a[2][2] = det3(a22) / d;
    a[2][3] = -det3(a32) / d;
    a[3][0] = -det3(a03) / d;
    a[3][1] = det3(a13) / d;
    a[3][2] = -det3(a23) / d;
    a[3][3] = det3(a33) / d;
    return a;
}


/***/ }),

/***/ "./src/project-2/lib/Math/Utill.ts":
/*!*****************************************!*\
  !*** ./src/project-2/lib/Math/Utill.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DegToRad: () => (/* binding */ DegToRad),
/* harmony export */   RadToDeg: () => (/* binding */ RadToDeg)
/* harmony export */ });
// Convert from radians to degrees
function RadToDeg(theta) {
    return theta / Math.PI * 180;
}
// Convert from degrees to radians
function DegToRad(theta) {
    return theta * Math.PI / 180;
}


/***/ }),

/***/ "./src/project-2/lib/Math/Vector.ts":
/*!******************************************!*\
  !*** ./src/project-2/lib/Math/Vector.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VecMath: () => (/* binding */ VecMath)
/* harmony export */ });
// Vector math
class VecMath {
    // Create an empty vector
    static MakeEmpty(size, value = 0) {
        return Array(size).fill(value);
    }
    // Add vector
    static Add(a, b) {
        let result = [...a];
        for (let i = 0; i < a.length; i++) {
            result[i] += b[i];
        }
        return result;
    }
    // Add a list of vectors
    static Sum(size, ...a) {
        return a.reduce((acc, vec) => this.Add(acc, vec), this.MakeEmpty(size));
    }
    // Subtract vector
    static Subtract(a, b) {
        return this.Add(a, this.Negate(b));
    }
    // Negate vector
    static Negate(a) {
        return this.Multiply(a, -1);
    }
    // Multiply vector
    static Multiply(a, b) {
        let result = [...a];
        for (let i = 0; i < a.length; i++) {
            result[i] *= b;
        }
        return result;
    }
    // Divide vector
    static Divide(a, b) {
        return this.Multiply(a, 1 / b);
    }
    // Get the squared magnitude of a vector
    static SqrMagnitude(a) {
        return a.reduce((prev, curr) => prev + curr * curr, 0);
    }
    // The actual magnitude of a vector
    static Magnitude(a) {
        return Math.sqrt(this.SqrMagnitude(a));
    }
    // Get the normalized version of a vector
    static Normalized(a) {
        return this.Divide(a, this.Magnitude(a));
    }
    // Dot product of two vectors
    static Dot(a, b) {
        return a.reduce((prev, _, i) => prev + a[i] * b[i], 0);
    }
    // Cross product of 3D vectors
    static Cross(a, b) {
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]
        ];
    }
    // Crop or expand a matrix to a different size
    static Resize(a, size) {
        let result = this.MakeEmpty(size, 0);
        for (let i = 0; i < size && i < a.length; i++) {
            result[i] = a[i];
        }
        return result;
    }
}


/***/ }),

/***/ "./src/project-2/lib/Mesh.ts":
/*!***********************************!*\
  !*** ./src/project-2/lib/Mesh.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mesh: () => (/* binding */ Mesh),
/* harmony export */   Primitives: () => (/* binding */ Primitives)
/* harmony export */ });
// class representing a mesh
class Mesh {
    constructor(verts, triangles, submeshes, drawMode = gl.STATIC_DRAW) {
        this.vertices = verts;
        this.triangles = triangles;
        this.submeshes = submeshes;
        this.drawMode = drawMode;
        this.vertexBuffer = gl.createBuffer();
        this.elementBuffer = gl.createBuffer();
        this.refreshBuffer();
    }
    // if the model data cache has been changed, the buffers must be reloaded
    refreshBuffer() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.formatVertices(this.vertices), this.drawMode);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.triangles), this.drawMode);
    }
    // convert the vertex array to a list that webgl can use
    formatVertices(verts) {
        return new Float32Array(verts.flatMap((val) => [
            ...val.point,
            ...val.color,
            ...val.uv,
            ...val.normal
        ]));
    }
    // bind the mesh array and element buffers
    bindBuffers() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
    }
}
// class containing static primitive meshes
class Primitives {
    static get Square() {
        if (this.square != undefined)
            return this.square;
        this.square = new Mesh([
            {
                point: [-1, -1, 0],
                uv: [0, 0],
                color: [1, 1, 1],
                normal: [0, 0, 1]
            },
            {
                point: [1, -1, 0],
                uv: [1, 0],
                color: [1, 1, 1],
                normal: [0, 0, 1]
            },
            {
                point: [1, 1, 0],
                uv: [1, 1],
                color: [1, 1, 1],
                normal: [0, 0, 1]
            },
            {
                point: [-1, 1, 0],
                uv: [0, 1],
                color: [1, 1, 1],
                normal: [0, 0, 1]
            }
        ], [
            0, 1, 2, 0, 2, 3
        ], [{
                length: 6,
                start: 0
            }]);
        return this.square;
    }
}
Primitives.square = undefined;


/***/ }),

/***/ "./src/project-2/lib/MeshRenderer.ts":
/*!*******************************************!*\
  !*** ./src/project-2/lib/MeshRenderer.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MeshRenderer: () => (/* binding */ MeshRenderer)
/* harmony export */ });
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Renderer */ "./src/project-2/lib/Renderer.ts");
/* harmony import */ var _Math_Matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Math/Matrix */ "./src/project-2/lib/Math/Matrix.ts");


// draws a mesh to a camera
class MeshRenderer extends _Renderer__WEBPACK_IMPORTED_MODULE_0__.Renderer {
    get Material() {
        return this.materials[0];
    }
    set Material(material) {
        if (this.materials.length == 0) {
            this.materials.push(material);
            return;
        }
        this.materials[0] = material;
    }
    constructor(mesh, ...materials) {
        super();
        this.mesh = mesh;
        this.materials = materials;
    }
    draw(camera) {
        this.mesh.bindBuffers();
        this.mesh.submeshes.forEach((submesh, index) => {
            var _a;
            // use first material if not all submeshes have unique materials
            let material = (_a = this.materials[index]) !== null && _a !== void 0 ? _a : this.Material;
            // enable the material
            material.activate();
            // load uniforms
            material.shader.setUniformMat4f("u_MVPMat", _Math_Matrix__WEBPACK_IMPORTED_MODULE_1__.MatMath.MultiplyM(camera.ViewProjectionMatrix, this.transform.Matrix));
            material.shader.setUniformMat4f("u_ModelMat", this.transform.Matrix);
            material.shader.setUniformMat3f("u_NormalMat", this.transform.NormalMatrix);
            material.shader.setUniform3f("u_CPoint", camera.transform.WorldPosition);
            // draw the submesh
            gl.drawElements(gl.TRIANGLES, submesh.length, gl.UNSIGNED_SHORT, submesh.start);
        });
    }
}


/***/ }),

/***/ "./src/project-2/lib/OBJParser.ts":
/*!****************************************!*\
  !*** ./src/project-2/lib/OBJParser.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJParser: () => (/* binding */ OBJParser)
/* harmony export */ });
/* harmony import */ var _Utill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utill */ "./src/project-2/lib/Utill.ts");
/* harmony import */ var _Math_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Math/Vector */ "./src/project-2/lib/Math/Vector.ts");
/* harmony import */ var _Mesh__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Mesh */ "./src/project-2/lib/Mesh.ts");
/* harmony import */ var _MTLParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MTLParser */ "./src/project-2/lib/MTLParser.ts");
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Material */ "./src/project-2/lib/Material.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class OBJVertex {
    constructor(point, color, uv, normal) {
        this.point = point;
        this.color = color;
        this.uv = uv;
        this.normal = normal;
    }
    equals(other) {
        return (this.point == other.point &&
            this.color == other.color &&
            this.uv == other.uv &&
            this.normal == other.normal);
    }
}
class OBJParser {
    constructor() {
        // state
        this.points = [];
        this.colors = [];
        this.uvs = [];
        this.normals = [];
        this.currentMaterial = "";
        this.materialSegmentStart = 0;
        this.mtlParser = new _MTLParser__WEBPACK_IMPORTED_MODULE_3__.MTLParser();
        // results
        this.verts = [];
        this.indicies = [];
        this.materialNames = [];
        this.materialFiles = [];
        this.objectName = "";
        this.materialSegments = [];
    }
    parse(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield (0,_Utill__WEBPACK_IMPORTED_MODULE_0__.LoadFile)(path, "text/plain; charset=x-user-defined");
            const data = response;
            this.path = path.substring(0, path.lastIndexOf("/") + 1);
            yield this.parseData(data);
            return this;
        });
    }
    parseData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reset();
            let lines = data.split("\n");
            for (let i = 0; i < lines.length; i++) {
                yield this.parseLine(lines[i], i);
            }
            this.endMaterialSegment();
        });
    }
    reset() {
        this.points = [];
        this.colors = [];
        this.uvs = [];
        this.normals = [];
        this.currentMaterial = "";
        this.materialSegmentStart = 0;
    }
    parseLine(line, lineNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            // split the line
            let args = line.split(/\s+/);
            // get operation
            let operation = args.shift();
            // ignore comments and empty lines
            if (line.trim() == "")
                return;
            if (operation == "#")
                return;
            if (operation == undefined)
                return;
            // parse the operation
            try {
                yield this.callLineParser(operation, args);
            }
            catch (e) {
                console.warn(`Parsing error on line ${lineNumber}: "${line}"\n${e.message}`);
            }
        });
    }
    callLineParser(operation, args) {
        return __awaiter(this, void 0, void 0, function* () {
            // find parser function
            let handler;
            handler = this[`parse_${operation}`];
            // check if the function has been found
            if (typeof handler != "function") {
                //throw new Error(`Parse handler for ${operation} not found`);
                return;
            }
            // call parser function
            yield handler.bind(this)(args);
        });
    }
    // o line
    parse_o(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.objectName = args[0];
        });
    }
    // mtllib line
    parse_mtllib(args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mtlParser.parse(this.path + args[0]);
        });
    }
    // usemtl line
    parse_usemtl(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.materialNames.indexOf(args[0]) == -1)
                this.materialNames.push(args[0]);
            this.endMaterialSegment();
            this.currentMaterial = args[0];
        });
    }
    // v line
    parse_v(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let vec = [
                parseFloat(args[0]),
                parseFloat(args[1]),
                parseFloat(args[2])
            ];
            // scale point by w
            if (args.length == 4)
                vec = _Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.Multiply(vec, parseFloat(args[3]));
            // parse color
            let color = [1, 1, 1];
            if (args.length == 6)
                color = [
                    parseFloat(args[3]),
                    parseFloat(args[4]),
                    parseFloat(args[5])
                ];
            // add points and colors
            this.points.push(vec);
            this.colors.push(color);
        });
    }
    // vt line
    parse_vt(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let vec = [
                parseFloat(args[0]),
                1 - parseFloat(args[1])
            ];
            this.uvs.push(vec);
        });
    }
    // vn line
    parse_vn(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let vec = [
                parseFloat(args[0]),
                parseFloat(args[1]),
                parseFloat(args[2])
            ];
            this.normals.push(vec);
        });
    }
    // f line
    parse_f(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let faceVerts = [];
            args.forEach((arg) => {
                faceVerts.push(this.parseVert(arg));
            });
            let indices = faceVerts.map(this.getVertIndex.bind(this));
            let triangulated = this.triangulateIndicies(indices);
            this.indicies.push(...triangulated);
        });
    }
    // convert a vertex (format n, n/n, n//n, or n/n/n into an obj vertex object)
    parseVert(arg) {
        let vals = [undefined, undefined, undefined];
        arg.split("/").forEach((val, index) => {
            // ignore white space values
            if (val.trim() == "")
                return;
            // parse index
            try {
                vals[index] = parseInt(val) - 1; // obj files are 1 indexed
            }
            catch (_a) {
                throw new Error(`Vertex contains invalid characters: ${arg}`);
            }
        });
        // load color and position
        if (vals[0] == undefined)
            throw new Error(`Vertex requires a position index: ${arg}`);
        if (vals[0] >= this.points.length)
            throw new Error(`Vertex position index is out of range: ${vals[0]} > ${this.points.length}`);
        let point = this.points[vals[0]];
        let color = this.colors[vals[0]];
        // load UV
        let uv = [0, 0];
        if (vals[1] != undefined) {
            if (vals[1] >= this.uvs.length)
                throw new Error(`Vertex uv index is out of range: ${vals[1]} > ${this.uvs.length}`);
            uv = this.uvs[vals[1]];
        }
        // load normal
        if (vals[2] == undefined)
            throw new Error(`No vertex normal supplied: ${arg}`);
        if (vals[2] >= this.normals.length)
            throw new Error(`Vertex normal index is out of range: ${vals[2]} > ${this.normals.length}`);
        let normal = this.normals[vals[2]];
        return new OBJVertex(point, color, uv, normal);
    }
    // If a vertex is already added, get its index
    // Otherwise add it to the list and return the index
    getVertIndex(vert) {
        // find the index and return it if it exists
        let index = this.verts.findIndex((val) => val.equals(vert));
        if (index != -1) {
            console.log("Found duplicate!");
            return index;
        }
        // otherwise add it
        this.verts.push(vert);
        return this.verts.length - 1;
    }
    // triangulate the indices of a face with 3 or more vertices
    triangulateIndicies(face) {
        let result = [];
        for (let i = 0; i < face.length - 2; i++) {
            result.push(face[0]);
            result.push(face[i + 1]);
            result.push(face[i + 2]);
        }
        return result;
    }
    // end a material segment to be separated into submeshes
    endMaterialSegment() {
        if (this.materialSegmentStart == this.indicies.length)
            return;
        this.materialSegments.push({
            material: this.currentMaterial,
            start: this.materialSegmentStart,
            end: this.indicies.length
        });
    }
    // create the mesh parsed by this OBJParser
    getMesh() {
        return new _Mesh__WEBPACK_IMPORTED_MODULE_2__.Mesh(this.verts, this.indicies, this.materialSegments.map(segment => ({
            start: segment.start,
            length: segment.end - segment.start
        })));
    }
    // get the materials for each submesh
    getMaterials(shader) {
        return this.materialSegments.map(segment => new _Material__WEBPACK_IMPORTED_MODULE_4__.Material(this.mtlParser.Materials[segment.material], shader));
    }
}


/***/ }),

/***/ "./src/project-2/lib/Renderer.ts":
/*!***************************************!*\
  !*** ./src/project-2/lib/Renderer.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Renderer: () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Transform */ "./src/project-2/lib/Transform.ts");

// a class for something that can be drawn to a camera
class Renderer {
    constructor(top = false) {
        this.enabled = true;
        this.transform = new _Transform__WEBPACK_IMPORTED_MODULE_0__.Transform();
        if (top)
            Renderer.renderers.unshift(this);
        else
            Renderer.renderers.push(this);
    }
}
Renderer.renderers = [];


/***/ }),

/***/ "./src/project-2/lib/Shader.ts":
/*!*************************************!*\
  !*** ./src/project-2/lib/Shader.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Shader: () => (/* binding */ Shader)
/* harmony export */ });
// a class representing a shader
class Shader {
    constructor(vertGLSL, fragGLSL) {
        let vertShader = this.tryCreateShader(gl.VERTEX_SHADER, vertGLSL);
        let fragShader = this.tryCreateShader(gl.FRAGMENT_SHADER, fragGLSL);
        this.program = this.tryCreateProgram(vertShader, fragShader);
    }
    // try to create a webgl shader
    tryCreateShader(type, glsl) {
        let shader = gl.createShader(type);
        if (shader == null)
            throw new Error("Failed to create shader");
        gl.shaderSource(shader, glsl);
        gl.compileShader(shader);
        // check if there were any errors
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error(`Shader failed to compile:\n${gl.getShaderInfoLog(shader)}`);
        }
        return shader;
    }
    // try to create a webgl program
    tryCreateProgram(vertShader, fragShader) {
        let program = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            let info = gl.getProgramInfoLog(program);
            throw new Error(`Shader program failed to link:\n${info}`);
        }
        return program;
    }
    // bind the vertex attributes of a mesh to this shader
    bindMeshAttribs() {
        gl.useProgram(this.program);
        this.bindAttribute("a_Point", 3, 11, 0);
        this.bindAttribute("a_Color", 3, 11, 3);
        this.bindAttribute("a_UV", 2, 11, 6);
        this.bindAttribute("a_Normal", 3, 11, 8);
    }
    // bind an individual attribute to this shader
    bindAttribute(name, size, stride, offset) {
        let attrib = gl.getAttribLocation(this.program, name);
        if (attrib == -1)
            return;
        gl.vertexAttribPointer(attrib, size, gl.FLOAT, false, stride * Float32Array.BYTES_PER_ELEMENT, offset * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(attrib);
    }
    // === uniform setters that I needed === //
    setUniform3f(name, value) {
        let loc = gl.getUniformLocation(this.program, name);
        if (loc != -1)
            gl.uniform3fv(loc, value);
    }
    setUniform3fv(name, value) {
        let loc = gl.getUniformLocation(this.program, name);
        if (loc != -1)
            gl.uniform3fv(loc, value.flat());
    }
    setUniform1fv(name, value) {
        let loc = gl.getUniformLocation(this.program, name);
        if (loc != -1)
            gl.uniform1fv(loc, value);
    }
    setUniform1f(name, value) {
        let loc = gl.getUniformLocation(this.program, name);
        if (loc != -1)
            gl.uniform1f(loc, value);
    }
    setUniform1i(name, value) {
        let loc = gl.getUniformLocation(this.program, name);
        if (loc != -1)
            gl.uniform1i(loc, value);
    }
    setUniformMat3f(name, value) {
        let loc = gl.getUniformLocation(this.program, name);
        if (loc != -1)
            gl.uniformMatrix3fv(loc, false, value.flat());
    }
    setUniformMat4f(name, value) {
        let loc = gl.getUniformLocation(this.program, name);
        if (loc != -1)
            gl.uniformMatrix4fv(loc, false, value.flat());
    }
}


/***/ }),

/***/ "./src/project-2/lib/ShadowRenderer.ts":
/*!*********************************************!*\
  !*** ./src/project-2/lib/ShadowRenderer.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShadowRenderer: () => (/* binding */ ShadowRenderer)
/* harmony export */ });
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Renderer */ "./src/project-2/lib/Renderer.ts");
/* harmony import */ var _Mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Mesh */ "./src/project-2/lib/Mesh.ts");
/* harmony import */ var _Math_Matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Math/Matrix */ "./src/project-2/lib/Math/Matrix.ts");
/* harmony import */ var _Math_Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Math/Vector */ "./src/project-2/lib/Math/Vector.ts");




// a class that draws the shadow of an object for a point light
class ShadowRenderer extends _Renderer__WEBPACK_IMPORTED_MODULE_0__.Renderer {
    constructor(target, light, material) {
        super();
        this.material = material;
        this.target = target;
        this.light = light;
        // mesh is set to dynamic draw because it is updated every frame
        this.mesh = new _Mesh__WEBPACK_IMPORTED_MODULE_1__.Mesh([], [], [], gl.DYNAMIC_DRAW);
    }
    draw(camera) {
        if (!this.target.enabled)
            return;
        // update the shape of the shadow
        this.updateShadow();
        // load the mesh and material
        this.mesh.bindBuffers();
        this.material.activate();
        this.material.shader.setUniformMat4f("u_MVPMat", _Math_Matrix__WEBPACK_IMPORTED_MODULE_2__.MatMath.MultiplyM(camera.ViewProjectionMatrix, this.transform.Matrix));
        // draw the shadow
        this.mesh.submeshes.forEach(submesh => {
            gl.drawElements(gl.TRIANGLES, submesh.length, gl.UNSIGNED_SHORT, submesh.start);
        });
    }
    updateShadow() {
        // copy the triangles and submeshes
        this.mesh.triangles = this.target.mesh.triangles;
        this.mesh.submeshes = this.target.mesh.submeshes;
        // create the transformation matrix to project the shadow onto the XZ plane
        let height = this.light.transform.WorldPosition[1];
        let transformation = _Math_Matrix__WEBPACK_IMPORTED_MODULE_2__.MatMath.Identity(4);
        transformation = _Math_Matrix__WEBPACK_IMPORTED_MODULE_2__.MatMath.MultiplyM(this.target.transform.Matrix, transformation);
        transformation = _Math_Matrix__WEBPACK_IMPORTED_MODULE_2__.MatMath.MultiplyM(_Math_Matrix__WEBPACK_IMPORTED_MODULE_2__.MatMath.Translate(_Math_Vector__WEBPACK_IMPORTED_MODULE_3__.VecMath.Negate(this.light.transform.WorldPosition)), transformation);
        transformation = _Math_Matrix__WEBPACK_IMPORTED_MODULE_2__.MatMath.MultiplyM(_Math_Matrix__WEBPACK_IMPORTED_MODULE_2__.MatMath.Shadow(height), transformation);
        transformation = _Math_Matrix__WEBPACK_IMPORTED_MODULE_2__.MatMath.MultiplyM(_Math_Matrix__WEBPACK_IMPORTED_MODULE_2__.MatMath.Translate(this.light.transform.WorldPosition), transformation);
        // transform each of the vertices
        this.mesh.vertices = [];
        this.target.mesh.vertices.forEach((vert) => {
            let newPoint = _Math_Matrix__WEBPACK_IMPORTED_MODULE_2__.MatMath.MultiplyV(transformation, [...vert.point, 1]);
            this.mesh.vertices.push({
                color: [1, 1, 1],
                normal: [0, 1, 0],
                uv: [0, 0],
                point: _Math_Vector__WEBPACK_IMPORTED_MODULE_3__.VecMath.Divide(_Math_Vector__WEBPACK_IMPORTED_MODULE_3__.VecMath.Resize(newPoint, 3), newPoint[3])
            });
        });
        // reload the mesh buffers to fill their updated data
        this.mesh.refreshBuffer();
    }
}


/***/ }),

/***/ "./src/project-2/lib/Skybox.ts":
/*!*************************************!*\
  !*** ./src/project-2/lib/Skybox.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Skybox: () => (/* binding */ Skybox)
/* harmony export */ });
/* harmony import */ var _Utill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utill */ "./src/project-2/lib/Utill.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

// Class representing a skybox (cubemap) texture
class Skybox {
    constructor() {
        this.texture = gl.createTexture();
    }
    // load a cubemap skybox
    loadSkybox(pathPosX, pathPosY, pathPosZ, pathNegX, pathNegY, pathNegZ) {
        return __awaiter(this, void 0, void 0, function* () {
            let images = yield Promise.all([
                (0,_Utill__WEBPACK_IMPORTED_MODULE_0__.loadImage)(pathPosX),
                (0,_Utill__WEBPACK_IMPORTED_MODULE_0__.loadImage)(pathPosY),
                (0,_Utill__WEBPACK_IMPORTED_MODULE_0__.loadImage)(pathPosZ),
                (0,_Utill__WEBPACK_IMPORTED_MODULE_0__.loadImage)(pathNegX),
                (0,_Utill__WEBPACK_IMPORTED_MODULE_0__.loadImage)(pathNegY),
                (0,_Utill__WEBPACK_IMPORTED_MODULE_0__.loadImage)(pathNegZ),
            ]);
            // bind the texture
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
            // configure the texture
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            // load the texture
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[0]);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[1]);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[2]);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[3]);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[4]);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[5]);
            // generate mipmaps
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        });
    }
    // attach the texture to the specified slot
    attachToSlot(index) {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
    }
}


/***/ }),

/***/ "./src/project-2/lib/SkyboxRenderer.ts":
/*!*********************************************!*\
  !*** ./src/project-2/lib/SkyboxRenderer.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SkyboxRenderer: () => (/* binding */ SkyboxRenderer)
/* harmony export */ });
/* harmony import */ var _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math/Matrix */ "./src/project-2/lib/Math/Matrix.ts");
/* harmony import */ var _Mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Mesh */ "./src/project-2/lib/Mesh.ts");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Renderer */ "./src/project-2/lib/Renderer.ts");



// renderer for a skybox
class SkyboxRenderer extends _Renderer__WEBPACK_IMPORTED_MODULE_2__.Renderer {
    constructor(skybox, shader) {
        // super with "true" will put it at the top of the render list
        super(true);
        this.skybox = skybox;
        this.shader = shader;
    }
    draw(camera) {
        // load the square primitive
        const sqr = _Mesh__WEBPACK_IMPORTED_MODULE_1__.Primitives.Square;
        sqr.bindBuffers();
        this.shader.bindMeshAttribs();
        // load the material and texture
        this.skybox.attachToSlot(0);
        this.shader.setUniform1i("u_CubeMap", 0);
        this.shader.setUniformMat3f("u_RotationMat", _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Resize(camera.InverseViewMatrix, 3, 3));
        this.shader.setUniformMat4f("u_InvProjection", _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Inverse4(camera.ProjectionMatrix));
        // draw without modifying the depth buffer
        gl.disable(gl.DEPTH_TEST);
        gl.depthMask(false);
        gl.drawElements(gl.TRIANGLES, sqr.submeshes[0].length, gl.UNSIGNED_SHORT, sqr.submeshes[0].start);
        gl.enable(gl.DEPTH_TEST);
        gl.depthMask(true);
    }
}


/***/ }),

/***/ "./src/project-2/lib/Texture.ts":
/*!**************************************!*\
  !*** ./src/project-2/lib/Texture.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Texture: () => (/* binding */ Texture)
/* harmony export */ });
/* harmony import */ var _Utill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utill */ "./src/project-2/lib/Utill.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

// Class representing a texture
class Texture {
    constructor() {
        this.texture = gl.createTexture();
    }
    // load a texture from a path
    loadTexture(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let img = yield (0,_Utill__WEBPACK_IMPORTED_MODULE_0__.loadImage)(path);
            // bind the texture
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            // configure the texture (use linear filtering by default)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            // load the texture
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            // generate mipmaps
            gl.generateMipmap(gl.TEXTURE_2D);
        });
    }
    // attach the texture to the specified slot
    attachToSlot(index) {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }
}


/***/ }),

/***/ "./src/project-2/lib/Time.ts":
/*!***********************************!*\
  !*** ./src/project-2/lib/Time.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Time: () => (/* binding */ Time)
/* harmony export */ });
// Class to keep track of timing
class Time {
    // Get the time since the first update or
    // the last reset (whichever is more recent)
    static get SystemStartTime() {
        var _a;
        return (_a = this.startTime) !== null && _a !== void 0 ? _a : 0;
    }
    // Get the system time at the last update
    static get SystemCurrentTime() {
        var _a;
        return (_a = this.currentTime) !== null && _a !== void 0 ? _a : 0;
    }
    // Get the time passed since the
    // first update or last reset
    static get Time() {
        if (this.currentTime == undefined)
            return 0;
        if (this.startTime == undefined)
            return 0;
        return this.currentTime - this.startTime;
    }
    // Get the time since the last update
    static get DeltaTime() {
        var _a;
        return (_a = this.deltaTime) !== null && _a !== void 0 ? _a : 0;
    }
    // Check if reset has been called
    static get IsInitialized() {
        return this.initialized;
    }
    // Read the current time in seconds
    static GetActualTime() {
        return window.performance.now() / 1000;
    }
    // Reset the clock
    static reset() {
        this.currentTime = this.GetActualTime();
        this.startTime = this.currentTime;
        this.deltaTime = 0;
        this.initialized = true;
    }
    // Update the clock to represent the next frame
    static update() {
        // If reset was never called, it will be called on the first update
        if (!this.IsInitialized) {
            this.reset();
            return;
        }
        let newTime = this.GetActualTime();
        this.deltaTime = newTime - this.currentTime;
        this.currentTime = newTime;
    }
}
Time.startTime = 0;
Time.currentTime = 0;
Time.deltaTime = 0;
Time.initialized = false;


/***/ }),

/***/ "./src/project-2/lib/Transform.ts":
/*!****************************************!*\
  !*** ./src/project-2/lib/Transform.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transform: () => (/* binding */ Transform)
/* harmony export */ });
/* harmony import */ var _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math/Matrix */ "./src/project-2/lib/Math/Matrix.ts");
/* harmony import */ var _Math_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Math/Vector */ "./src/project-2/lib/Math/Vector.ts");


// represents the transformations on an object
class Transform {
    constructor() {
        this.pivot = _Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.MakeEmpty(3); // Pivot allows the origin of the object to be changed
        this.position = _Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.MakeEmpty(3);
        this.rotation = _Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.MakeEmpty(3);
        this.scale = _Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.MakeEmpty(3, 1);
        this.parent = null;
    }
    get WorldPosition() {
        return _Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.Resize(_Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.MultiplyV(this.Matrix, [0, 0, 0, 1]), 3);
    }
    get Forward() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.MultiplyV(this.NormalMatrix, [0, 0, -1]);
    }
    get Right() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.MultiplyV(this.NormalMatrix, [1, 0, 0]);
    }
    get Up() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.MultiplyV(this.NormalMatrix, [0, 1, 0]);
    }
    // Get the local to world space transformation of
    // the transform including parent transforms
    get Matrix() {
        if (this.parent)
            return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.MultiplyM(this.parent.Matrix, this.LocalMatrix);
        return this.LocalMatrix;
    }
    // Get the world to local space transformation of
    // the transform including parent transforms
    get InverseMatrix() {
        if (this.parent)
            return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.MultiplyM(this.InverseLocalMatrix, this.parent.InverseMatrix);
        return this.InverseLocalMatrix;
    }
    // Get the local to world space transformation of
    // the transform excluding parent transforms
    get LocalMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Product(4, this.LocalTranslationMatrix, this.LocalRotationMatrix, this.LocalScaleMatrix, this.PivotMatrix);
    }
    // Get the world to local space transformation of
    // the transform excluding parent transforms
    get InverseLocalMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Product(4, this.InversePivotMatrix, this.InverseLocalScaleMatrix, this.InverseLocalRotationMatrix, this.InverseLocalTranslationMatrix);
    }
    // Get the matrix that represents the repositioning of the transform's pivot
    get PivotMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Translate(_Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.Negate(this.pivot));
    }
    // Inverse of PivotMatrix
    get InversePivotMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Translate(this.pivot);
    }
    // Get the matrix that represents the scale of the transform
    get LocalScaleMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Scale(this.scale);
    }
    // Inverse of LocalScaleMatrix
    get InverseLocalScaleMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Scale([1 / this.scale[0], 1 / this.scale[1], 1 / this.scale[2]]);
    }
    // Get the matrix that represents the rotation of the transform
    get LocalRotationMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Product(4, _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.RotateZ(this.rotation[2]), _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.RotateY(this.rotation[1]), _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.RotateX(this.rotation[0]));
    }
    // Inverse of LocalRotationMatrix
    get InverseLocalRotationMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Product(4, _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.RotateX(-this.rotation[0]), _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.RotateY(-this.rotation[1]), _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.RotateZ(-this.rotation[2]));
    }
    // Get the matrix that represents the translation of the transform
    get LocalTranslationMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Translate(this.position);
    }
    // Inverse of LocalTranslationMatrix
    get InverseLocalTranslationMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Translate(_Math_Vector__WEBPACK_IMPORTED_MODULE_1__.VecMath.Negate(this.position));
    }
    // Get the matrix to translate the vertex normals from local to world space
    get NormalMatrix() {
        return _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Resize(_Math_Matrix__WEBPACK_IMPORTED_MODULE_0__.MatMath.Transpose(this.InverseMatrix), 3, 3);
    }
}


/***/ }),

/***/ "./src/project-2/lib/Utill.ts":
/*!************************************!*\
  !*** ./src/project-2/lib/Utill.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadFile: () => (/* binding */ LoadFile),
/* harmony export */   loadImage: () => (/* binding */ loadImage)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Load an external file
function LoadFile(path, mimeType) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            if (mimeType)
                req.overrideMimeType(mimeType); // Ensure correct MIME type (see [3])
            req.open('GET', path);
            req.addEventListener("error", () => {
                reject(new Error(req.statusText));
            });
            req.addEventListener("load", () => {
                resolve([req.response, req.responseType]);
            });
            req.send();
        });
    });
}
// load an external image
function loadImage(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            let img = new Image();
            img.crossOrigin = "";
            img.src = path;
            img.onload = () => {
                resolve(img);
            };
        });
    });
}


/***/ }),

/***/ "./src/project-2/shaders/phong-frag.glsl":
/*!***********************************************!*\
  !*** ./src/project-2/shaders/phong-frag.glsl ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// preprocessor constants\n#ifndef point_light_count\n#define point_light_count 8\n#endif\n\nprecision mediump float;\n\n// fragment attributes\nvarying vec3 v_Point;\nvarying vec3 v_Color;\nvarying vec2 v_UV;\nvarying vec3 v_WorldNormal;\n\n// camera info\nuniform vec3 u_CPoint;\n\n// ambient light info\nuniform vec3 u_ALColor;\n\n// directional light info\nuniform vec3 u_DLColor;\nuniform vec3 u_DLDirection;\n\n// point light info\nuniform vec3 u_PLColor[point_light_count];\nuniform vec3 u_PLPoint[point_light_count];\nuniform vec3 u_PLDirection[point_light_count];\nuniform float u_PLFactor[point_light_count];\n\n// material info\nuniform float u_Shinyness;\nuniform vec3 u_DiffuseColor;\nuniform vec3 u_SpecularColor;\nuniform sampler2D u_DiffuseTexture;\nuniform bool u_UseDiffuseTexture;\nuniform samplerCube u_EnvironmentMap;\nuniform bool u_UseEnvironmentMap;\nuniform bool u_DoRefraction;\n\n// Calculate the intensity of the diffuse lighting\nfloat diffuseReflection(\n    in vec3 surfaceNormal,\n    in vec3 lightDirection) {\n\n    return clamp(dot(surfaceNormal, -lightDirection), 0.0, 1.0);\n}\n\nvec3 getReflection(\n    in vec3 surfaceNormal,\n    in vec3 vector) {\n    return vector -\n        (\n            surfaceNormal * 2.0 *\n            dot(vector, surfaceNormal)\n        );\n}\n\n// Calculate the intensity of the specular reflection\nfloat specularReflection(\n    in vec3 surfaceNormal,\n    in vec3 lightDirection,\n    in vec3 cameraDirection,\n    in float shinyness) {\n\n    // Calculate the direction light reflects towards\n    vec3 specularDirection = getReflection(surfaceNormal, lightDirection);\n    \n    // Compare the reflection direction to the\n    // camera direction and add shinyness\n    return pow(\n        clamp(\n            dot(specularDirection, -cameraDirection),\n            0.0, 1.0\n        ), shinyness);\n}\n\n// Helper function for inverse square falloff\nfloat invSqr(in float distance) {\n    return 1.0 / (distance * distance);\n}\n\n// Calculate the diffuse color for a given light\nvec3 calcDiffuse(\n    in vec3 lightColor,\n    in vec3 surfaceColor,\n    in vec3 surfaceNormal,\n    in vec3 lightDirection) {\n    \n    return lightColor *\n        surfaceColor *\n        diffuseReflection(surfaceNormal, lightDirection);\n}\n\n// Calculate the specular color for a given light\nvec3 calcSpecular(\n    in vec3 lightColor,\n    in vec3 surfaceNormal,\n    in vec3 lightDirection,\n    in vec3 cameraDirection,\n    in float shinyness) {\n    \n    return lightColor *\n        specularReflection(surfaceNormal, lightDirection, cameraDirection, shinyness);\n}\n\nvoid main() {\n    // normalize the world normals because they were interpolated linearly\n    vec3 normal = normalize(v_WorldNormal);\n    // calculation the direction the camera is pointing in\n    vec3 camDir = normalize(v_Point - u_CPoint);\n    vec3 texCol = vec3(1,1,1);\n    vec3 envCol = vec3(0,0,0);\n\n    if (u_UseEnvironmentMap) {\n        vec3 reflection = getReflection(camDir, normal);\n        envCol = textureCube(u_EnvironmentMap, reflection).rgb;\n    }\n\n    // use texture\n    if (u_UseDiffuseTexture) {\n        texCol = texture2D(u_DiffuseTexture, v_UV).rgb;\n    }\n\n    vec3 diffuseCol = v_Color * u_DiffuseColor * texCol;\n    \n    // ambient light\n    vec3 color = u_ALColor * diffuseCol + envCol;\n\n    // directional light diffuse\n    color += calcDiffuse(\n        u_DLColor,\n        diffuseCol,\n        normal,\n        normalize(u_DLDirection));\n    \n    // directional light specular\n    color += calcSpecular(\n        u_DLColor * u_SpecularColor,\n        normal,\n        normalize(u_DLDirection),\n        camDir,\n        u_Shinyness);\n    \n    // point lights\n    for (int i = 0; i < point_light_count; i++) {\n        // point light direction\n        vec3 PLDirection = v_Point - u_PLPoint[i];\n        float falloff = invSqr(length(PLDirection));\n        PLDirection = normalize(PLDirection);\n\n        // limit angle of spot light\n        if (dot(PLDirection, normalize(u_PLDirection[i])) > u_PLFactor[i]) {\n            // point light diffuse\n            color += calcDiffuse(\n                u_PLColor[i],\n                diffuseCol,\n                normal,\n                PLDirection) * falloff;\n            \n            // directional light specular\n            color += calcSpecular(\n                u_PLColor[i] * u_SpecularColor,\n                normal,\n                PLDirection,\n                camDir,\n                u_Shinyness) * falloff;\n        }\n    }\n\n    // if we are using refraction, ignore the rest of the shading\n    if (u_DoRefraction) {\n        color = textureCube(u_EnvironmentMap, refract(camDir, normal, 1.5)).rgb;\n    }\n\n    // Assign color for the fragment\n    gl_FragColor = vec4(color, 1);\n}");

/***/ }),

/***/ "./src/project-2/shaders/phong-vert.glsl":
/*!***********************************************!*\
  !*** ./src/project-2/shaders/phong-vert.glsl ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// vertex attributes\r\nattribute vec3 a_Point;\r\nattribute vec3 a_Color;\r\nattribute vec2 a_UV;\r\nattribute vec3 a_Normal;\r\nvarying vec3 v_Point;\r\nvarying vec3 v_Color;\r\nvarying vec2 v_UV;\r\nvarying vec3 v_WorldNormal;\r\n\r\n// model info\r\nuniform mat4 u_MVPMat;\r\nuniform mat3 u_NormalMat;\r\nuniform mat4 u_ModelMat;\r\n\r\nvoid main() {\r\n    // system attributes\r\n    gl_Position = u_MVPMat * vec4(a_Point.xyz, 1);\r\n\r\n    // varying attributes\r\n    v_Color = a_Color;\r\n    v_Point = (u_ModelMat * vec4(a_Point, 1)).xyz;\r\n    v_UV = a_UV;\r\n    v_WorldNormal = u_NormalMat * a_Normal;\r\n}");

/***/ }),

/***/ "./src/project-2/shaders/sky-frag.glsl":
/*!*********************************************!*\
  !*** ./src/project-2/shaders/sky-frag.glsl ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision mediump float;\r\n\r\n// fragment attributes\r\nvarying vec3 v_camDir;\r\n\r\nuniform samplerCube u_CubeMap;\r\n\r\nvoid main() {\r\n    // use the camera direction for the fragment to pick the cubemap sample\r\n    vec3 color = textureCube(u_CubeMap, normalize(v_camDir)).rgb;\r\n    gl_FragColor = vec4(color, 1);\r\n}");

/***/ }),

/***/ "./src/project-2/shaders/sky-vert.glsl":
/*!*********************************************!*\
  !*** ./src/project-2/shaders/sky-vert.glsl ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// vertex attributes\r\nattribute vec3 a_Point;\r\n\r\nuniform mat3 u_RotationMat;\r\nuniform mat4 u_InvProjection;\r\n\r\nvarying vec3 v_camDir;\r\n\r\nvoid main() {\r\n    // Make the object flat on the screen\r\n    gl_Position = vec4(a_Point.xy, 0, 1.0);\r\n\r\n    // calculate the camera direction using the\r\n    // screen coordinate and the inverse of the projection matrix\r\n    vec4 camDir = u_InvProjection * gl_Position;\r\n    v_camDir = normalize(u_RotationMat * camDir.xyz);\r\n}");

/***/ }),

/***/ "./src/project-2/shaders/unlit-frag.glsl":
/*!***********************************************!*\
  !*** ./src/project-2/shaders/unlit-frag.glsl ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision mediump float;\n\n// fragment attributes\nvarying vec3 v_Point;\nvarying vec3 v_Color;\nvarying vec2 v_UV;\n\nuniform vec3 u_DiffuseColor;\nuniform sampler2D u_DiffuseTexture;\nuniform bool u_UseDiffuseTexture;\n\nvoid main() {\n    vec3 color = v_Color * u_DiffuseColor;\n    vec3 texCol = vec3(1,1,1);\n    \n    // use texture\n    if (u_UseDiffuseTexture)\n        texCol = texture2D(u_DiffuseTexture, v_UV).rgb;\n\n    gl_FragColor = vec4(color * texCol, 1);\n}");

/***/ }),

/***/ "./src/project-2/shaders/unlit-vert.glsl":
/*!***********************************************!*\
  !*** ./src/project-2/shaders/unlit-vert.glsl ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// vertex attributes\r\nattribute vec3 a_Point;\r\nattribute vec3 a_Color;\r\nattribute vec2 a_UV;\r\nvarying vec3 v_Point;\r\nvarying vec3 v_Color;\r\nvarying vec2 v_UV;\r\n\r\n// model info\r\nuniform mat4 u_MVPMat;\r\n\r\nvoid main() {\r\n    // system attributes\r\n    gl_Position = u_MVPMat * vec4(a_Point.xyz, 1);\r\n    v_Color = a_Color;\r\n    v_UV = a_UV;\r\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./src/project-2/index.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shaders_phong_vert_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaders/phong-vert.glsl */ "./src/project-2/shaders/phong-vert.glsl");
/* harmony import */ var _shaders_phong_frag_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/phong-frag.glsl */ "./src/project-2/shaders/phong-frag.glsl");
/* harmony import */ var _shaders_sky_vert_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shaders/sky-vert.glsl */ "./src/project-2/shaders/sky-vert.glsl");
/* harmony import */ var _shaders_sky_frag_glsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shaders/sky-frag.glsl */ "./src/project-2/shaders/sky-frag.glsl");
/* harmony import */ var _shaders_unlit_vert_glsl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shaders/unlit-vert.glsl */ "./src/project-2/shaders/unlit-vert.glsl");
/* harmony import */ var _shaders_unlit_frag_glsl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shaders/unlit-frag.glsl */ "./src/project-2/shaders/unlit-frag.glsl");
/* harmony import */ var _lib_Time__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/Time */ "./src/project-2/lib/Time.ts");
/* harmony import */ var _lib_OBJParser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/OBJParser */ "./src/project-2/lib/OBJParser.ts");
/* harmony import */ var _lib_webgl_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/webgl-utils */ "./src/lib/webgl-utils.ts");
/* harmony import */ var _lib_Shader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/Shader */ "./src/project-2/lib/Shader.ts");
/* harmony import */ var _lib_CameraPerspective__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/CameraPerspective */ "./src/project-2/lib/CameraPerspective.ts");
/* harmony import */ var _lib_MeshRenderer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lib/MeshRenderer */ "./src/project-2/lib/MeshRenderer.ts");
/* harmony import */ var _lib_Light__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/Light */ "./src/project-2/lib/Light.ts");
/* harmony import */ var _lib_Math_Utill__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lib/Math/Utill */ "./src/project-2/lib/Math/Utill.ts");
/* harmony import */ var _lib_Transform__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./lib/Transform */ "./src/project-2/lib/Transform.ts");
/* harmony import */ var _lib_Skybox__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./lib/Skybox */ "./src/project-2/lib/Skybox.ts");
/* harmony import */ var _lib_SkyboxRenderer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./lib/SkyboxRenderer */ "./src/project-2/lib/SkyboxRenderer.ts");
/* harmony import */ var _lib_ShadowRenderer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./lib/ShadowRenderer */ "./src/project-2/lib/ShadowRenderer.ts");
/* harmony import */ var _lib_Material__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./lib/Material */ "./src/project-2/lib/Material.ts");



















const modelURLs = {
    stopsign: "https://web.cs.wpi.edu/~jmcuneo/cs4731/project3/stopsign.obj",
    lamp: "https://web.cs.wpi.edu/~jmcuneo/cs4731/project3/lamp.obj",
    car: "https://web.cs.wpi.edu/~jmcuneo/cs4731/project3/car.obj",
    street: "https://web.cs.wpi.edu/~jmcuneo/cs4731/project3/street.obj",
    bunny: "https://web.cs.wpi.edu/~jmcuneo/cs4731/project3/bunny.obj"
};
// add listener to call main function
window.addEventListener("DOMContentLoaded", main);
// application state variables
var camera;
var lightsEnabled = true;
var lights = [];
var cameraT = 0;
var animateCamera = false;
var carT = 0;
var animateCar = false;
var car = undefined;
var bunny = undefined;
var cameraAttached = false;
var skybox;
var lampLight;
var carShadow;
var signShadow;
var sign = undefined;
function main() {
    // initialize webgl
    let canvas = document.getElementById('webgl');
    __webpack_require__.g.gl = _lib_webgl_utils__WEBPACK_IMPORTED_MODULE_8__.WebGLUtils.setupWebGL(canvas);
    if (gl == null) {
        throw new Error("Failed to initialize WebGL");
    }
    // create the phong shader and start loading the models with it
    let shader = new _lib_Shader__WEBPACK_IMPORTED_MODULE_9__.Shader(_shaders_phong_vert_glsl__WEBPACK_IMPORTED_MODULE_0__["default"], _shaders_phong_frag_glsl__WEBPACK_IMPORTED_MODULE_1__["default"]);
    loadModels(shader);
    // create the camera
    camera = new _lib_CameraPerspective__WEBPACK_IMPORTED_MODULE_10__.CameraPerspective({
        aspectRatio: canvas.width / canvas.height
    });
    camera.transform.position = [0, 2, 5];
    camera.transform.rotation = [-15, 0, 0];
    camera.transform.parent = new _lib_Transform__WEBPACK_IMPORTED_MODULE_14__.Transform();
    // create the lights
    new _lib_Light__WEBPACK_IMPORTED_MODULE_12__.AmbientLight([1, 0.8, 0.8], 0.15);
    lights.push(new _lib_Light__WEBPACK_IMPORTED_MODULE_12__.DirectionalLight([30, 0, 25], [0.2, 0.6, 1], 0.5));
    let spotLight = new _lib_Light__WEBPACK_IMPORTED_MODULE_12__.SpotLight([-6, 4, 4]);
    spotLight.intensity = 25;
    spotLight.transform.rotation = [60, -30, 0];
    spotLight.angle = 45;
    spotLight.color = [0.8, 0.5, 1];
    lights.push(spotLight);
    // set webgl settings
    gl.enable(gl.DEPTH_TEST);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    // add keyboard input handler
    addEventListener("keydown", keyListener);
    // render the application
    render();
}
function keyListener(ev) {
    switch (ev.key.toLowerCase()) {
        case "l":
            toggleLights();
            break;
        case "c":
            toggleCameraAnimation();
            break;
        case "m":
            toggleCarAnimation();
            break;
        case "d":
            toggleCameraAttachment();
            break;
        case "e":
            toggleSkybox();
            break;
        case "r":
            toggleCarReflections();
            break;
        case "f":
            toggleBunnyRefraction();
            break;
        case "s":
            toggleShadows();
            break;
    }
}
function toggleLights() {
    lightsEnabled = !lightsEnabled;
    lights.forEach(light => light.enabled = lightsEnabled);
}
function toggleCameraAnimation() {
    animateCamera = !animateCamera;
}
function toggleCarAnimation() {
    animateCar = !animateCar;
}
function toggleCameraAttachment() {
    cameraAttached = !cameraAttached;
    if (cameraAttached) {
        camera.transform.parent.parent = car.transform;
        camera.transform.position[2] = 2;
    }
    else {
        camera.transform.parent.parent = null;
        camera.transform.position[2] = 5;
    }
}
function toggleSkybox() {
    if (skybox) {
        skybox.enabled = !skybox.enabled;
    }
}
function toggleCarReflections() {
    if (car && skybox) {
        if (car.Material.environmentMap == undefined) {
            car.Material.environmentMap = skybox.skybox;
        }
        car.Material.useEnvironmentReflections = !car.Material.useEnvironmentReflections;
    }
}
function toggleBunnyRefraction() {
    if (bunny && skybox) {
        if (bunny.Material.environmentMap == undefined) {
            bunny.Material.environmentMap = skybox.skybox;
        }
        bunny.Material.doRefraction = !bunny.Material.doRefraction;
    }
}
function toggleShadows() {
    if (carShadow && signShadow) {
        carShadow.enabled = !carShadow.enabled;
        signShadow.enabled = carShadow.enabled;
    }
}
function loadModels(shader) {
    // create a material to be used for the shadows
    let shadowMaterial = new _lib_Material__WEBPACK_IMPORTED_MODULE_18__.Material({
        diffuseColor: [0, 0, 0],
        specularColor: [0, 0, 0],
        specularExponent: 1
    }, new _lib_Shader__WEBPACK_IMPORTED_MODULE_9__.Shader(_shaders_unlit_vert_glsl__WEBPACK_IMPORTED_MODULE_4__["default"], _shaders_unlit_frag_glsl__WEBPACK_IMPORTED_MODULE_5__["default"]));
    // load the stop sign
    new _lib_OBJParser__WEBPACK_IMPORTED_MODULE_7__.OBJParser().parse(modelURLs.stopsign).then(parser => {
        let renderer = new _lib_MeshRenderer__WEBPACK_IMPORTED_MODULE_11__.MeshRenderer(parser.getMesh(), ...parser.getMaterials(shader));
        renderer.transform.position = [4, 0, 0];
        renderer.transform.rotation = [0, -120, 0];
        renderer.transform.scale = [1.5, 1.5, 1.5];
        sign = renderer;
        // attach shadow to the sign if the lamp exists
        if (lampLight) {
            signShadow = new _lib_ShadowRenderer__WEBPACK_IMPORTED_MODULE_17__.ShadowRenderer(sign, lampLight, shadowMaterial);
            signShadow.enabled = false;
        }
    });
    // load the lamp
    new _lib_OBJParser__WEBPACK_IMPORTED_MODULE_7__.OBJParser().parse(modelURLs.lamp).then(parser => {
        let renderer = new _lib_MeshRenderer__WEBPACK_IMPORTED_MODULE_11__.MeshRenderer(parser.getMesh(), ...parser.getMaterials(shader));
        renderer.transform.scale = [1.5, 1.5, 1.5];
        lampLight = new _lib_Light__WEBPACK_IMPORTED_MODULE_12__.PointLight([0, 4.5, 0], [1, 0.6, 0.2], 25);
        lampLight.enabled = lightsEnabled;
        lampLight.transform.parent = renderer.transform;
        lights.push(lampLight);
        // attach shadow to the car if the car exists
        if (car) {
            carShadow = new _lib_ShadowRenderer__WEBPACK_IMPORTED_MODULE_17__.ShadowRenderer(car, lampLight, shadowMaterial);
            carShadow.enabled = false;
        }
        // attach shadow to the sign if the sign exists
        if (sign) {
            signShadow = new _lib_ShadowRenderer__WEBPACK_IMPORTED_MODULE_17__.ShadowRenderer(sign, lampLight, shadowMaterial);
            signShadow.enabled = false;
        }
    });
    // load the car
    new _lib_OBJParser__WEBPACK_IMPORTED_MODULE_7__.OBJParser().parse(modelURLs.car).then(parser => {
        let renderer = new _lib_MeshRenderer__WEBPACK_IMPORTED_MODULE_11__.MeshRenderer(parser.getMesh(), ...parser.getMaterials(shader));
        renderer.transform.position = [0, 0, 3];
        renderer.transform.rotation = [0, 90, 0];
        renderer.transform.scale = [0.75, 0.75, 0.75];
        renderer.transform.parent = new _lib_Transform__WEBPACK_IMPORTED_MODULE_14__.Transform();
        car = renderer;
        // parent the bunny to the car if the bunny has loaded
        if (bunny) {
            bunny.transform.parent = car.transform;
        }
        // attach shadow to the car if the lamp exists
        if (lampLight) {
            carShadow = new _lib_ShadowRenderer__WEBPACK_IMPORTED_MODULE_17__.ShadowRenderer(car, lampLight, shadowMaterial);
            carShadow.enabled = false;
        }
    });
    // load the street
    new _lib_OBJParser__WEBPACK_IMPORTED_MODULE_7__.OBJParser().parse(modelURLs.street).then(parser => {
        let renderer = new _lib_MeshRenderer__WEBPACK_IMPORTED_MODULE_11__.MeshRenderer(parser.getMesh(), ...parser.getMaterials(shader));
    });
    // load the bunny
    new _lib_OBJParser__WEBPACK_IMPORTED_MODULE_7__.OBJParser().parse(modelURLs.bunny).then(parser => {
        let renderer = new _lib_MeshRenderer__WEBPACK_IMPORTED_MODULE_11__.MeshRenderer(parser.getMesh(), ...parser.getMaterials(shader));
        renderer.transform.position = [-0.1, 0.75, 1.5];
        renderer.transform.scale = [3, 3, 3];
        bunny = renderer;
        // parent the bunny to the car if the car has loaded
        if (car) {
            bunny.transform.parent = car.transform;
        }
    });
    // load the skybox
    let sb = new _lib_Skybox__WEBPACK_IMPORTED_MODULE_15__.Skybox();
    sb.loadSkybox("https://web.cs.wpi.edu/~jmcuneo/cs4731/project2/skybox_posx.png", "https://web.cs.wpi.edu/~jmcuneo/cs4731/project2/skybox_posy.png", "https://web.cs.wpi.edu/~jmcuneo/cs4731/project2/skybox_posz.png", "https://web.cs.wpi.edu/~jmcuneo/cs4731/project2/skybox_negx.png", "https://web.cs.wpi.edu/~jmcuneo/cs4731/project2/skybox_negy.png", "https://web.cs.wpi.edu/~jmcuneo/cs4731/project2/skybox_negz.png").then(() => {
        skybox = new _lib_SkyboxRenderer__WEBPACK_IMPORTED_MODULE_16__.SkyboxRenderer(sb, new _lib_Shader__WEBPACK_IMPORTED_MODULE_9__.Shader(_shaders_sky_vert_glsl__WEBPACK_IMPORTED_MODULE_2__["default"], _shaders_sky_frag_glsl__WEBPACK_IMPORTED_MODULE_3__["default"]));
        skybox.enabled = false;
    });
}
function render() {
    // track time
    _lib_Time__WEBPACK_IMPORTED_MODULE_6__.Time.update();
    update();
    camera.render();
    // request next frame
    window.requestAnimFrame(render);
}
// update the state of the application each frame
function update() {
    // spin camera using its parent transform
    if (camera.transform.parent) {
        if (animateCamera)
            cameraT += _lib_Time__WEBPACK_IMPORTED_MODULE_6__.Time.DeltaTime;
        let theta = cameraT * 15;
        camera.transform.parent.position[1] = Math.sin((0,_lib_Math_Utill__WEBPACK_IMPORTED_MODULE_13__.DegToRad)(theta * 10)) * 0.1;
        camera.transform.parent.rotation[1] = theta % 360;
    }
    // move car using its parent transform
    if (car && car.transform.parent) {
        if (animateCar)
            carT += _lib_Time__WEBPACK_IMPORTED_MODULE_6__.Time.DeltaTime;
        let theta = carT * 20;
        car.transform.parent.rotation[1] = theta % 360;
    }
}

})();

/******/ })()
;
//# sourceMappingURL=main.js.map