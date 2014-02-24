

Meteor.users.helpers({
	tasks: function() {
		return Tasks.find({assigned: this._id, active: false}, {sort: {rank: 1}});
	},
	tasksActive: function() {
		return Tasks.find({assigned: this._id, active: true}, {sort: {rank: 1}});
	}
});