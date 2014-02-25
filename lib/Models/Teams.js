Teams = new Meteor.Collection('teams');
TeamsUsers = new Meteor.Collection('teams_users');

Team = function(options) {
	var lowestTeam = Teams.findOne({organisationId: options.organisationId}, {sort: {rank: 1}});
	var newRank = lowestTeam ? lowestTeam.rank - 1 : -1;

	_.defaults(options, {
		creatorId: Meteor.userId(),
		rank: newRank
	});

	Teams.insert(options);
};

Teams.helpers({
	removeAsModel: function() {
		var teamsUsers = TeamsUsers.find({userId: this._id});
		teamsUsers.forEach(function(teamsUser) {
			TeamsUsers.remove(teamsUser._id);
		});
		Teams.remove(this._id);
	},

	users: function() {
		return TeamsUsers.find({teamId: this._id}, {sort: {rank: 1}});
	}
});

TeamsUsers.helpers({
	user: function() {
		var user = Meteor.users.findOne(this.userId);
		return _.extend(user, _.omit(this, '_id'));
	}
});