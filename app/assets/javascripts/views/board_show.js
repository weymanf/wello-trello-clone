window.Wello.Views.BoardShowView = Backbone.CompositeView.extend({
	template: JST["board/board_show"],


	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
		// this.listenTo(this.model.lists(), "add", addList)

		var listNewView = new Wello.Views.ListNewView({
			board: this.model
		});
		this.addSubview(".list-new", listNewView);
	},

	addList: function(list) {

	},

	render: function() {
		var showContent = this.template({
			board: this.model
		});
		this.$el.html(showContent);
		
		this.renderSubviews();
		return this;
	}

})