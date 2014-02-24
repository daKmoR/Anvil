Projects = new Meteor.Collection('projects');

Project = function(options) {
	var highestProject = Projects.findOne({organisationId: options.organisationId}, {sort: {rank: 1}});
	var newRank = highestProject && highestProject.rank ? highestProject.rank + 1 : 1;

	_.defaults(options, {
		creator: Meteor.userId(),
		rank: newRank
	});

	Projects.insert(options);
};