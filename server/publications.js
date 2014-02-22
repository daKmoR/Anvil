//Meteor.publish('tasks', function () {
//	return Tasks.find({});
//});
//
//Meteor.publish('task', function (id) {
//	check(id, String);
//	return Tasks.find(id);
//});
//
//Meteor.publish('projects', function () {
//	return Projects.find({});
//});
//
//Meteor.publish('users', function() {
//	return Meteor.users.find({});
//});
//
//Meteor.publish('tasksAssigned', function (userId) {
//	check(userId, String);
//	return Tasks.find({assigned: userId});
//});
//
//Meteor.publish('organisations', function() {
//	return Organisations.find({});
//});
//
//Meteor.publish('organisations_users', function() {
//	return OrganisationsUsers.find({});
//});