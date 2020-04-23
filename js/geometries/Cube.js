import RegularPrism from './RegularPrism.js';

/**
 * Perfect regular prism.
 *
 *   5________4
 *  / |      /|
 * 0________1 |
 * |  6_____|_7
 * | /      | /
 * 3________2/
 *
 */
class Cube extends RegularPrism {

    /**
     * Constructor.
     * (All sides are the same size).
     *
     * @param {number} size
     */
    constructor(size, allTriangles = true) {
        super(size, size, size, allTriangles);
    }
}

export default Cube;