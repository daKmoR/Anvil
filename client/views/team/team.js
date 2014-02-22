Template.team.projects = function() {
	var organisationsUsers = this;
	return Projects.find({organisationId: organisationsUsers.organisationId}, {sort: {rank: 1}});
};

Template.team.tasksProject = function(projectId) {
	return Tasks.find({project: projectId, assigned: false}, {sort: {rank: 1}});
};

Template.team.tasks = function() {
	return Tasks.find({}, {sort: {rank: 1}});
};

Template.team.tasksUnassigned = function() {
	return Tasks.find({assigned: false}, {sort: {rank: 1}});
};

Template.team.tasksAssigned = function(userId) {
	return Tasks.find({assigned: userId, active: false}, {sort: {rank: 1}});
};

Template.team.tasksActive = function(userId) {
	return Tasks.find({assigned: userId, active: true}, {sort: {rank: 1}});
};

Template.team.events({
	'keypress .new-task': function(event) {
		if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
			var area = $(event.target);

			var project = $(event.target).data('project-id') ? $(event.target).data('project-id') : false;
			new Task({
				name: area.val(),
				project: project
			});

			Textarea.reset(area);
		}
	},

	'click .remove-task': function() {
		Tasks.remove(this._id)
	},

	'click .dialog': function(event) {
		event.preventDefault();
		var link = $(event.target);
		Session.set('taskId', link.data('task-id'));
		Meteor.subscribe('task', link.data('task-id'), function() {
			$('#task').modal();
		});
	}

});


Template.team.rendered = function () {

	TaskDragging();

	$('#tabs').tabs();
	$('textarea').autosize();

};