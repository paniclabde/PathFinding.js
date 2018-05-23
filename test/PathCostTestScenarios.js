module.exports = [
    {
        startX: 0,
        startY: 0,
        endX: 2,
        endY: 0,
        matrix: [[0, 0, 0],
                 [0, 0, 0]],
        cost:   [[1, 1, 1],
                 [1, 1, 1]],
        expectedLength: 3
    },
    {
        startX: 0,
        startY: 0,
        endX: 2,
        endY: 0,
        matrix: [[0, 0, 0],
                 [0, 0, 0]],
        cost:   [[1, 4, 1],
                 [1, 1, 1]],
        expectedLength: 5
    }
];