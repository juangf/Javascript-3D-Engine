class Scene {

    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.objects = {};
        this.lights = {};
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

    addLight(light) {
        this.lights[light.id] = light;
        return this;
    }

    removeLight(lightId) {
        delete this.lights[lightId];
        return this;
    }

    getLight(lightId) {
        return this.lights[lightId];
    }

    getLights() {
        return this.lights;
    }

    beforeRender() {
        return this;
    }
}

export default Scene;