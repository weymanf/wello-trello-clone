json.(list, :id, :title, :rank, :board_id, :created_at, :updated_at, :board)

cards ||= nil

unless cards.nil?
  json.array!(cards) do |card|
    json.partial!('cards/card', card: card)
  end
end