Template.team.projects = function() {
	var organisationsUsers = this;
	return Projects.find({organisationId: organisationsUsers.organisation_id}, {sort: {rank: 1}});
};

Template.team.tasksProject = function(projectId) {
	return Tasks.find({project: projectId, assigned: false}, {sort: {rank: 1}});
};

Template.team.tasks = function() {
	return Tasks.find({}, {sort: {rank: 1}});
};

Template.team.tasksUnassigned = function() {
	return Tasks.find({assigned: false}, {sort: {rank: 1}});
};

Template.team.tasksAssigned = function(userId) {
	return Tasks.find({assigned: userId, active: false}, {sort: {rank: 1}});
};

Template.team.tasksActive = function(userId) {
	return Tasks.find({assigned: userId, active: true}, {sort: {rank: 1}});
};

Template.team.joinWithUser = function() {
	var organisationsUsers = this;
	var user = Meteor.users.findOne({_id: organisationsUsers.user_id});
	return _.extend(organisationsUsers, _.omit(user, '_id'));
};

Template.team.usersInOrganisation = function() {
	var organisationsUsers = this;
	return OrganisationsUsers.find({
		organisation_id: organisationsUsers.organisation_id
	}, {
		sort: { rank: 1 }
	});
};

Template.team.joinWithOrganisation = function() {
	var organisationsUsers = this;
	var organisation = Organisations.findOne({_id: organisationsUsers.organisation_id});
	return _.extend(organisationsUsers, _.omit(organisation, '_id'));
};

Template.team.organisationsAssigned = function() {
	return OrganisationsUsers.find({
		user_id: Meteor.userId()
	}, {
		sort: { rank: 1 }
	});
};

Template.team.events({
	'keypress .new-task': function(event) {
		if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
			var area = $(event.target);

			var project = $(event.target).data('project-id') ? $(event.target).data('project-id') : false;
			new Task({
				name: area.val(),
				project: project
			});

			Textarea.reset(area);
		}
	},

	'click .remove-task': function() {
		Tasks.remove(this._id)
	},

	'click .dialog': function(event) {
		event.preventDefault();
		var link = $(event.target);
		Session.set('taskId', link.data('task-id'));
		Meteor.subscribe('task', link.data('task-id'), function() {
			$('#task').modal();
		});
	},

	'keypress .new-organisation': function(event) {
		if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
			var area = $(event.target);
			var newOrganisationId = Organisations.insert({
				name: area.val()
			});

			OrganisationsUsers.insert({
				user_id: Meteor.userId(),
				organisation_id: newOrganisationId
			});
			Textarea.reset(area);
		}
	},

	'keypress .new-project': function(event) {
		if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
			var area = $(event.target);
			var organisationId = $(area.parents('.organisation')[0]).data('organisation-id');

			Projects.insert({
				name: area.val(),
				organisationId: organisationId
			});

			Textarea.reset(area);
		}
	}

});


Template.team.rendered = function () {

	TaskDragging();

	$('#tabs').tabs();
	$('textarea').autosize();

};