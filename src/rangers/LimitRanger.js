var PF = require('../PathFinding');

function LimitRanger(limit, ignoreWalkability, finder) {
    this.limit = limit;
    this.ignoreWalkability = ignoreWalkability;
    this.finder = finder;

    if (this.ignoreWalkability === undefined) {
        this.ignoreWalkability = false;
    }

    if (!this.finder) {
        this.finder = new PF.AStarFinder();
    }
}

LimitRanger.prototype.findRange = function(posX, posY, grid) {
    var result = [];

    var iXstart = posX - this.limit >= 0 ? posX - this.limit : 0;
    var iXmax = posX + this.limit;
    var iYstart = posY - this.limit >= 0 ? posY - this.limit : 0;
    var iYmax = posY + this.limit;

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

                if (path.length > 0 && path.length <= this.limit + 1) {
                    result[iY].push(path);
                    continue;
                }
            }

            result[iY].push([]);
        }
    }

    return result;
};

module.exports = LimitRanger;
