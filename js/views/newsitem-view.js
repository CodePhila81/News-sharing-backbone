/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// News Item View
	// --------------

	// The DOM element for a news item...
	app.NewsitemView = Backbone.View.extend({
		//... is a list tag.
		tagName:  'li',

		// Cache the template function for a single item.
		template: _.template($('#newsitem-template').html()),

		// The DOM events specific to an item.
		events: {
			//'click .toggle': 'toggleCompleted',
			//'dblclick label': 'edit',
			'click .destroy': 'clear',
			//'keypress .edit': 'updateOnEnter',
			//'keydown .edit': 'revertOnEscape',
			//'blur .edit': 'close'
		},

		// The NewsitemView listens for changes to its model, re-rendering. Since
		// there's a one-to-one correspondence between a **Newsitem** and a
		// **NewsitemView** in this app, we set a direct reference on the model for
		// convenience.
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		// Re-render the titles of the todo item.
		render: function () {
			// Backbone LocalStorage is adding `id` attribute instantly after
			// creating a model.  This causes our TodoView to render twice. Once
			// after creating a model and once on `id` change.  We want to
			// filter out the second redundant render, which is caused by this
			// `id` change.  It's known Backbone LocalStorage bug, therefore
			// we've to create a workaround.
			// https://github.com/tastejs/todomvc/issues/469
			/*if (this.model.changed.id !== undefined) {
				return;
			}*/ // **?

      console.log('in app.NewsitemView.render()');
      //alert(this.model);
			this.$el.html(this.template(this.model.toJSON()));
			//this.$el.toggleClass('completed', this.model.get('completed'));
			//this.toggleVisible();
			//this.$input = this.$('.edit');
			return this;
		},
		
		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function () {
			this.model.destroy();
		}
	});
})(jQuery);
