import Scene from "../engine/Scene.js";
import Object3D from "../engine/Object3D.js";
import Point from "../engine/Point.js";
import PyramidSquare from "../figures/PyramidSquare.js";
import RegularPrism from "../figures/RegularPrism.js";

class CastleScene extends Scene {
    constructor(camera) {
        super({
            id: 'castle_scene',
            name: 'Castle',
            camera: camera,
        });

        let towerDimension = {h: 200, w: 80, d: 80};
        let towerPositions = {
            tower_1: {
                id: 1,
                position: {x: -100, y: 0, z: 0},
                dimension: towerDimension
            },
            tower_2: {
                id: 2,
                position: {x: 100, y: 0, z: 0},
                dimension: towerDimension
            },
            tower_3: {
                id: 3,
                position: {x: -100, y: 0, z: 200},
                dimension: towerDimension
            },
            tower_4: {
                id: 4,
                position: {x: 100, y: 0, z: 200},
                dimension: towerDimension
            }
        };
        let wallDimension = {h: 80, w: 120, d: 10};

        for (let key in towerPositions) {
            this.makeTower(towerPositions[key].id, towerPositions[key].position, towerPositions[key].dimension);
        }

        this
            .addObject(new Object3D({
                id: 'wall_tower_1_2',
                position: new Point(0, 60, -35),
                geometry: new RegularPrism(wallDimension.h, wallDimension.w, wallDimension.d),
                options: {
                    drawPoints: false,
                    drawNormals: false
                }
            }))
            .addObject(new Object3D({
                id: 'wall_tower_1_3',
                position: new Point(-135, 60, 100),
                geometry: new RegularPrism(wallDimension.h, wallDimension.d, wallDimension.w),
                options: {
                    drawPoints: false,
                    drawNormals: false
                }
            }))
            .addObject(new Object3D({
                id: 'wall_tower_3_4',
                position: new Point(0, 60, 235),
                geometry: new RegularPrism(wallDimension.h, wallDimension.w, wallDimension.d),
                options: {
                    drawPoints: false,
                    drawNormals: false
                }
            }))
            .addObject(new Object3D({
                id: 'wall_tower_2_4',
                position: new Point(135, 60, 100),
                geometry: new RegularPrism(wallDimension.h, wallDimension.d, wallDimension.w),
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
                position: new Point(position.x, position.y - dimension.h, position.z),
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