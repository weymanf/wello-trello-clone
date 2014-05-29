json.array!(@items) do |item|
  json.partial!('todo_items/todo_item', item: item, card: @card)
end