require 'csv'

Category.transaction do
  CSV.foreach(Rails.root.join('db', 'master_data', 'categories.csv'), headers: true) do |row|
    attrs    = row.to_h.symbolize_keys
    category = Category.find_by(id: attrs[:id])
    Category.create!(attrs) unless category
  end
end
