Template.DefaultNavAside.organisationsAssigned = function() {
	return OrganisationsUsers.find({userId: Meteor.userId()}, {sort: {rank: 1}});
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
		this.removeAsModel();
	},

	'keypress .new-project': function(event) {
		if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
			var area = $(event.target);
			new Project({
				name: area.val(),
				organisationId: this.organisationId
			});
			Textarea.reset(area);
		}
	},

	'keypress .new-team': function(event) {
		if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
			var area = $(event.target);
			new Team({
				name: area.val(),
				organisationId: this.organisationId
			});
			Textarea.reset(area);
		}
	}

});