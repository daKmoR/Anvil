Template.DefaultNavAside.joinWithUser = function() {
	var organisationsUsers = this;
	var user = Meteor.users.findOne({_id: organisationsUsers.user_id});
	return _.extend(organisationsUsers, _.omit(user, '_id'));
};

Template.DefaultNavAside.usersInOrganisation = function() {
	var organisationsUsers = this;
	return OrganisationsUsers.find({
		organisation_id: organisationsUsers.organisation_id
	}, {
		sort: { rank: 1 }
	});
};

Template.DefaultNavAside.joinWithOrganisation = function() {
	var organisationsUsers = this;
	var organisation = Organisations.findOne({_id: organisationsUsers.organisation_id});
	return _.extend(organisationsUsers, _.omit(organisation, '_id'));
};

Template.DefaultNavAside.organisationsAssigned = function() {
	return OrganisationsUsers.find({
		user_id: Meteor.userId()
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