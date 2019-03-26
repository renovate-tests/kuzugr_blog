require 'seed-fu'

namespace :db do
  desc 'insert seed data'
  task seed_fu: :environment do
    fixture_paths = Rails.root.join('db/fixtures').to_s

    SeedFu.seed(fixture_paths)
    exit
  end
end
