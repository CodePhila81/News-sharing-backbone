var app = app || {};

(function () {
	'use strict';

	app.Newsitem = Backbone.Model.extend({
		// Default attributes for the news item
		defaults: {
			username: '',
			url: '',
			description: ''
		}
	});
})();
