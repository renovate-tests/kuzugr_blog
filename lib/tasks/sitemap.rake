# frozen_string_literal: true

namespace :sitemap do
  desc 'create sitemap.xml'
  task create: :environment do
    create_path = Rails.root.join('sitemap.xml')
    File.open(create_path, 'w') do |file|
      file.puts('<?xml version="1.0" encoding="UTF-8"?>')
      file.puts('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
      path_list.each do |path|
        file.puts('  <url>')
        file.puts("    <loc>#{ENV['CORS_ALLOW_HOST']}#{path}</loc>")
        file.puts("    <lastmod>#{Time.zone.today.strftime('%Y-%m-%d')}</lastmod>")
        file.puts('    <changefreq>daily</changefreq>')
        file.puts('    <priority>1.0</priority>')
        file.puts('  </url>')
      end
      file.puts('</urlset>')
    end
    FileUtils.cp(create_path, ENV['SITEMAP_PATH'])
  end

  private
  def path_list
    article_ids = Article.where(published: true).ids
    paths = []
    # TOP
    paths << ''
    # プロフィール
    paths << '/profile'
    # お問い合わせ
    paths << '/contact'
    # プライバシーポリシー
    paths << '/privacy-policy'
    # 記事
    article_ids.each do |article_id|
      paths << "/article/#{article_id}"
    end
    paths
  end
end