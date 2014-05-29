json.(card, :id, :title, :description, :rank, :list_id, :list)

items ||= nil

unless items.nil?
  json.array!(items) do |item|
    json.partial!('todo_items/todo_item', item: item)
  end
end