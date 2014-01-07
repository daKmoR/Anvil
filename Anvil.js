Tasks = new Meteor.Collection('tasks');
Projects = new Meteor.Collection('projects');

if (Meteor.isClient) {
	Template.team.projects = function() {
		return Projects.find({}, {sort: {rank: 1}});
	};

	Template.team.tasks = function() {
		return Tasks.find({}, {sort: {rank: 1}});
	};

	Template.team.tasks_unassigned = function() {
		return Tasks.find({assigned: undefined}, {sort: {rank: 1}});
	};

	Template.team.users = function() {
		return Meteor.users.find();
	};

	Template.team.assigned_tasks = function(userId) {
		return Tasks.find({assigned: userId}, {sort: {rank: 1}});
	};

	Template.team.events({
		'keypress .new-task': function(event) {
			if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
				var textarea = $(event.target);

				if (textarea.val().length > 0 && Meteor.userId()) {
					var toRankElement = Tasks.findOne({}, {sort: {rank: -1}});
					var newRank = toRankElement ? toRankElement.rank : 0;
					newRank += 1;
					Tasks.insert({
						name: textarea.val(),
						creator: Meteor.userId(),
						rank: newRank
					});
				}
				$(textarea).blur();
				$(textarea).val(''); //reset textarea
				Meteor.setTimeout(function() {
					$(textarea).focus();
				}, 10); // fanzy enough we have to wait a split second or the cursor and whitespaces will stay
			}
		},

		'click .remove-task': function() {
			Tasks.remove(this._id)
		}

	});

	Template.task_detail.events({
		'keypress .new-task-message': function(event, el, bla) {
			if (event.keyCode === 13 && event.shiftKey === false) { //Enter without shift
				var textarea = $(event.target);
				Tasks.update(this._id, { $push: { messages: textarea.val() }});
				$(textarea).blur();
				$(textarea).val(''); //reset textarea
				Meteor.setTimeout(function() {
					$(textarea).focus();
				}, 10); // fanzy enough we have to wait a split second or the cursor and whitespaces will stay
			}
		}
	});

	SimpleRationalRanks = {
		beforeFirst: function(firstRank) {
			return firstRank - 1;
		},
		between: function(beforeRank, afterRank) {
			return (beforeRank + afterRank) / 2;
		},
		afterLast: function(lastRank) {
			return lastRank + 1;
		}
	};

	UI.body.rendered = function() {

		$('.sortable').sortable({
			items: '> div.task',
			connectWith: '.sortable',
			stop: function(event, ui) {
				var el = ui.item.get(0),
						before = ui.item.prev('div.task').get(0),
						after = ui.item.next('div.task').get(0);

				var newAssigned = $(el).parent().data('user-id');
				if (newAssigned !== el.$ui.data().assigned) {
					$(this).sortable('cancel');
					Tasks.update(el.$ui.data()._id, {$set: {assigned: newAssigned}});
				}

				var newRank;
				if (!before && !after) {
					newRank = el.$ui.data().rank;
				} else if (!before) { //moving to the top of the list
					newRank = SimpleRationalRanks.beforeFirst(after.$ui.data().rank);
				} else if (!after) {
					newRank = SimpleRationalRanks.afterLast(before.$ui.data().rank);
				} else {
					newRank = SimpleRationalRanks.between(before.$ui.data().rank, after.$ui.data().rank);
				}
				Tasks.update(el.$ui.data()._id, {$set: {rank: newRank}});
			}
		});

		$(document).foundation(function (response) {
			console.log(response.errors);
		});

		$('textarea').autosize();

	}

}

if (Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup

		//Meteor.users.update({_id: 'b3rCTrWY8kNfswQKN'}, {$set: { profile: { name: 'Birgit' }}});
		//Meteor.users.update({_id: 'pmAJR79vwnXQ9h6NY'}, {$set: { profile: { name: 'Thomas' }}});
	});

}




