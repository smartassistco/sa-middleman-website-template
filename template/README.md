Website
=======

## Setup

### Requirements

- Ruby 3 (Using [RVM](https://rvm.io/) if possibe)
- Node.js 15 (Using [NVM](https://github.com/creationix/nvm#installation) if possible)
- [Yarn](https://yarnpkg.com/en/docs/install)

### Install Dependencies

- `gem install bundler`
- `bundle install`
- `yarn install`

## Running

### Start Server

- `bundle exec middleman` (Always use bundle exec so that the gem versions are picked up correctly)

### Build code

- `bundle exec middleman build`

## Development

### Change variables

- Change your project name, author and copyright in `package.json`
- Update the website hostname and title in `config.rb`
- Update the website title, description and cover image URL in `data/og.yml`
- Update the logo, favicon, cover and touch icons in `source/images/`
