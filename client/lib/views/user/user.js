Template.user.tasksAssigned = function() {
	return Tasks.find({assigned: Session.get('displayUserId'), active: false}, {sort: {rank: 1}});
};

Template.user.tasksAssignedStatus = function(statusId) {
	return Tasks.find({assigned: Session.get('displayUserId'), active: false, status: statusId}, {sort: {rank: 1}});
};

Template.user.statuses = function() {
	return Statuses;
};