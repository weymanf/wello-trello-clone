# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
# 
# Examples:
# 
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.create!(
  {email: 'thebard@theglobe.com', password: 'secretsonnetlover'},
)

user.reset_session_token!

boards = Board.create!([
  {title: "Home"}, #1
  {title: "Work"} #2
])

board_assignments = BoardAssignment.create!([
  {user_id: 1, board_id: 1},
  {user_id: 1, board_id: 2}
])

lists = List.create!([
  #Home: board 1
  {board_id: 1, rank: 1, title: "To Do", }, #1
  {board_id: 1, rank: 2, title: "Doing"}, #2
  {board_id: 1, rank: 3, title: "Done"}, #3
  #Work: board 2
  {board_id: 2, rank: 1, title: "Urgent", }, #4
  {board_id: 2, rank: 2, title: "Important"}, #5
  {board_id: 2, rank: 3, title: "Optional"} #6
])

cards = Card.create!([
  #To Do: List 1 on Home
  {list_id: 1, rank: 1, title: "Determine whether world really is a stage", description: "follow-up: determine whether we are all players"},
  {list_id: 1, rank: 2, title: "Figure out when my birthday is"},
  #Doing: List 2 on Home
  {list_id: 2, rank: 1, title: "Poach deer on Thomas Lucy's estate"},
  #Done: List 3 on Home
  {list_id: 3, rank: 1, title: "Marry Anne Hathaway", description: "not that one"},
  {list_id: 3, rank: 2, title: "Name first-born son Hamnet"},
  
  #Urgent: List 4 on Work
  {list_id: 4, rank: 1, title: "Get everyone to call me The Bard"},
  {list_id: 4, rank: 2, title: "Write Hamlet", description: "follow-up: get monkeys with typewriters to write Hamlet"},
  #Important: List 5 on Work
  {list_id: 5, rank: 1, title: "Write Romeo and Juliet", description: "include thumb-biting"},
  {list_id: 5, rank: 2, title: "Write Macbeth"},
  #Optional: List 6 on Work
  {list_id: 6, rank: 1, title: "Write A Midsummer Night's Dream", description: "include an ass"},
  {list_id: 6, rank: 2, title: "Write Troilus and Cressida"}
])