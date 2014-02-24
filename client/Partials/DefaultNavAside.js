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
	return _.extend(organisation, _.omit(organisationsUsers, '_id'));
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
			new Organisation({name: area.val()});
			Textarea.reset(area);
		}
	},

	'click .remove-organisation': function(event) {
		//Organisations(this._id).remove();
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