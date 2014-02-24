Template.Team.events({
	'keypress .new-task': function(event) {
		if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
			var area = $(event.target);
			new Task({
				assigned: this._id,
				name: area.val()
			});
			Textarea.reset(area);
		}
	},

	'click .remove-task': function() {
		this.removeAsModel();
	},

	'click .remove-user-from-team': function() {
		this.removeFromTeam();
	},

	'click .dialog': function(event) {
		event.preventDefault();
		var link = $(event.target);
		Session.set('taskId', link.data('task-id'));
		$('#task').modal();
//		Meteor.subscribe('task', link.data('task-id'), function() {
//			$('#task').modal();
//		});
	}

});

Template.Team.rendered = function () {

	//ToDo: delay is a workaround as we currently use autopublish and we don't wait for the data before rendering
	_.delay(function() {
		TaskDragging();
		$('#tabs').tabs();
		$('.new-task').autosize();
	}, 1000);

};