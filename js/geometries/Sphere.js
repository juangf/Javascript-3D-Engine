import Point from '../engine/Point.js';
import Polygon from '../engine/Polygon.js';
import Geometry from '../engine/Geometry.js';

class Sphere extends Geometry {
    constructor(radius, space, allTriangles = true) {
        super();
        let index = 0;
        let startInd = 0;

        this.addPoint(new Point(0, radius, 0));

        for (let j = 0; j < 360 / space - 1; j++) {
            this.addPolygon(new Polygon([0, index + 1, index + 2]));
            index++;
        }

        this.addPolygon(new Polygon([0, index + 1, 1]));

        index = 1;

        for (let i = 0, b = space; i < 180 / space - 1; i++, b += space) {
            //Assign our a loop to go through 360 degrees in intervals of our variable space
            for (let j = 0, a = 0; j < 360 / space; j++, a += space) {
                if (j === 0) {
                    startInd = index;
                }
                this.addPoint(new Point(
                    radius * Math.sin(a / 180 * Math.PI) * Math.sin(b / 180 * Math.PI),
                    radius * Math.cos(b / 180 * Math.PI),
                    -radius * Math.cos(a / 180 * Math.PI) * Math.sin(b / 180 * Math.PI)
                ));

                if (i > 0) {
                    if (j < 360 / space - 1) {
                        if (allTriangles) {
                            this.addPolygon(new Polygon([
                                index,
                                index + 360 / space,
                                index + 1
                            ]));
                            this.addPolygon(new Polygon([
                                index + 360 / space,
                                index + 360 / space + 1,
                                index + 1
                            ]));
                        } else {
                            this.addPolygon(new Polygon([
                                index,
                                index + 360 / space,
                                index + 360 / space + 1,
                                index + 1
                            ]));
                        }
                    } else {
                        if (allTriangles) {
                            this.addPolygon(new Polygon([
                                index,
                                index + 360 / space,
                                startInd
                            ]));
                            this.addPolygon(new Polygon([
                                index + 360 / space,
                                startInd + 360 / space,
                                startInd
                            ]));
                        } else {
                            this.addPolygon(new Polygon([
                                index,
                                index + 360 / space,
                                startInd + 360 / space,
                                startInd
                            ]));
                        }
                    }
                    index++;
                }
            }
        }

        this.addPoint(new Point(0, -radius, 0));

        index = this.getPoints().length - 1;
        startInd = index;

        for (let j = 0; j < 360 / space - 1; j++) {
            this.addPolygon(new Polygon([startInd, index - 1, index - 2]));
            index--;
        }

        this.addPolygon(new Polygon([startInd, index - 1, startInd - 1]));

        this.calcNormals();
    }
}

export default Sphere;