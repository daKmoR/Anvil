Template.User.statuses = function() {
	return Statuses;
};

Template.User.rendered = function () {

	//ToDo: delay is a workaround as we currently use autopublish and we don't wait for the data before rendering
	_.delay(function() {
		TaskDragging();
		$('#tabs').tabs();
		$('.new-task').autosize();
	}, 1000);

};