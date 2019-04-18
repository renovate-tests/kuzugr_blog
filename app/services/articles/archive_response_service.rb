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
      response = []
      @response.each { |res| response << res[1] }
      response
    end

    def initialize_response
      @years.each do |year|
        @response[year] = { year: year, count: 0, monthly_archives: [] }
      end
    end

    def create_response
      @archives.each do |archive|
        # NOTE: @archives = { '2019/04' => 1, '2019/05' => 3 }
        #       archive[0] = '2019/04'
        #       archive[1] = 1
        year = archive[0][0..3]
        @response[year][:count] = @response[year][:count] + archive[1]
        @response[year][:monthly_archives] << { month: archive[0], count: archive[1]}
      end
    end
  end
end