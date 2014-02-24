Handlebars.registerHelper('joinWithUser', function() {
	var object = this;
	var user = Meteor.users.findOne({_id: object.userId});
	return _.extend(object, _.omit(user, '_id'));
});