require 'cuba'
require 'cuba_api'
require 'cuba_api/cors'
require 'cuba/send_file'
require 'rack/protection'
require 'logger'

Cuba.use Rack::Session::Cookie, :secret => "4d4249b67c3276f5ee6fb0df413bfd9d60a72581522fbc3a26ab057343192cc12869a20b84787e8859060be5b0d49317a4d6d1a542bbf891fe6bf8667fbe0cf2"

Cuba.plugin CubaApi::Config
Cuba.plugin CubaApi::Cors
Cuba.plugin SendFile

Cuba.cors_setup do |cors|
  cors.expose = 'x-requested-with' # default: nil
  cors.headers = 'Access-Control-Allow-Origin=*'
end

logger = Logger.new('logs/production.log')

Cuba.define do
  on_cors do
    on root do
      on get do
        res.write 'Hello World!'
      end

      on post do
        on param('file') do |file|
          input_path = file[:tempfile].path
          output_file_name = %x[phantomjs ./codescreenshot.js #{input_path} 2>&1]

          send_file(output_file_name.chomp)
        end
      end
    end
  end
end