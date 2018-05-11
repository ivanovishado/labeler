import json
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


LEFT_FILENAME = 'non-violent.txt'
RIGHT_FILENAME = 'violent.txt'
ID_FILENAME = 'id.txt'


def get_current_id():
    try:
        f = open(ID_FILENAME)
    except IOError:
        return 0
    else:
        with f:
            return int(f.read())


def get_element(id):
    with open('resources/lol.json') as f:
        data = json.load(f)
    values = list(data.values())
    if id < len(values):
        return list(data.values())[id]
    else:
        return {'title': 'No more elements', 'content': 'NO MORE!'}


@app.route("/")
def index():
    current_news = get_element(get_current_id())
    return render_template("index.html",
                           title=current_news['title'],
                           content=current_news['content'])


@app.route('/left')
def left():
    content = request.args.get('content', 0, type=str)
    print("Content=",content)
    write_to_file(LEFT_FILENAME, content=content)
    return get_update_data()


@app.route('/right')
def right():
    write_to_file(RIGHT_FILENAME, request.args.get('content', 0, type=str))
    return get_update_data()


def get_update_data():
    current_news = get_element(get_current_id())
    return jsonify(title=current_news['title'], content=current_news['content'])


def update_current_id():
    current_id = get_current_id()
    current_id += 1
    with open(ID_FILENAME, 'w') as f:
        f.write(str(current_id))


def write_to_file(filename, content):
    with open(filename, 'a') as f:
        f.write(content + '\n')
    update_current_id()


if __name__ == '__main__':
    app.run()
