from flask import Flask
from server.bp import bp

server = Flask(__name__, static_url_path='/sslgradechecker/server/static')
server.register_blueprint(bp, url_prefix='/sslgradechecker')
