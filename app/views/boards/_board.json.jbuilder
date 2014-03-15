json.(board, :id, :title, :created_at, :updated_at)

lists ||= nil
unless lists.nil?
  json.lists(lists) do |list|
    json.partial!("lists/list", :list => list)
  end
end