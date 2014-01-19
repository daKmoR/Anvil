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

SimpleRationalRanks = {
	beforeFirst: function(firstRank) {
		return firstRank - 1;
	},
	between: function(beforeRank, afterRank) {
		return (beforeRank + afterRank) / 2;
	},
	afterLast: function(lastRank) {
		return lastRank + 1;
	}
};

Template.team.rendered = function () {

	$('.tasks').sortable({
		items      : '> div.task',
		connectWith: '.tasks',
		placeholder: 'task highlight',
		stop       : function (event, ui) {
			var el = ui.item.get(0), before = ui.item.prev('div.task').get(0), after = ui.item.next('div.task').get(0), newSettings = {};

			var newAssigned = $(el).parent().data('user-id');
			if (newAssigned !== el.$ui.data().assigned) {
				newSettings.assigned = newAssigned;
			}

			var newProject = $(el).parent().data('project-id');
			if (newProject !== el.$ui.data().project) {
				newSettings.project = newProject;
			}

			var taskList = $(el).parent().data('user-tasks-list');
			if (taskList === 'user-active-tasks') {
				var activeTask = Tasks.findOne({assigned: newAssigned, active: true});
				if (activeTask && activeTask._id !== el.$ui.data()._id) {
					$.pnotify({
						title: 'One active Task per user',
						text : 'Task assigned and active, old one become inactive'
					});
					Tasks.update(activeTask._id, {$set: {active: false}});
				}
				newSettings.active = true;
			} else if (taskList === 'user-tasks') {
				newSettings.active = false;
			} else if (taskList === 'tasks-unassigned') {
				newSettings.active = false;
				newSettings.assigned = false;
			}

			if (taskList !== 'user-active-tasks') {
				if (before && after) { //moving in between two tasks
					newSettings.rank = SimpleRationalRanks.between(before.$ui.data().rank, after.$ui.data().rank);
				} else if (after) { //moving to the top of the list
					newSettings.rank = SimpleRationalRanks.beforeFirst(after.$ui.data().rank);
				} else if (before) { //moving to the bottom of the list
					newSettings.rank = SimpleRationalRanks.afterLast(before.$ui.data().rank);
				}
			}

			$(this).sortable('cancel');
			Tasks.update(el.$ui.data()._id, {$set: newSettings});
		}
	});

	$('#tabs').tabs();

	$('textarea').autosize();

};