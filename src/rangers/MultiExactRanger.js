var PF = require('../PathFinding');

function MultiExactRanger(exactLengths, ignoreWalkability, finder) {
    this.exactLengths = exactLengths;
    this.ignoreWalkability = ignoreWalkability;
    this.finder = finder;

    if (this.ignoreWalkability === undefined) {
        this.ignoreWalkability = false;
    }

    if (!this.finder) {
        this.finder = new PF.AStarFinder();
    }
}

MultiExactRanger.prototype.findRange = function(posX, posY, grid) {
    var result = [];

    var maxLength = this.exactLengths.reduce(function(a, b) { return Math.max(a,b); });
    var iXstart = posX - maxLength >= 0 ? posX - maxLength : 0;
    var iXmax = posX + maxLength;
    var iYstart = posY - maxLength >= 0 ? posY - maxLength : 0;
    var iYmax = posY + maxLength;

    if (this.ignoreWalkability) {
        for (var iY = 0; iY < grid.height; iY++) {
            for (var iX = 0; iX < grid.width; iX++) {
                grid.setWalkableAt(iX, iY, true);
                grid.setCostAt(iX, iY, 0);
            }
        }
    }

    for (var iY = 0; iY < grid.height; iY++) {
        result.push([]);

        for (var iX = 0; iX < grid.width; iX++) {
            if (iY >= iYstart && iY <= iYmax && iX >= iXstart && iX <= iXmax) {
                var path = this.finder.findPath(posX, posY, iX, iY, grid.clone());

                if (this.exactLengths.includes(path.length - 1)) {
                    result[iY].push(path);
                    continue;
                }
            }

            result[iY].push([]);
        }
    }

    return result;
};

module.exports = MultiExactRanger;
