import json
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


DATA_FILENAME = 'scraped_articles.json'
LEFT_FILENAME = 'non-violent.txt'
RIGHT_FILENAME = 'violent.txt'
READ_ID_FILENAME = 'id.txt'
LEFT_COUNT_FILENAME = 'left-count.txt'
RIGHT_COUNT_FILENAME = 'right-count.txt'


def get_counter(filename):
    try:
        f = open(filename)
    except IOError:
        return 0
    else:
        with f:
            return int(f.read())


def get_element(id):
    with open(DATA_FILENAME) as f:
        data = json.load(f)
    values = list(data.values())
    if id < len(values):
        return list(data.values())[id]
    else:
        return {'title': 'No more elements', 'content': 'NO MORE!'}


@app.route("/")
def index():
    current_news = get_element(get_counter(READ_ID_FILENAME))
    return render_template("index.html",
                           title=current_news['title'],
                           content=current_news['content'])


@app.route('/left')
def left():
    assign_data_to_file(LEFT_FILENAME)
    update_counter(LEFT_COUNT_FILENAME)
    return get_update_data()


@app.route('/right')
def right():
    assign_data_to_file(RIGHT_FILENAME)
    update_counter(RIGHT_COUNT_FILENAME)
    return get_update_data()


@app.route('/skip')
def skip():
    update_counter(READ_ID_FILENAME)
    return get_update_data()


def assign_data_to_file(filename):
    write_to_file(filename, request.args.get('content', 0, str))
    update_counter(READ_ID_FILENAME)


def get_update_data():
    current_news = get_element(get_counter(READ_ID_FILENAME))
    return jsonify(title=current_news['title'], content=current_news['content'])


def update_counter(filename):
    counter = get_counter(filename)
    counter += 1
    with open(filename, 'w') as f:
        f.write(str(counter))


def write_to_file(filename, content):
    with open(filename, 'a') as f:
        f.write(content + '\n')


if __name__ == '__main__':
    app.run(debug=1)
