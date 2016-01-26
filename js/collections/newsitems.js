var app = app || {};

(function () {
	'use strict';

	var Newsitems = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Newsitem,

		// Save all of the news items under this example's namespace.
		// **?
		localStorage: new Backbone.LocalStorage('newsitems-backbone'),

		// We keep the news items in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			return this.length ? this.last().get('order') + 1 : 1; // **?
		},

		comparator: 'order'
	});

	// Create our global collection of **Newsitems**.
	app.newsitems = new Newsitems();
	console.log('Just created newsitems, app.newsitems.length='+app.newsitems.length);
})();
