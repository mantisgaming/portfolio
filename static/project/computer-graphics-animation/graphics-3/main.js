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

/***/ "./src/project-3/lib/Camera.ts":
/*!*************************************!*\
  !*** ./src/project-3/lib/Camera.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Camera: () => (/* binding */ Camera)
/* harmony export */ });
/* harmony import */ var _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math/Matrix */ "./src/project-3/lib/Math/Matrix.ts");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transform */ "./src/project-3/lib/Transform.ts");


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
}


/***/ }),

/***/ "./src/project-3/lib/CameraPerspective.ts":
/*!************************************************!*\
  !*** ./src/project-3/lib/CameraPerspective.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CameraPerspective: () => (/* binding */ CameraPerspective)
/* harmony export */ });
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Camera */ "./src/project-3/lib/Camera.ts");
/* harmony import */ var _Math_Matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Math/Matrix */ "./src/project-3/lib/Math/Matrix.ts");


// Default parameters for a perspective camera
const defaultCameraPerspectiveOptions = {
    fov: 90,
    aspectRatio: 16 / 9,
    near: 0.03,
    far: 500
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

/***/ "./src/project-3/lib/Math/Matrix.ts":
/*!******************************************!*\
  !*** ./src/project-3/lib/Math/Matrix.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MatMath: () => (/* binding */ MatMath)
/* harmony export */ });
/* harmony import */ var _Utill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utill */ "./src/project-3/lib/Math/Utill.ts");
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
        result[2][2] = -2 / (far - near);
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

/***/ "./src/project-3/lib/Math/Utill.ts":
/*!*****************************************!*\
  !*** ./src/project-3/lib/Math/Utill.ts ***!
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

/***/ "./src/project-3/lib/Math/Vector.ts":
/*!******************************************!*\
  !*** ./src/project-3/lib/Math/Vector.ts ***!
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

/***/ "./src/project-3/lib/Shader.ts":
/*!*************************************!*\
  !*** ./src/project-3/lib/Shader.ts ***!
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
        this.bindAttribute("a_Point", 2, 0, 0);
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

/***/ "./src/project-3/lib/Transform.ts":
/*!****************************************!*\
  !*** ./src/project-3/lib/Transform.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transform: () => (/* binding */ Transform)
/* harmony export */ });
/* harmony import */ var _Math_Matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math/Matrix */ "./src/project-3/lib/Math/Matrix.ts");
/* harmony import */ var _Math_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Math/Vector */ "./src/project-3/lib/Math/Vector.ts");


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

