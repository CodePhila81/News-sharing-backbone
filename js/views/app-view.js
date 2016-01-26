/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '.newsapp',

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click .submit-news-item': 'createOnSubmit'
		},

		// At initialization we bind to the relevant events on the `newsitems`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function () {
			this.$inputUsername = this.$('.new-name');
			this.$inputLink = this.$('.new-link');
			this.$inputDesc = this.$('.new-desc');
			this.$main = this.$('.main');
			this.$list = $('.news-list');

			//app.newsitems
			this.listenTo(app.newsitems, 'add', this.addOne);
			this.listenTo(app.newsitems, 'reset', this.addAll);
			/*this.listenTo(app.todos, 'add', this.addOne);
			this.listenTo(app.todos, 'reset', this.addAll);
			this.listenTo(app.todos, 'change:completed', this.filterOne);
			this.listenTo(app.todos, 'filter', this.filterAll);
			this.listenTo(app.todos, 'all', _.debounce(this.render, 0));*/

			// Suppresses 'add' events with {reset: true} and prevents the app view
			// from being re-rendered for every model. Only renders when the 'reset'
			// event is triggered at the end of the fetch.
			app.newsitems.fetch({reset: true}); // **?
			console.log('initialized app.AppView');
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {

			if (app.newsitems.length) {
				this.$main.show();
			} else {
				this.$main.hide();
			}

		},

		// Add a single news item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (newsitem) {
			//var view = new app.TodoView({ model: todo });
			console.log('in app.AppView.addOne()');
			//var view = new app.NewsitemView({ model: app.Newsitem }); // **?
			var view = new app.NewsitemView({ model: newsitem });
			this.$list.append(view.render().el);
		},

		// Add all items in the **newsitems** collection at once.
		addAll: function () {
			this.$list.html('');
			app.newsitems.each(this.addOne, this);
		},

		// Generate the attributes for a new news item.
		newAttributes: function () {
			console.log('in app.AppView.newAttributes()');
			return {
				username: this.$inputUsername.val().trim(),
				url: this.$inputLink.val().trim(),
				description: this.$inputDesc.val().trim()
				//order: app.todos.nextOrder(),
			};
		},

		// If you hit submit on the form, create new **Newsitem** model,
		// persisting it to *localStorage*.
		createOnSubmit: function (e) {
			e.preventDefault();
			console.log('in app.AppView.createOnSubmit(), abt to create model');
			app.newsitems.create(this.newAttributes());
			console.log('in app.AppView.createOnSubmit(), created model');
			this.$inputUsername.val('');
			this.$inputLink.val('');
			this.$inputDesc.val('');
		},

	});
})(jQuery);
