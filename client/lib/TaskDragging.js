SortableRankedTaskLists = [
	'team-user',
	'team-unassigned',
	'team-all',
	'team-project',
	'user-assigned'
];

TaskDragging = function() {

	$('.tasks').sortable({
		items      : '> div.task',
		connectWith: '.tasks',
		placeholder: 'task highlight',
		start: function() {
			$(document.body).addClass('task-dragging');
		},
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

			var taskList = $(el).parent().data('tasks-list');
			switch(taskList) {
				case 'team-user-active':
					var activeTask = Tasks.findOne({assigned: newAssigned, active: true});
					if (activeTask && activeTask._id !== el.$ui.data()._id) {
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
					if (newStatus && newStatus !== el.$ui.data().status) {
						newSettings.status = newStatus;
					}
					break;
			}

			if ( _.contains(SortableRankedTaskLists, taskList)) {
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
			$(document.body).removeClass('task-dragging');
		}
	});

}