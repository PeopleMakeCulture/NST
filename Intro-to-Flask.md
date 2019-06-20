# Intro-to-Flask

docs: http://flask.pocoo.org/docs/1.0/quickstart/#quickstart

1. Create an instance of a WSGI  (Web Server Gateway Interface) server

```
from flask import Flask
app = Flask(__name__)
```

2. Define routes
```
@app.route('/')
def hello_world():
    return 'Hello, World!'
```

3. Run from Terminal (must export the FLASK_APP env variable)
- terminal should be running python3

- set up the virtual env first
```
. venv/bin/activate
pip install Flask
```
```
$ export FLASK_ENV=development
$ export FLASK_APP=app.py
$ flask run
```

## HTTP Methods

1. Flask routes default to get
2. For a POST route:
```
from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()
```
3. For a file (.jpg) on a POST route:
```
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@src/swim_dog.jpg" http://127.0.0.1:5000/images
```
## Testing POST with cURL

1. Req.body is json
```
curl -X POST -H "Content-Type: application/json" --data '{"key1":"value1", "key2":"value2"}' http://127.0.0.1:5000/login
```
2. Req.body is urlencoded form
```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" --data "param1=value1&param2=value2" <url>
```
3. Alternate Order
```
curl --data '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/login
```

## Accessing Req Data
- Flask provides the `request` object
- See API Docs: http://flask.pocoo.org/docs/1.0/api/#flask.Request


## Static Files

- Put your html, css, and js files here!
- For a file on filesystem as `static/style.css`:
```
url_for('static', filename='style.css')
```

## Rendering Templates
**this isn't working!**

- Flask configures the Jinja2 template engine for you

1. in your `app.py`:
```
from flask import render_template

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
```
2. In your templates directory:
(something like)
```
<!doctype html>
<title>Hello from Flask</title>
{% if name %}
  <h1>Hello {{ name }}!</h1>
{% else %}
  <h1>Hello, World!</h1>
{% endif %}
```

## Testing

- If you are doing something like unit testing, you will notice that code which depends on a request object will suddenly break because there is no request object. 
- The solution is creating a request object yourself and binding it to the context using the `test_request_context()` context manager. 
- In combination with the `with` statement it will bind a test request so that you can interact with it. 
1. Example with `with`:
```
from flask import request

with app.test_request_context('/hello', method='POST'):
    # now you can do something with the request until the
    # end of the with block, such as basic assertions:
    assert request.path == '/hello'
    assert request.method == 'POST'

The other possibility is passing a whole WSGI environment to the request_context() method:

from flask import request

with app.request_context(environ):
    assert request.method == 'POST'
```

1. Pass a whole WSGI enviornment to the request_context() method:
```
from flask import request

with app.request_context(environ):
    assert request.method == 'POST'
```


## Debug Mode
- This will:
1. activate the debugger
2. activate automatic reloader
3. enable debug mode on Flask app
```
$ export FLASK_ENV=development
$ flask run
```


## Deployment Options http://flask.pocoo.org/docs/1.0/deploying/#deployment
	- the above works for testing
	- Flask can deploy to: Heroku, Google App Engine, AWS Elastic Beanstalk, Azure
