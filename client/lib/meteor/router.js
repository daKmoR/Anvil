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
		path: '/team'
	})
});