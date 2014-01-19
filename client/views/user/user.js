Template.user.tasksAssigned = function() {
	return Tasks.find({assigned: Session.get('displayUserId'), active: false}, {sort: {rank: 1}});
};

Template.user.tasksAssignedStatus = function(statusId) {
	var tasksAssignedStatus = [];
	var above = -1;
	_.each(Template.user.tasksAssigned().fetch(), function(task) {
		above++;
		var found = Tasks.findOne({_id: task._id, assigned: Session.get('displayUserId'), active: false, status: statusId});
		if (found) {
			found.above = above * 35;
			tasksAssignedStatus.push(found);
			above = -1;
		}
	});
	return tasksAssignedStatus;
	// standard query without above information
	// return Tasks.find({assigned: Session.get('displayUserId'), active: false, status: statusId}, {sort: {rank: 1}});
};

Template.user.statuses = function() {
	return Statuses;
};

Template.user.rendered = function () {

	TaskDragging();

	$('textarea').autosize();

};