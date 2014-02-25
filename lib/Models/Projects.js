Projects = new Meteor.Collection('projects');

Project = function(options) {
	var lowestProject = Projects.findOne({organisationId: options.organisationId}, {sort: {rank: 1}});
	var newRank = lowestProject ? lowestProject.rank - 1 : -1;

	_.defaults(options, {
		creatorId: Meteor.userId(),
		rank: newRank
	});

	Projects.insert(options);
};

Projects.helpers({
	tasks: function() {
		return Tasks.find({projectId: this._id}, {sort: {rank: 1}});
	},

	removeAsModel: function() {
		this.tasks().forEach(function(task) {
			Tasks.update(task._id, {$set: {projectId: false}});
		});
		Projects.remove(this._id);
	}
});