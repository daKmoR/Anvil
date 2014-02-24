/* router comes here */

Router.configure({
	layoutTemplate: 'DefaultLayout',
	loadingTemplate: 'DefaultLoading',
	notFoundTemplate: 'DefaultNotFound'
});

Router.map(function() {
	this.route('root', {
		path: '/'
	})
});

Router.map(function() {
	this.route('team', {
		template: 'Team',
		path: '/team/:_id',
		before: function() {
//			Meteor.subscribe('tasks');
//			Meteor.subscribe('projects');
//			Meteor.subscribe('users');
//			Meteor.subscribe('organisations');
//			Meteor.subscribe('organisations_users');
		},
		waitOn: function() {
//			return Meteor.subscribe('users');
		},
		data: function() {
			return Teams.findOne(this.params._id);
//			return {
//				team: Teams.findOne(this.params._id),
//				teamUsers: TeamsUsers.find({teamId: this.params._id}),
//				currentTask: Tasks.findOne(Session.get('taskId'))
//			};
		}
	});

	this.route('task', {
		path: '/task/:_id',
		before: function() {
//			this.subscribe('task', this.params._id);
		},
		data: function() {
			return Tasks.findOne(this.params._id);
		}
	});

	this.route('user', {
		path: '/user/:_id?',
		before: function() {
			var userId = this.params._id ? this.params._id : Meteor.userId();
			Session.set('displayUserId', userId);
//			this.subscribe('user', userId);
//			this.subscribe('tasksAssigned', userId);
		}
	});

});