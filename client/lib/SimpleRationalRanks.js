SimpleRationalRanks = {
	beforeFirst: function(firstRank) {
		return firstRank - 1;
	},
	between: function(beforeRank, afterRank) {
		return (beforeRank + afterRank) / 2;
	},
	afterLast: function(lastRank) {
		return lastRank + 1;
	},
	newRank: function(before, after) {
		if (before && after) { //moving in between two tasks
			return SimpleRationalRanks.between(before.$ui.component.data().rank, after.$ui.component.data().rank);
		} else if (after) { //moving to the top of the list
			return SimpleRationalRanks.beforeFirst(after.$ui.component.data().rank);
		} else if (before) { //moving to the bottom of the list
			return SimpleRationalRanks.afterLast(before.$ui.component.data().rank);
		}
	}
};