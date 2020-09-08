module ExternalLink
  def external_link(*args, &block)
    options_index = block_given? ? 1 : 2

    options = args[options_index] || {}

    options[:target] = '_blank'

    option_class = 'ln-ex'

    if options.key?(:class)
      options[:class] << ' ' << option_class
    else
      options[:class] = option_class
    end

    options_rel = 'noopener noreferrer'

    if options.key?(:rel)
      options[:rel] << ' ' << options_rel
    else
      options[:rel] = options_rel
    end

    args[options_index] = options

    link_to(*args, &block)
  end
end
