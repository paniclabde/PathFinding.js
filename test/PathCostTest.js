var PF        = require('..')
var scenarios = require('./PathCostTestScenarios');

/**
 * Path-finding tests for the path-finders with cost support.
 * @opt {object} options.
 */
function pathCostTest(opt) {
    var name = opt.name,
        finder = opt.finder;

    describe(name, function() {
        var startX, startY, endX, endY, grid, expectedLength,
            width, height, matrix, cost, path, i, scen;

        var test = (function() {
            var testId = 0;

            return function(startX, startY, endX, endY, grid, expectedLength) {
                it('should solve maze '+ ++testId, function() {
                    path = finder.findPath(startX, startY, endX, endY, grid);
                    path.length.should.equal(expectedLength);
                });
            };
        })();

        // Load all the scenarios and test against the finder.
        for (i = 0; i < scenarios.length; ++i) {
            scen = scenarios[i];

            matrix = scen.matrix;
            height = matrix.length;
            width = matrix[0].length;
            cost = scen.cost;

            grid = new PF.Grid(width, height, matrix, cost);

            test(
                scen.startX, scen.startY,
                scen.endX, scen.endY,
                grid,
                scen.expectedLength
            );
        }
    });
}

function pathCostTests(tests) {
    for (i = 0; i < arguments.length; ++i) {
        pathCostTest(arguments[i]);
    }
}

pathCostTests({
    name: 'AStar with cost',
    finder: new PF.AStarFinder()
});