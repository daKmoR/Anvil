Template.DefaultNavAside.organisationsAssigned = function() {
	return OrganisationsUsers.find({userId: Meteor.userId()}, {sort: {rankOrganisation: 1}});
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

Template.DefaultNavAside.rendered = function () {

	//ToDo: delay is a workaround as we currently use autopublish and we don't wait for the data before rendering
	_.delay(function() {
		$('.aside-users').sortable({
			items: '> .aside-user',
			//connectWith: '.aside-users',
			placeholder: 'task highlight',
			start: function() {
				$(document.body).addClass('user-dragging');
			},
			stop: function (event, ui) {
				var el = ui.item.get(0), before = ui.item.prev('.aside-user').get(0), after = ui.item.next('.aside-user').get(0), newSettings = {};
				newSettings.rank = SimpleRationalRanks.newRank(before, after);

				$(this).sortable('cancel');
				var organisationsUsers = OrganisationsUsers.findOne({organisationId: el.$ui.component.data().organisationId, userId: el.$ui.component.data().userId});
				OrganisationsUsers.update(organisationsUsers._id, {$set: newSettings});
				$(document.body).removeClass('user-dragging');
			}
		});
	}, 1000);

};