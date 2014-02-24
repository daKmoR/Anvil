Organisations = new Meteor.Collection('organisations');
OrganisationsUsers = new Meteor.Collection('organisations_users');

Organisation = function(options) {
	if (!Meteor.userId()) {
		return {};
	}

	var highestOrganisation = Organisations.findOne({}, {sort: {rank: 1}});
	var newRank = highestOrganisation && highestOrganisation.rank ? highestOrganisation.rank + 1 : 1;

	_.defaults(options, {
		creator: Meteor.userId()
	});

	if (options.name.length < 0) {
		return {};
	}

	var newOrganisationId = Organisations.insert(options);

	OrganisationsUsers.insert({
		userId: Meteor.userId(),
		organisationId: newOrganisationId,
		rank: newRank
	});

	return this;
};

Organisations.helpers({
	removeAsModel: function() {
		var organisationUsers = OrganisationsUsers.find({organisationId: this._id});
		organisationUsers.forEach(function(organisationUser) {
			OrganisationsUsers.remove(organisationUser._id);
		});
		Organisations.remove(this._id);
	},

	users: function() {
		return OrganisationsUsers.find({organisationId: this._id}, {sort: {rank: 1}});
	},

	teams: function() {
		return Teams.find({organisationId: this._id}, {sort: {rank: 1}});
	},

	projects: function() {
		return Projects.find({organisationId: this._id}, {sort: {rank: 1}});
	}
});

OrganisationsUsers.helpers({
	user: function() {
		return Meteor.users.findOne(this.userId);
	},

	organisation: function() {
		var organisation = Organisations.findOne({_id: this.organisationId});
		return _.extend(organisation, _.omit(this, '_id'));
	}
});