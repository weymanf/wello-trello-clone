class ChangeListRankToFloat < ActiveRecord::Migration
  def change
    remove_column :lists, :rank
    add_column :lists, :rank, :float
  end
end
