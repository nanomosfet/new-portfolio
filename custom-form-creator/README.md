# Readme for form creator app

Front end build pipeline currently includes:
1. npm (Package Manager)
2. webpack (Module Bundler)
3. Babel (JavaScript Compiler)
4. Sass and CSS Compilers for Bootstrap
5. Jest for snapshot testing

Backend Server is a simple Flask App that serves the front end.


## Getting started with this code

1. Clone this repository
2. Install npm. [npm install instructions](https://docs.npmjs.com/getting-started/installing-node)
3. Install pip. [pip install instructions](https://pip.pypa.io/en/stable/installing/)
4. run `npm install` in the root of the directory.
5. run `pip install flask`
6. run `npm run build`. This will build the front end 
7. Add the needed Flask environment variables. `export FLASK_APP=server/app.py` and `export FLASK_DEBUG=1`
8. Run `flask run`. This should start up the flask server that will host the front end. You should see your app on [localhost:5000](localhost:5000) now unless you changed the default port of flask to run on
9. Look through the web page!


## Testing

1. Run `npm run test`
