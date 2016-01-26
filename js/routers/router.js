/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var NewsRouter = Backbone.Router.extend({
		/*routes: {
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			// Set the current filter to be used
			app.TodoFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of Todo view items
			app.todos.trigger('filter');
		}*/
	});

	app.NewsRouter = new NewsRouter();
	Backbone.history.start();
})();
