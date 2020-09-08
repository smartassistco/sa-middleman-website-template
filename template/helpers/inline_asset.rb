module InlineAsset
  def inline_asset(*args)
    args.map do |arg|
      sitemap.resources.find { |res| res.source_file.match(arg) }.render
    end.join("\n")
  end
end
