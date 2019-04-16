# frozen_string_literal: true

module Articles
  class ArchiveResponseService
    def initialize(archives)
      @archives = archives
      @years = []
      archives.keys.each { |key| @years << key[0..3] }
      @years.uniq!
      @response = {}
    end

    def call
      initialize_response
      create_response
      @response
    end

    def initialize_response
      @years.each do |year|
        @response[year.to_sym] = { count: 0, monthly_archives: {} }
      end
    end

    def create_response
      @archives.each do |archive|
        key = archive[0][0..3].to_sym
        @response[key][:count] = @response[key][:count] + archive[1]
        @response[key][:monthly_archives][archive[0].to_sym] = archive[1]
      end
    end
  end
end