/***/ "./src/project-3/shaders/raytracer-frag.glsl":
/*!***************************************************!*\
  !*** ./src/project-3/shaders/raytracer-frag.glsl ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision mediump float;\n\nstruct Light {\n    vec3 point;\n    vec3 color;\n    float intensity;\n};\n\nstruct Ray {\n    vec3 origin;\n    vec3 direction;\n};\n\nstruct Sphere {\n    bool enabled;\n    vec3 center;\n    float radius;\n    vec3 color;\n    float reflectivity;\n};\n\nstruct Plane {\n    bool enabled;\n    vec3 normal;\n    float offset;\n    vec3 color;\n    float reflectivity;\n};\n\nstruct TracerState {\n    Ray ray;\n    vec3 color;\n    float intensity;\n};\n\nvarying vec3 v_rayEnd;\nvarying vec3 v_rayStart;\n\nuniform int u_SceneIndex;\n\nconst int sphereCount = 4;\nconst int planeCount = 6;\n\nSphere spheres[sphereCount];\nPlane planes[planeCount];\nLight light;\nfloat ambientLight;\n\nvoid loadScene() {\n    // reset all spheres\n    spheres[0] = Sphere(false, vec3(0, 0, 0), 0.0, vec3(1, 1, 1), 0.0);\n    spheres[1] = Sphere(false, vec3(0, 0, 0), 0.0, vec3(1, 1, 1), 0.0);\n    spheres[2] = Sphere(false, vec3(0, 0, 0), 0.0, vec3(1, 1, 1), 0.0);\n    spheres[3] = Sphere(false, vec3(0, 0, 0), 0.0, vec3(1, 1, 1), 0.0);\n\n    // reset all planes\n    planes[0] = Plane(false, vec3(0, 0, 0), 0.0, vec3(1, 1, 1), 0.0);\n    planes[1] = Plane(false, vec3(0, 0, 0), 0.0, vec3(1, 1, 1), 0.0);\n    planes[2] = Plane(false, vec3(0, 0, 0), 0.0, vec3(1, 1, 1), 0.0);\n    planes[3] = Plane(false, vec3(0, 0, 0), 0.0, vec3(1, 1, 1), 0.0);\n    planes[4] = Plane(false, vec3(0, 0, 0), 0.0, vec3(1, 1, 1), 0.0);\n    planes[5] = Plane(false, vec3(0, 0, 0), 0.0, vec3(1, 1, 1), 0.0);\n\n    // reset light\n    light = Light(vec3(0, 0, 0), vec3(1, 1, 1), 1.0);\n    ambientLight = 0.2;\n\n    if (u_SceneIndex == 0) {\n        // image 1\n        planes[0].enabled = true;\n        planes[0].color = vec3(0.05, 0.05, 1);\n        planes[0].normal = vec3(0, 1, 0);\n        planes[0].offset = -3.0;\n        planes[0].reflectivity = 0.4;\n\n        spheres[0].enabled = true;\n        spheres[0].color = vec3(0.05, 1, 0.05);\n        spheres[0].radius = 1.0;\n        spheres[0].center = vec3(0, -2, -15);\n        spheres[0].reflectivity = 0.0;\n\n        spheres[1].enabled = true;\n        spheres[1].color = vec3(1, 0.05, 0.05);\n        spheres[1].radius = 1.0;\n        spheres[1].center = vec3(-1.8, -2, -14);\n        spheres[1].reflectivity = 0.65;\n\n        light.point = vec3(-4, 4, -10);\n        light.intensity = 25.0;\n    } else if (u_SceneIndex == 1) {\n        // image 2\n        spheres[0].enabled = true;\n        spheres[0].color = vec3(1, 1, 0.05);\n        spheres[0].radius = 2.0;\n        spheres[0].center = vec3(-2.5, 2.5, -15);\n        spheres[0].reflectivity = 0.7;\n        \n        spheres[1].enabled = true;\n        spheres[1].color = vec3(0.05, 1, 0.05);\n        spheres[1].radius = 2.0;\n        spheres[1].center = vec3(2.5, 2.5, -15);\n        spheres[1].reflectivity = 0.7;\n        \n        spheres[2].enabled = true;\n        spheres[2].color = vec3(1, 0.05, 0.05);\n        spheres[2].radius = 2.0;\n        spheres[2].center = vec3(-2.5, -2.5, -15);\n        spheres[2].reflectivity = 0.7;\n        \n        spheres[3].enabled = true;\n        spheres[3].color = vec3(0.05, 0.05, 1);\n        spheres[3].radius = 2.0;\n        spheres[3].center = vec3(2.5, -2.5, -15);\n        spheres[3].reflectivity = 0.7;\n        \n        light.point = vec3(0, 0, -10);\n        light.intensity = 15.0;\n    } else if (u_SceneIndex == 2) {\n        // image 3\n        planes[0].enabled = true;\n        planes[0].color = vec3(0.05, 0.05, 1);\n        planes[0].normal = vec3(0, 1, 0);\n        planes[0].offset = -3.0;\n        planes[0].reflectivity = 0.0;\n        \n        planes[1].enabled = true;\n        planes[1].color = vec3(1, 0.05, 1);\n        planes[1].normal = vec3(0, 1, 0);\n        planes[1].offset = 3.0;\n        planes[1].reflectivity = 0.0;\n        \n        planes[2].enabled = true;\n        planes[2].color = vec3(0.05, 1, 1);\n        planes[2].normal = vec3(1, 0, 0);\n        planes[2].offset = -3.0;\n        planes[2].reflectivity = 0.0;\n        \n        planes[3].enabled = true;\n        planes[3].color = vec3(0.05, 1, 0.05);\n        planes[3].normal = vec3(1, 0, 0);\n        planes[3].offset = 3.0;\n        planes[3].reflectivity = 0.0;\n        \n        planes[4].enabled = true;\n        planes[4].color = vec3(1, 1, 0.05);\n        planes[4].normal = vec3(0, 0, 1);\n        planes[4].offset = -15.0;\n        planes[4].reflectivity = 0.0;\n        \n        planes[5].enabled = true;\n        planes[5].color = vec3(1, 1, 1);\n        planes[5].normal = vec3(0, 0, 1);\n        planes[5].offset = 1.0;\n        planes[5].reflectivity = 0.0;\n        \n        spheres[0].enabled = true;\n        spheres[0].color = vec3(0.05, 1, 0.05);\n        spheres[0].radius = 1.0;\n        spheres[0].center = vec3(1.5, -2, -12);\n        spheres[0].reflectivity = 0.0;\n        \n        spheres[1].enabled = true;\n        spheres[1].color = vec3(0, 0, 0);\n        spheres[1].radius = 1.0;\n        spheres[1].center = vec3(-1.5, -2, -12);\n        spheres[1].reflectivity = 1.0;\n\n        light.point = vec3(0, 1, -11);\n        light.intensity = 5.0;\n    }\n}\n\n// get the distance along a ray to a plane\nfloat planeIntersection(in Plane plane, in Ray ray) {\n    float t = 0.0;\n    float A = dot(plane.normal, ray.direction);\n    if (abs(A) > 0.001) {\n        t = dot((plane.normal * plane.offset - ray.origin), plane.normal) / A;\n    }\n    return t;\n}\n\n// get the distance along a ray to a sphere\nfloat sphereIntersection(in Sphere sphere, in Ray ray) {\n\n    vec3 offset = ray.origin - sphere.center;\n\n    float B = 2.0 * dot(ray.direction, offset);\n    float C = dot(offset, offset) - sphere.radius * sphere.radius;\n    float delta = B * B - 4.0 * C;\n    \n    float t = 0.0;\n    if (delta > 0.0) {\n        float sqRoot = sqrt(delta);\n        float t1 = (-B + sqRoot) / 2.0;\n        float t2 = (-B - sqRoot) / 2.0;\n        t = min(t1, t2);\n    } else if (delta == 0.0) {\n        t = -B / 2.0;\n    }\n\n    return t;\n}\n\n// Helper function for inverse square falloff\nfloat invSqr(in float distance) {\n    return 1.0 / (distance * distance);\n}\n\n// get the light color for a point from a given light\nvec3 getLight(in vec3 point, in Light light) {\n    Ray lightRay = Ray(point, normalize(light.point - point));\n    float lightDist = length(point - light.point);\n\n    float intensity = 1.0;\n\n    // check sphere shadows\n    for (int i = 0; i < sphereCount; i++) {\n        float hitDist = sphereIntersection(spheres[i], lightRay);\n        if (hitDist > 0.001 && hitDist < lightDist)\n            intensity = 0.0;\n    }\n\n    // check plane shadows\n    for (int i = 0; i < planeCount; i++) {\n        float hitDist = planeIntersection(planes[i], lightRay);\n        if (hitDist > 0.001 && hitDist < lightDist)\n            intensity = 0.0;\n    }\n\n    // multiply by light intensity and falloff\n    intensity *= light.intensity;\n    intensity *= invSqr(lightDist);\n\n    // return intensity multiplied by the light color\n    return light.color * intensity;\n}\n\nTracerState calculateLighting(\n        in Ray ray,\n        in vec3 surfaceColor,\n        in vec3 surfacePoint,\n        in vec3 surfaceNormal,\n        in float reflectivity,\n        in Light light) {\n    \n    vec3 color = surfaceColor * ambientLight;\n\n    // for each light\n    vec3 lightDir = normalize(light.point - surfacePoint);\n\n    // reflection\n    Ray reflection = Ray(surfacePoint, reflect(ray.direction, surfaceNormal));\n\n    // diffuse color\n    color += surfaceColor * max(dot(lightDir, surfaceNormal), 0.0) * getLight(surfacePoint, light);\n\n    // specular color\n    color += pow(max(dot(lightDir, reflection.direction), 0.0), 50.0) * getLight(surfacePoint, light) * reflectivity;\n\n    return TracerState(reflection, color, reflectivity);\n}\n\nTracerState trace(in TracerState state) {\n    vec3 color = vec3(0, 0, 0);\n\n    float nearest = 0.0;\n\n    TracerState newState = TracerState(Ray(vec3(0,0,0),vec3(0,0,0)), vec3(0,0,0), 0.0);\n\n    // for each sphere\n    for (int i = 0; i < sphereCount; i++) {\n        float t = sphereIntersection(spheres[i], state.ray);\n\n        // if the sphere is enabled and it is closer than any other object\n        if (t > 0.0 && (nearest > t || nearest == 0.0) && spheres[i].enabled) {\n            nearest = t;\n            vec3 surfacePoint = state.ray.origin + (t * state.ray.direction);\n\n            // perform ray calculation\n            newState = calculateLighting(\n                state.ray,\n                spheres[i].color,\n                surfacePoint,\n                normalize(surfacePoint - spheres[i].center),\n                spheres[i].reflectivity,\n                light\n            );\n        }\n    }\n\n    // for each plane\n    for (int i = 0; i < planeCount; i++) {\n        float t = planeIntersection(planes[i], state.ray);\n\n        // if the plane is enabled and it is closer than any other object\n        if (t > 0.001 && (nearest > t || nearest == 0.0) && planes[i].enabled) {\n            nearest = t;\n\n            // flip the normal if the ray would intersect the back of the plane\n            vec3 normal = planes[i].normal;\n            if (dot(normal, state.ray.direction) > 0.0)\n                normal = -normal;\n\n            // perform ray calculation\n            newState = calculateLighting(\n                state.ray,\n                planes[i].color,\n                state.ray.origin + (t * state.ray.direction),\n                normal,\n                planes[i].reflectivity,\n                light\n            );\n        }\n    }\n\n    // return an updated raytracer state\n    return TracerState(newState.ray, state.color + newState.color * state.intensity, newState.intensity * state.intensity);\n}\n\nvoid main() {\n    // load the scene geometry\n    loadScene();\n\n    // initialize the raytracer state for the camera ray\n    TracerState state = TracerState(\n        Ray(v_rayStart, normalize(v_rayEnd - v_rayStart)),\n        vec3(0, 0, 0),\n        1.0\n    );\n\n    // trace 20 reflections\n    for (int i = 0; i < 20; i++) {\n        state = trace(state);\n    }\n\n    // return the color\n    gl_FragColor = vec4(state.color, 1);\n}");

/***/ }),

