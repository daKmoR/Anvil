Template.team.projects = function() {
	return Projects.find({}, {sort: {rank: 1}});
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
			var textarea = $(event.target);

			if (textarea.val().length > 0 && Meteor.userId()) {
				var lowestTask = Tasks.findOne({}, {sort: {rank: -1}});
				var newRank = lowestTask ? lowestTask.rank + 1 : 1;
				var highestPublicIdTask = Tasks.findOne({}, {sort: {publicId: -1}});
				var newPublicId = highestPublicIdTask ? highestPublicIdTask.publicId + 1 : 1;
				var project = $(event.target).data('project-id') ? $(event.target).data('project-id') : false;
				Tasks.insert({
					publicId: newPublicId,
					name: textarea.val(),
					creator: Meteor.userId(),
					rank: newRank,
					active: false,
					assigned: false,
					project: project,
					status: 30,
					hold: false,
					priority: false,
					done: 0 // 1: done, -1: rejected
				});
			}
			$(textarea).blur();
			$(textarea).val(''); //reset textarea
			Meteor.setTimeout(function() {
				$(textarea).focus();
			}, 10); // fanzy enough we have to wait a split second or the cursor and whitespaces will stay
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