Template.DefaultNavAside.joinWithUser = function() {
	var organisationsUsers = this;
	var user = Meteor.users.findOne({_id: organisationsUsers.userId});
	return _.extend(organisationsUsers, _.omit(user, '_id'));
};

Template.DefaultNavAside.usersInOrganisation = function() {
	var organisationsUsers = this;
	return OrganisationsUsers.find({
		organisationId: organisationsUsers.organisationId
	}, {
		sort: { rank: 1 }
	});
};

Template.DefaultNavAside.projectsInOrganisation = function() {
	var organisation = this;
	return Projects.find({
		organisationId: organisation.organisationId
	}, {
		sort: { rank: 1 }
	});
};

Template.DefaultNavAside.teamsInOrganisation = function() {
	var organisation = this;
	return Teams.find({
		organisationId: organisation.organisationId
	}, {
		sort: { rank: 1 }
	});
};

Template.DefaultNavAside.joinWithOrganisation = function() {
	var organisationsUsers = this;
	var organisation = Organisations.findOne({_id: organisationsUsers.organisationId});
	return _.extend(organisationsUsers, _.omit(organisation, '_id'));
};

Template.DefaultNavAside.organisationsAssigned = function() {
	return OrganisationsUsers.find({
		userId: Meteor.userId()
	}, {
		sort: { rank: 1 }
	});
};

Template.DefaultNavAside.events({

	'keypress .new-organisation': function(event) {
		if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
			var area = $(event.target);
			var newOrganisationId = Organisations.insert({
				name: area.val()
			});

			OrganisationsUsers.insert({
				userId: Meteor.userId(),
				organisationId: newOrganisationId
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
	},

	'keypress .new-team': function(event) {
		if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
			var area = $(event.target);
			var organisationId = $(area.parents('.organisation')[0]).data('organisation-id');

			Teams.insert({
				name: area.val(),
				organisationId: organisationId
			});

			Textarea.reset(area);
		}
	}


});