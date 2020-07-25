# frozen_string_literal: true

config[:hostname] = 'https://website.example'
config[:website_title] = 'Website Title'

set :url_root, config[:hostname] # For sitemap plugin

activate :search_engine_sitemap,
         exclude_attr: 'sitemap_excluded',
         exclude_if: lambda { |resource|
           resource.path == 'google_verification.html'
         }

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

activate :directory_indexes

activate :ogp do |ogp|
  ogp.namespaces = {
      og: data.ogp.og,
      fb: data.ogp.fb
  }
  ogp.base_url = config[:hostname]
  ogp.auto = %w[title url description]
end

configure :development do
  activate :livereload
end

configure :build do
  activate :minify_html do |html|
    html.remove_form_attributes = false
    html.remove_input_attributes = false
  end

  activate :asset_hash
end

activate :external_pipeline,
         name: :webpack,
         command: build? ? 'npm run build' : 'npm run start',
         source: '.tmp/dist',
         latency: 1
