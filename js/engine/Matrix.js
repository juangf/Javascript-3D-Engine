class Matrix {
    /*
        1, 0, 0, X
        0, 1, 0, Y
        0, 0, 1, Z
        0, 0, 0, W
    */
    constructor(values = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]) {
        // Create the identity matrix by default
        this.m = values;
    }

    getSize() {
        return this.m.length;
    }

    set(values) {
        this.m = values;
    }

    get() {
        return this.m;
    }

    getValue(row, col) {
        return this.m[row][col];
    }

    setValue(row, col, value) {
        this.m[row][col] = value;
        return this;
    }

    toString() {
        console.log(`${this.m[0][0]}, ${this.m[0][1]}, ${this.m[0][2]}, ${this.m[0][3]}
${this.m[1][0]}, ${this.m[1][1]}, ${this.m[1][2]}, ${this.m[1][3]}
${this.m[2][0]}, ${this.m[2][1]}, ${this.m[2][2]}, ${this.m[2][3]}
${this.m[3][0]}, ${this.m[3][1]}, ${this.m[3][2]}, ${this.m[3][3]}`);
    }

    static multiply_iterative(m1, m2) {
        let m = new Matrix();
        let size = m1.getSize();

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let sum = 0;
                for (let k = 0; k < size; k++) {
                    sum += m1.getValue(i, k) * m2.getValue(j, k);
                }
                m.setValue(i, j, sum);
            }
        }
        return m;
    }

    static multiply(m1, m2) {
        let m1v = m1.get();
        let m2v = m2.get();

        return new Matrix([
            [
                m1v[0][0] * m2v[0][0] + m1v[0][1] * m2v[0][1] + m1v[0][2] * m2v[0][2] + m1v[0][3] * m2v[0][3],
                m1v[0][0] * m2v[1][0] + m1v[0][1] * m2v[1][1] + m1v[0][2] * m2v[1][2] + m1v[0][3] * m2v[1][3],
                m1v[0][0] * m2v[2][0] + m1v[0][1] * m2v[2][1] + m1v[0][2] * m2v[2][2] + m1v[0][3] * m2v[2][3],
                m1v[0][0] * m2v[3][0] + m1v[0][1] * m2v[3][1] + m1v[0][2] * m2v[3][2] + m1v[0][3] * m2v[3][3]
            ],
            [
                m1v[1][0] * m2v[0][0] + m1v[1][1] * m2v[0][1] + m1v[1][2] * m2v[0][2] + m1v[1][3] * m2v[0][3],
                m1v[1][0] * m2v[1][0] + m1v[1][1] * m2v[1][1] + m1v[1][2] * m2v[1][2] + m1v[1][3] * m2v[1][3],
                m1v[1][0] * m2v[2][0] + m1v[1][1] * m2v[2][1] + m1v[1][2] * m2v[2][2] + m1v[1][3] * m2v[2][3],
                m1v[1][0] * m2v[3][0] + m1v[1][1] * m2v[3][1] + m1v[1][2] * m2v[3][2] + m1v[1][3] * m2v[3][3]
            ],
            [
                m1v[2][0] * m2v[0][0] + m1v[2][1] * m2v[0][1] + m1v[2][2] * m2v[0][2] + m1v[2][3] * m2v[0][3],
                m1v[2][0] * m2v[1][0] + m1v[2][1] * m2v[1][1] + m1v[2][2] * m2v[1][2] + m1v[2][3] * m2v[1][3],
                m1v[2][0] * m2v[2][0] + m1v[2][1] * m2v[2][1] + m1v[2][2] * m2v[2][2] + m1v[2][3] * m2v[2][3],
                m1v[2][0] * m2v[3][0] + m1v[2][1] * m2v[3][1] + m1v[2][2] * m2v[3][2] + m1v[2][3] * m2v[3][3]
            ],
            [
                m1v[3][0] * m2v[0][0] + m1v[3][1] * m2v[0][1] + m1v[3][2] * m2v[0][2] + m1v[3][3] * m2v[0][3],
                m1v[3][0] * m2v[1][0] + m1v[3][1] * m2v[1][1] + m1v[3][2] * m2v[1][2] + m1v[3][3] * m2v[1][3],
                m1v[3][0] * m2v[2][0] + m1v[3][1] * m2v[2][1] + m1v[3][2] * m2v[2][2] + m1v[3][3] * m2v[2][3],
                m1v[3][0] * m2v[3][0] + m1v[3][1] * m2v[3][1] + m1v[3][2] * m2v[3][2] + m1v[3][3] * m2v[3][3]
            ]
        ]);
    }
}

export default Matrix;