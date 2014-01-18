/* router comes here */

Router.configure({
	layout: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.map(function() {
	this.route('root', {
		path: '/'
	})
});

Router.map(function() {
	this.route('team', {
		path: '/team',
		before: function() {
			Meteor.subscribe('tasks');
			Meteor.subscribe('projects');
			Meteor.subscribe('users');
		},
		waitOn: function() {
			return Meteor.subscribe('users');
		},
		data: function() {
			return {
				currentTask: Tasks.findOne(Session.get('taskId')),
				users: Meteor.users.find()
			};
		}
	});

	this.route('task', {
		path: '/task/:_id',
		before: function() {
			this.subscribe('task', this.params._id);
		},
		data: function() {
			return Tasks.findOne(this.params._id);
		}
	});

	this.route('user', {
		path: '/user/:_id',
		before: function() {
			var userId = this.params._id ? this.params._id : Meteor.userId();
			Session.set('displayUserId', userId);
			this.subscribe('user', userId);
		}
	});

	this.route('user', {
		path: '/user',
		before: function() {
			var userId = this.params._id ? this.params._id : Meteor.userId();
			Session.set('displayUserId', userId);
			this.subscribe('user', userId);
			this.subscribe('tasksAssigned', userId);
		}
	});

});