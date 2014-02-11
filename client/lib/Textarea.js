Textarea = {
	reset: function(textarea) {
		$(textarea).blur();
		$(textarea).val(''); //reset textarea
		Meteor.setTimeout(function() {
			$(textarea).focus();
		}, 10); // fanzy enough we have to wait a split second or the cursor and whitespaces will stay
	}
};