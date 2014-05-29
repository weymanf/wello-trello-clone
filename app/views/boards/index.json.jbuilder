json.array!(@boards) do |board|
  json.partial!('boards/board', board: board)
end