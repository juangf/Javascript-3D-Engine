import Scene from "../engine/Scene.js";
import Object3D from "../engine/Object3D.js";
import Point from "../engine/Point.js";
import PyramidSquare from "../figures/PyramidSquare.js";
import RegularPrism from "../figures/RegularPrism.js";

/**
 * Scene with a castle.
 */
class CastleScene extends Scene {

    /**
     * Constructor
     *
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {Camera} camera
     * @param {object} options
     */
    constructor(x, y, z, options = {}) {
        super({
            id: 'castle_scene',
            name: 'Castle'
        });

        let size = 1000;
        let high = size * 0.7;

        if (options !== null) {
            if ('size' in options && options.size > 0) {
                size = options.size;
            }

            if ('high' in options && options.high > 0) {
                high = options.high;
            }
        }

        let towerDimension = {
            h: high,
            w: size * 0.6,
            d: size * 0.6
        };

        let towerPositions = {
            tower_1: {
                id: 1,
                position: {
                    x: - (x + size / 2),
                    y: y,
                    z: - (z + size / 2)
                },
                dimension: towerDimension
            },
            tower_2: {
                id: 2,
                position: {
                    x: x + size / 2,
                    y: y,
                    z: - (z + size / 2)
                },
                dimension: towerDimension
            },
            tower_3: {
                id: 3,
                position: {
                    x: - (x + size / 2),
                    y: y,
                    z: z + size / 2
                },
                dimension: towerDimension
            },
            tower_4: {
                id: 4,
                position: {
                    x: x + size / 2,
                    y: y,
                    z: z + size / 2
                },
                dimension: towerDimension
            }
        };
        let wallDimension = {
            h: towerDimension.h - towerDimension.h * 0.4,
            w: size - towerDimension.w,
            d: towerDimension.d - towerDimension.d * 0.9
        };

        for (let key in towerPositions) {
            this.makeTower(towerPositions[key].id, towerPositions[key].position, towerPositions[key].dimension);
        }

        this
            .addObject(new Object3D({
                id: 'wall_tower_1_2',
                position: new Point(
                    + towerPositions.tower_1.position.x / 2 + towerPositions.tower_2.position.x / 2,
                    wallDimension.h / 2 - towerDimension.h / 2 + y,
                    (towerPositions.tower_1.position.z) + (wallDimension.d / 2) - (towerDimension.w / 2)
                ),
                geometry: new RegularPrism(
                    wallDimension.h,
                    wallDimension.w + x * 2,
                    wallDimension.d
                ),
                options: {
                    drawPoints: false,
                    drawNormals: false
                }
            }))
            .addObject(new Object3D({
                id: 'wall_tower_1_3',
                position: new Point(
                    (towerPositions.tower_1.position.x) + (wallDimension.d / 2) - (towerDimension.w / 2),
                    wallDimension.h / 2 - towerDimension.h / 2 + y,
                    0,
                ),
                geometry: new RegularPrism(
                    wallDimension.h,
                    wallDimension.d,
                    wallDimension.w + z * 2
                ),
                options: {
                    drawPoints: false,
                    drawNormals: false
                }
            }))
            .addObject(new Object3D({
                id: 'wall_tower_3_4',
                position: new Point(
                    + towerPositions.tower_3.position.x / 2 + towerPositions.tower_4.position.x / 2,
                    wallDimension.h / 2 - towerDimension.h / 2 + y,
                    (towerPositions.tower_3.position.z) - (wallDimension.d / 2) + (towerDimension.w / 2)
                ),
                geometry: new RegularPrism(
                    wallDimension.h,
                    wallDimension.w + x * 2,
                    wallDimension.d
                ),
                options: {
                    drawPoints: false,
                    drawNormals: false
                }
            }))
            .addObject(new Object3D({
                id: 'wall_tower_2_4',
                position: new Point(
                    (towerPositions.tower_2.position.x) - (wallDimension.d / 2) + (towerDimension.w / 2),
                    wallDimension.h / 2 - towerDimension.h / 2 + y,
                    0
                ),
                geometry: new RegularPrism(
                    wallDimension.h,
                    wallDimension.d,
                    wallDimension.w + z * 2
                ),
                options: {
                    drawPoints: false,
                    drawNormals: false
                }
            }));
    }

    makeTower(id, position, dimension) {
        this
            .addObject(new Object3D({
                id: 'tower_' + id,
                position: new Point(position.x, position.y, position.z),
                geometry: new RegularPrism(dimension.h, dimension.w, dimension.d),
                options: {
                    drawPoints: false,
                    drawNormals: false
                }
            }))
            .addObject(new Object3D({
                id: 'tower_roof_' + id,
                position: new Point(position.x, position.y + dimension.h, position.z),
                geometry: new PyramidSquare(dimension.h, dimension.w, dimension.d),
                options: {
                    drawPoints: false,
                    drawNormals: false
                }
            }));

        return this;
    }

}

export default CastleScene;