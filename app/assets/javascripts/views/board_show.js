window.Wello.Views.BoardShowView = Backbone.CompositeView.extend({
	template: JST["board/board_show"],

	events: {
		"click .member-new": "addMember",
		"click .remove-board": "removeBoard"
	},

	addMember: function(event) {
		event.preventDefault();
		
		var newMember = $("#members-only").val();
		this.model.save({ newMemberEmail: newMember });
		$("#members-only").val("");
	},

	removeBoard: function() {
		this.model.destroy({
			success: function() {
				Backbone.history.navigate("", {trigger: true});
			}
		});
	},


	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.lists(), "add", this.addList)

		//ned has it don't know.
		// this.model.lists().each(this.addList.bind(this));

		var listNewView = new Wello.Views.ListNewView({
			board: this.model
		});
		this.addSubview(".list-new", listNewView);
	},

	addList: function(list) {
		var listsShowView = new Wello.Views.ListShowView({
			model: list
		});
		this.addSubview(".show-lists", listsShowView);
		listsShowView.render();
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