/***/ "./src/project-3/shaders/raytracer-vert.glsl":
/*!***************************************************!*\
  !*** ./src/project-3/shaders/raytracer-vert.glsl ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("attribute vec2 a_Point;\r\n\r\nuniform mat4 u_RayMat;\r\n\r\nvarying vec3 v_rayEnd;\r\nvarying vec3 v_rayStart;\r\n\r\nvoid main() {\r\n    gl_Position = vec4(a_Point.xy, 0.0, 1.0);\r\n\r\n    // generate the ray for each vertex\r\n    vec4 rayStart = u_RayMat * vec4(a_Point.xy, -1.0, 1.0);\r\n    vec4 rayEnd = u_RayMat * vec4(a_Point.xy, 1.0, 1.0);\r\n    v_rayStart = rayStart.xyz/rayStart.w;\r\n    v_rayEnd = rayEnd.xyz/rayEnd.w;\r\n}");

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
  !*** ./src/project-3/index.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shaders_raytracer_vert_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaders/raytracer-vert.glsl */ "./src/project-3/shaders/raytracer-vert.glsl");
/* harmony import */ var _shaders_raytracer_frag_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/raytracer-frag.glsl */ "./src/project-3/shaders/raytracer-frag.glsl");
/* harmony import */ var _lib_webgl_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/webgl-utils */ "./src/lib/webgl-utils.ts");
/* harmony import */ var _lib_Shader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/Shader */ "./src/project-3/lib/Shader.ts");
/* harmony import */ var _lib_Math_Matrix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/Math/Matrix */ "./src/project-3/lib/Math/Matrix.ts");
/* harmony import */ var _lib_CameraPerspective__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/CameraPerspective */ "./src/project-3/lib/CameraPerspective.ts");






