import Camera from './Camera.js';
import Matrix from '../Matrix.js';
import Point from '../Point.js';

class FpCamera extends Camera {
    constructor(config) {
        super(config);
        this.pitch = config.pitch ? config.pitch : 0;
        this.yaw = config.yaw ? config.yaw : 0;
    }

    setPitch(pitch) {
        this.pitch = pitch;
    }

    setYaw(yaw) {
        this.yaw = yaw;
    }

    getMatrix() {
        let cosPitch = Math.cos(this.pitch);
        let sinPitch = Math.sin(this.pitch);
        let cosYaw = Math.cos(this.yaw);
        let sinYaw = Math.sin(this.yaw);
        
        let xaxis = new Point(cosYaw, 0, -sinYaw);
        let yaxis = new Point(sinYaw * sinPitch, cosPitch, cosYaw * sinPitch);
        let zaxis = new Point(sinYaw * cosPitch, -sinPitch, cosPitch * cosYaw);
        
        let viewMatrix = new Matrix([
            [xaxis.x, yaxis.x, zaxis.x, 0],
            [xaxis.y, yaxis.y, zaxis.y, 0],
            [xaxis.z, yaxis.z, zaxis.z, 0],
            [-Point.dot(xaxis, this.position), -Point.dot(yaxis, this.position), -Point.dot(zaxis, this.position), 1]
        ]);
        //console.log(-Point.dot(xaxis, this.position), -Point.dot(yaxis, this.position), -Point.dot(zaxis, this.position));
            
        return viewMatrix;
    }
}

export default FpCamera;