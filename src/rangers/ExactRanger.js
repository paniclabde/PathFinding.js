var PF = require('../PathFinding');

function ExactRanger(exactLength, ignoreWalkability, finder) {
    this.exactLength = exactLength;
    this.ignoreWalkability = ignoreWalkability;
    this.finder = finder;

    if (this.ignoreWalkability === undefined) {
        this.ignoreWalkability = false;
    }

    if (!this.finder) {
        this.finder = new PF.AStarFinder();
    }
}

ExactRanger.prototype.findRange = function(posX, posY, grid) {
    var result = [];

    var iXstart = posX - this.exactLength >= 0 ? posX - this.exactLength : 0;
    var iXmax = posX + this.exactLength;
    var iYstart = posY - this.exactLength >= 0 ? posY - this.exactLength : 0;
    var iYmax = posY + this.exactLength;

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

                if (path.length === this.exactLength + 1) {
                    result[iY].push(path);
                    continue;
                }
            }

            result[iY].push([]);
        }
    }

    return result;
};

module.exports = ExactRanger;
