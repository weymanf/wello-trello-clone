window.Wello.Collections.Cards = Backbone.Collection.extend({
	url: "",

	comparator: function(card) {
		return card.get("rank");
	},

	model: Wello.Models.Card
})