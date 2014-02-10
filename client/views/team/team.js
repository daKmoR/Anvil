Template.team.projects = function() {
	return Projects.find({}, {sort: {rank: 1}});
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

Template.team.joinWithOrganisation = function() {
	var organisationsUsers = this;
	var organisation = Organisations.findOne({_id: organisationsUsers.organisation_id});
	return _.extend(organisationsUsers, _.omit(organisation, '_id'));
};

Template.team.organisationsAssigned = function() {
	return OrganisationsUsers.find({
		user_id: Meteor.userId()
	}, {
		sort: { index: 1 }
	});
};

Template.team.events({
	'keypress .new-task': function(event) {
		if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
			var textarea = $(event.target);

			var project = $(event.target).data('project-id') ? $(event.target).data('project-id') : false;
			new Task({
				name: textarea.val(),
				project: project
			});

			$(textarea).blur();
			$(textarea).val(''); //reset textarea
			Meteor.setTimeout(function() {
				$(textarea).focus();
			}, 10); // fanzy enough we have to wait a split second or the cursor and whitespaces will stay
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
			var textarea = $(event.target);
			var newOrganisationId = Organisations.insert({
				name: textarea.val()
			});

			OrganisationsUsers.insert({
				user_id: Meteor.userId(),
				organisation_id: newOrganisationId
			});
		}
	}

});


Template.team.rendered = function () {

	TaskDragging();

	$('#tabs').tabs();
	$('textarea').autosize();

};