Template.user.tasksAssigned = function() {
	return Tasks.find({assigned: Session.get('displayUserId'), active: false}, {sort: {rank: 1}});
};