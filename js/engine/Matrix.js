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

    setRow(index, rowValues) {
        this.m[index] = rowValues;
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

    /**
     * Based on:
     * https://github.com/jcoglan/sylvester/blob/master/src/matrix.js
     */
    static toRightTriangular(m) {
        let M = m, els;
        let n = 4, i, j, np = 8, p;
        for (i = 0; i < n; i++) {
          if (M.getValue(i, i) === 0) {
            for (j = i + 1; j < n; j++) {
              if (M.getValue(j, i) !== 0) {
                els = [];
                for (p = 0; p < np; p++) { els.push(M.getValue(i, p) + M.getValue(j, p)); }
                M.setRow(i, els);
                break;
              }
            }
          }
          if (M.getValue(i, i) !== 0) {
            for (j = i + 1; j < n; j++) {
              var multiplier = M.getValue(j, i) / M.getValue(i, i);
              els = [];
              for (p = 0; p < np; p++) {
                // Elements with column numbers up to an including the number of the
                // row that we're subtracting can safely be set straight to zero,
                // since that's the point of this routine and it avoids having to
                // loop over and correct rounding errors later
                els.push(p <= i ? 0 : M.getValue(j, p) - M.getValue(i, p) * multiplier);
              }
              M.setRow(j, els);
            }
          }
        }
        return M;
    };

    static duplicate(m) {
        return new Matrix(m.get());
    }
    
    static augment(m1, m2) {
        let M = m2;
        let T = m1, cols = 4;
        let i = 4, nj = 4, j;
        if (i !== 4) { return null; }
        while (i--) { j = nj;
          while (j--) {
            T.setValue(i, cols + j, M.getValue(i, j));
          }
        }
        return T;
    }

    /**
     * Based on:
     * https://github.com/jcoglan/sylvester/blob/master/src/matrix.js
     */
    static inverse(m) {
        let n = 4, i = n, j;
        let M = Matrix.toRightTriangular(Matrix.augment(m, new Matrix()));
        let np = 8, p, els, divisor;
        let inverse_elements = [];
        // Sylvester.Matrix is non-singular so there will be no zeros on the
        // diagonal. Cycle through rows from last to first.
        while (i--) {
            // First, normalise diagonal elements to 1
            els = [];
            inverse_elements[i] = [];
            divisor = M.getValue(i, i);

            for (p = 0; p < np; p++) {
                let new_element = M.getValue(i, p) / divisor;
                els.push(new_element);
                // Shuffle off the current row of the right hand side into the results
                // array as it will not be modified by later runs through this loop
                if (p >= n) {
                    inverse_elements[i].push(new_element);
                }
            }
            M.setRow(i, els);
            // Then, subtract this row from those above it to give the identity matrix
            // on the left hand side
            j = i;
            while (j--) {
                els = [];
                for (p = 0; p < np; p++) {
                    els.push(M.getValue(j, p) - M.getValue(i, p) * M.getValue(j, i));
                }
                M.setRow(j, els);
            }
        }
        return new Matrix(inverse_elements);
    }

}

export default Matrix;