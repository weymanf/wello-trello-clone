class RemoveRankFromCards < ActiveRecord::Migration
  def change
    remove_column :cards, :rank
  end
end
