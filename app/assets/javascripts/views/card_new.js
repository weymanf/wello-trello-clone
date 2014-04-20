window.Wello.Views.CardsNewView = Backbone.View.extend({
	template: JST["card/card_new"],

	initialize: function(options) {
		this.list = options.list;
	},

	events: {
		"click .card-new": "submit"
	},

	submit: function(event) {
		var list = this.list;
		event.preventDefault();
		var params = $(event.target.parentElement).serializeJSON()["card"];
		var newCard = new Wello.Models.Card(params);
		newCard.save({}, {
			success: function() {
				list.cards().add(newCard);
			}
		});

		$(event.currentTarget).prev().val("");
		$(event.currentTarget).closest(".cards-new-form").next().css("display","initial")
		$(event.currentTarget).closest(".cards-new-form").css("display","none")
	},

	render: function() {
		var cardNewContent = this.template({
			list: this.list
		});

		this.$el.html(cardNewContent);

		return this;
	}
	
})