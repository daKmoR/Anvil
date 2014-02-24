

Meteor.users.helpers({
	tasks: function() {
		return Tasks.find({assigned: this._id, active: false}, {sort: {rank: 1}});
	},

	tasksActive: function() {
		return Tasks.find({assigned: this._id, active: true}, {sort: {rank: 1}});
	},

	removeFromTeam: function() {
		var teamUser = TeamsUsers.findOne({userId: this.userId, teamId: this.teamId});
		TeamsUsers.remove(teamUser._id);
	}
});