// add listener to call main function
window.addEventListener("DOMContentLoaded", main);
class RayTracerApp {
    constructor() {
        // app state
        this.awaitingDraw = false;
        // initialize webgl
        let canvas = document.getElementById('webgl');
        __webpack_require__.g.gl = _lib_webgl_utils__WEBPACK_IMPORTED_MODULE_2__.WebGLUtils.setupWebGL(canvas);
        if (gl == null) {
            throw new Error("Failed to initialize WebGL");
        }
        this.camera = new _lib_CameraPerspective__WEBPACK_IMPORTED_MODULE_5__.CameraPerspective({
            aspectRatio: canvas.width / canvas.height,
            fov: 40
        });
        // initialize opengl drawing
        this.canvasMesh = gl.createBuffer();
        this.createSquare(this.canvasMesh);
        this.shader = new _lib_Shader__WEBPACK_IMPORTED_MODULE_3__.Shader(_shaders_raytracer_vert_glsl__WEBPACK_IMPORTED_MODULE_0__["default"], _shaders_raytracer_frag_glsl__WEBPACK_IMPORTED_MODULE_1__["default"]);
        this.shader.bindMeshAttribs();
        // set blending mode for layered drawing
        gl.blendFunc(gl.ONE, gl.ONE);
        gl.enable(gl.BLEND);
        gl.clearColor(0, 0, 0, 1);
        this.requestFrame();
    }
    createSquare(buffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
            1, -1,
            1, 1,
            -1, 1
        ]), gl.STATIC_DRAW);
    }
    requestFrame() {
        if (!this.awaitingDraw) {
            this.awaitingDraw = true;
            window.requestAnimFrame(this.render.bind(this));
        }
    }
    render() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        // create a matrix to transform from clipping space to world space
        const rayMatrix = _lib_Math_Matrix__WEBPACK_IMPORTED_MODULE_4__.MatMath.MultiplyM(this.camera.InverseViewMatrix, _lib_Math_Matrix__WEBPACK_IMPORTED_MODULE_4__.MatMath.Inverse4(this.camera.ProjectionMatrix));
        this.shader.setUniformMat4f("u_RayMat", rayMatrix);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        this.awaitingDraw = false;
    }
    setSceneIndex(index) {
        this.shader.setUniform1i("u_SceneIndex", index);
        this.requestFrame();
    }
}
function main() {
    __webpack_require__.g.app = new RayTracerApp();
}

})();

/******/ })()
;
//# sourceMappingURL=main.js.map