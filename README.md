# Clone of Trello Clone

This project was based off Simon Chaffetz's final project, which he called [Trellino](http://trellino.herokuapp.com/).

Basics
------
+ Rails and Backbone.js application with jQuery UI for drag and drop functionality.
+ Underscore for convenience.
+ Font Awesome for icons.
+ Custom `destroy`/`sync` (Backbone) to accommodate URL structure of shallow nested resources.

Known Issues
------------
+ View names should be pluralized (BoardsIndex, ListsShow, etc.)
+ Rename nested resources (board_lists.js, etc.)
+ Should namespace entire project.

Nefarious Future Plans
----------------------
+ Only require the necessary parts of jQuery UI.
+ Add to-do items to lists.
+ Add multiple users to a board.
+ Override Backbone `create` and remove kludgy showUrl() method.
+ Clean up CSS ids (use data-* instead)

References
----------
+ Overriding Backbone's [destroy](http://stackoverflow.com/q/15093037)
+ Overriding Backbone's [sync](http://stackoverflow.com/q/6986914)