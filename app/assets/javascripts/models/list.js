window.Wello.Models.List = Backbone.Model.extend({
	cards: function () {
		if (!this._cards) {
			this._cards = new Wello.Collections.Cards([], {
				list: this
			})
		}
		return this._cards;
	},

	parse: function (jsonResp) {
		if (jsonResp.cards) {
			this.cards().set(jsonResp.cards);
			delete jsonResp.cards;
		}
		return jsonResp;
	}
	
})