from flask import Flask
from bp import bp

app = Flask(__name__, static_url_path='/customformcreator/server/static')
app.register_blueprint(bp, url_prefix='/customformcreator')