/* router comes here */

Router.configure({
	layoutTemplate: 'DefaultLayout',
	loadingTemplate: 'DefaultLoading',
	notFoundTemplate: 'DefaultNotFound',
	templateNameConverter: 'none'
});

Router.map(function() {

	this.route('Dashboard', {
		path: '/',
		data: function() {
			return { user: Meteor.user() };
		}
	});

	this.route('Team', {
		path: '/team/:_id',
		data: function() {
			return Teams.findOne(this.params._id);
		}
	});

	this.route('Task', {
		path: '/task/:_id',
		data: function() {
			return Tasks.findOne(this.params._id);
		}
	});

	this.route('User', {
		path: '/user/:_id',
		data: function() {
			return { user: Meteor.users.findOne(this.params._id) };
		}
	});

});