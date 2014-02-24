SortableRankedTaskLists = [
	'team-user',
	'team-unassigned',
	'team-all',
	'team-project',
	'user-assigned'
];

TaskDragging = function() {

	$('.tasks').sortable({
		items: '> div.task',
		connectWith: '.tasks',
		placeholder: 'task highlight',
		start: function() {
			$(document.body).addClass('task-dragging');
		},
		stop: function (event, ui) {
			var el = ui.item.get(0), before = ui.item.prev('div.task').get(0), after = ui.item.next('div.task').get(0), newSettings = {};

			var newAssigned = $(el).parent().data('user-id');
			if (newAssigned !== el.$ui.component.data().assigned) {
				newSettings.assigned = newAssigned;
			}

			var newProject = $(el).parent().data('project-id');
			if (newProject !== el.$ui.component.data().project) {
				newSettings.project = newProject;
			}

			var taskList = $(el).parent().data('tasks-list');
			switch(taskList) {
				case 'team-user-active':
					var activeTask = Tasks.findOne({assigned: newAssigned, active: true});
					if (activeTask && activeTask._id !== el.$ui.component.data()._id) {
						$.pnotify({
							title: 'One active Task per user',
							text : 'Task assigned and active, old one become inactive'
						});
						Tasks.update(activeTask._id, {$set: {active: false}});
					}
					newSettings.active = true;
					break;
				case 'team-user':
					newSettings.active = false;
					break;
				case 'team-unassigned':
					newSettings.active = false;
					newSettings.assigned = false;
					break;
				case 'user-status':
					var newStatus = $(el).parent().data('status-id');
					if (newStatus && newStatus !== el.$ui.component.data().status) {
						newSettings.status = newStatus;
					}
					break;
			}

			if ( _.contains(SortableRankedTaskLists, taskList)) {
				newSettings.rank = SimpleRationalRanks.newRank(before, after);
			}

			$(this).sortable('cancel');
			Tasks.update(el.$ui.component.data()._id, {$set: newSettings});
			$(document.body).removeClass('task-dragging');
		}
	});

};