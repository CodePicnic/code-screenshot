# Code Screenshot

Handy tool to create screenshots from code snippets.

## Requirements

* [PhantomJS](http://phantomjs.org)
* [Ruby](https://www.ruby-lang.org)

# Installation

```bash
git clone https://github.com/CodePicnic/code-screenshot.git
cd code-screenshot
bundle install
puma config.ru # or: rackup config.ru
```

# Usage

```bash
curl -F file=@path/to/my/file.ext https://codepicnic-code-screenshot.herokuapp.com/ > code.png
```