Tasks = new Meteor.Collection('tasks');

Task = function(options) {
	if (!Meteor.userId()) {
		return {};
	}

	var lowestTask = Tasks.findOne({}, {sort: {rank: -1}});
	var newRank = lowestTask ? lowestTask.rank + 1 : 1;
	var highestPublicIdTask = Tasks.findOne({}, {sort: {publicId: -1}});
	var newPublicId = highestPublicIdTask ? highestPublicIdTask.publicId + 1 : 1;

	_.defaults(options, {
		publicId: newPublicId,
		creator: Meteor.userId(),
		rank: newRank,
		active: false,
		assigned: false,
		project: false,
		status: 30,
		hold: false,
		priority: false,
		done: 0 // 1: done, -1: rejected
	});

	if (options.name.length < 0) {
		return {};
	}

	Tasks.insert(options);
	return this;
};