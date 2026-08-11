/**
 * A spline loaded from a spline definition file.
 */
class Spline {
    nControlPoints;             // The number of control points defining the spline
    controlPointPositions = []; // The positions of the control points defining the spline
    controlPointRotations = []; // The rotations of the control points defining the spline
    moveTime;                   // The length of time an object takes to move along the spline start to finish

    constructor(splineLines) {
        // Load and parse the spline file
        this.parseSplineLines(splineLines);
    }

    /**
     * Parsing function for the spline lines.
     *
     * @param splineLines   The spline lines to parse
     */
    parseSplineLines(splineLines) {
        for (let lineIndex = 0; lineIndex < splineLines.length; lineIndex++) {
            let currentLine = splineLines[lineIndex];

            if (lineIndex == 0) {
                this.nControlPoints = parseInt(currentLine);
            }
            else if (lineIndex == 1) {
                this.moveTime = parseFloat(currentLine);
            }
            else {
                let controlPointPos = currentLine.split(`, `);
                controlPointPos = vec3(
                    parseFloat(controlPointPos[0]),
                    parseFloat(controlPointPos[1]),
                    parseFloat(controlPointPos[2])
                );
                let nextLine = splineLines[++lineIndex];
                let controlPointRot = nextLine.split(', ');
                controlPointRot = vec3(
                    parseFloat(controlPointRot[0]),
                    parseFloat(controlPointRot[1]),
                    parseFloat(controlPointRot[2])
                );
                this.controlPointPositions.push(controlPointPos);
                this.controlPointRotations.push(controlPointRot);
            }
        }
    }

    /**
     * Produces a string representation of this spline.
     * 
     * @returns {string} The string representation of this spline.
     */
    toString() {
        let str = "Num. Control Points: " + this.nControlPoints + "\nMove Time: " + this.moveTime + "\n";
        for (let i = 0; i < this.controlPointPositions.length; i++) {
            str += "Control Point " + i + ": Pos {" + this.controlPointPositions[i] + "}, Rot {" + this.controlPointRotations[i] + "}\n";
        }
        return str;
    }
}