var PF        = require('..');
var scenarios = require('./RangeTestScenarios');

function RangeTest() {
    describe('Ranger', function() {
        describe('LimitRanger', function() {
            var ranger1 = new PF.LimitRanger(scenarios[0].ranger.limit, false, new PF.AStarFinder());
            var grid1 = new PF.Grid(scenarios[0].matrix, scenarios[0].cost);

            it('should calculate the range in maze 1 as expected', function() {
                var result1 = ranger1.findRange(scenarios[0].startX, scenarios[0].startY, grid1.clone());
                result1.should.eql(scenarios[0].expected);
            });

            var ranger2 = new PF.LimitRanger(scenarios[1].ranger.limit, false, new PF.AStarFinder());
            var grid2 = new PF.Grid(scenarios[1].matrix, scenarios[1].cost);

            it('should calculate the range in maze 2 as expected', function() {
                var result2 = ranger2.findRange(scenarios[1].startX, scenarios[1].startY, grid2.clone());
                result2.should.eql(scenarios[1].expected);
            });
        });

        describe('ExactRanger', function() {
            var ranger1 = new PF.ExactRanger(scenarios[2].ranger.exactLength, false, new PF.AStarFinder());
            var grid1 = new PF.Grid(scenarios[2].matrix, scenarios[2].cost);

            it('should calculate the range in maze 3 as expected', function() {
                var result1 = ranger1.findRange(scenarios[2].startX, scenarios[2].startY, grid1.clone());
                result1.should.eql(scenarios[2].expected);
            });

            var ranger2 = new PF.ExactRanger(scenarios[3].ranger.exactLength, false, new PF.AStarFinder());
            var grid2 = new PF.Grid(scenarios[3].matrix, scenarios[3].cost);

            it('should calculate the range in maze 4 as expected', function() {
                var result2 = ranger2.findRange(scenarios[3].startX, scenarios[3].startY, grid2.clone());
                result2.should.eql(scenarios[3].expected);
            });
        });

        describe('MultiExactRanger', function() {
            var ranger1 = new PF.MultiExactRanger(scenarios[4].ranger.exactLengths, false, new PF.AStarFinder());
            var grid1 = new PF.Grid(scenarios[4].matrix, scenarios[4].cost);

            it('should calculate the range in maze 5 as expected', function() {
                var result1 = ranger1.findRange(scenarios[4].startX, scenarios[4].startY, grid1.clone());
                result1.should.eql(scenarios[4].expected);
            });

            var ranger2 = new PF.MultiExactRanger(scenarios[5].ranger.exactLengths, false, new PF.AStarFinder());
            var grid2 = new PF.Grid(scenarios[5].matrix, scenarios[5].cost);

            it('should calculate the range in maze 5 as expected', function() {
                var result2 = ranger2.findRange(scenarios[5].startX, scenarios[5].startY, grid2.clone());
                result2.should.eql(scenarios[5].expected);
            });
        });
    });
}

RangeTest();
