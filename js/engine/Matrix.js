class Matrix {

    /*
        1, 0, 0, X
        0, 1, 0, Y
        0, 0, 1, Z
        0, 0, 0, W
    */
    constructor(size = 4, scale = 1) {
        // Create the identity matrix by default
        this.values = [];
        this.size = 4;
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(j === i ? scale : 0);
            }
            this.values.push(row);
        }
    }

    getSize() {
        return this.size;
    }

    get() {
        return this.values;
    }

    getValue(row, col) {
        return this.values[row][col];
    }

    setValue(row, col, value) {
        this.values[row][col] = value;
        return this;
    }

    static multiply(m1, m2) {
        let size = m1.getSize();
        let m = new Matrix(size);

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
}

export default Matrix;