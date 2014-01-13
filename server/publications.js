Meteor.publish('tasks', function () {
	return Tasks.find({});
});

Meteor.publish('task', function (id) {
	check(id, String);
	return Tasks.find(id);
});

Meteor.publish('projects', function () {
	return Projects.find({});
});