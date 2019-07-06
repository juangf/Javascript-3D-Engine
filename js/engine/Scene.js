class Scene {

    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.camera = config.camera;
        this.objects = {};
    }

    addObject(obj) {
        this.objects[obj.id] = obj;
        return this;
    }

    removeObject(objectId) {
        delete this.objects[objectId];
        return this;
    }

    getObject(objectId) {
        return this.objects[objectId];
    }

    getObjects() {
        return this.objects;
    }

    getCamera() {
        return this.camera;
    }
}

export default Scene;