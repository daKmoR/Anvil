Template.task.events({
	'keypress .new-task-message': function(event) {
		if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
			var textarea = $(event.target);
			Tasks.update(this._id, { $push: { messages: textarea.val() }});
			$(textarea).blur();
			$(textarea).val(''); //reset textarea
			Meteor.setTimeout(function() {
				$(textarea).focus();
			}, 10); // fanzy enough we have to wait a split second or the cursor and whitespaces will stay
		}
	}
});