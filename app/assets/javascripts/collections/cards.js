window.Wello.Collections.Cards = Backbone.Collection.extend({
	initialize: function(models, options) {
		this.list = options.list;
	},

	url: function () {
		return '/lists/' + this.list.id + '/cards';
	},

	comparator: function(card) {
		return card.get("rank");
	},

	model: Wello.Models.Card
})