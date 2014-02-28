

Meteor.users.helpers({
	tasks: function() {
		return Tasks.find({assigned: this._id, active: false}, {sort: {rank: 1}});
	},

	tasksActive: function() {
		return Tasks.find({assigned: this._id, active: true}, {sort: {rank: 1}});
	},

	tasksWithAbove: function(statusId) {
		var tasksAssignedStatus = [];
		var above = -1;
		_.each(this.tasks().fetch(), function(task) {
			above++;
			if (task.status == statusId) {
				task.above = above * 35;
				tasksAssignedStatus.push(task);
				above = -1;
			}
		});
		return tasksAssignedStatus;
	},

	// workaround as current shark doesn't seem to allow passing of parameters :/
	tasksWithAbove10: function () { return this.tasksWithAbove(10); },
	tasksWithAbove20: function () { return this.tasksWithAbove(20); },
	tasksWithAbove30: function () { return this.tasksWithAbove(30); },
	tasksWithAbove40: function () { return this.tasksWithAbove(40); },
	tasksWithAbove50: function () { return this.tasksWithAbove(50); },

	removeFromTeam: function() {
		var teamUser = TeamsUsers.findOne({userId: this.userId, teamId: this.teamId});
		TeamsUsers.remove(teamUser._id);
	}
});