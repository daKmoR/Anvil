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
		},
		data: function() {
			return {
				currentTask: Tasks.findOne(Session.get('taskId'))
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

});