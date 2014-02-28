Statuses = [
	{ _id: 10, name: 'New',                      is10: function() { return true; }, is20: function() { return false; }, is30: function() { return false; }, is40: function() { return false; }, is50: function() { return false; } },
	{ _id: 20, name: 'Needs Feedback',           is10: function() { return false; }, is20: function() { return true; }, is30: function() { return false; }, is40: function() { return false; }, is50: function() { return false; } },
	{ _id: 30, name: 'Accepted',                 is10: function() { return false; }, is20: function() { return false; }, is30: function() { return true; }, is40: function() { return false; }, is50: function() { return false; } },
	{ _id: 40, name: 'Needs Technical Feedback', is10: function() { return false; }, is20: function() { return false; }, is30: function() { return false; }, is40: function() { return true; }, is50: function() { return false; } },
	{ _id: 50, name: 'Under Review',             is10: function() { return false; }, is20: function() { return false; }, is30: function() { return false; }, is40: function() { return false; }, is50: function() { return true; } }
];