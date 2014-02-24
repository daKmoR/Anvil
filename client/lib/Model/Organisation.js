Organisation = function(options) {
	// constructor
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