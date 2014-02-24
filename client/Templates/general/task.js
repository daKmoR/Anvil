Template.task.events({
	'keypress .new-task-message': function(event) {
		if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
			var area = $(event.target);
			Tasks.update(this._id, { $push: {
				messages: area.val()
			}});
			Textarea.reset(area);
		}
	}
});