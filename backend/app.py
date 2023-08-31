from flask import Flask, request, jsonify
from flask_cors import CORS
from scrape_synonyms import scrape_synonyms

app = Flask(__name__)
CORS(app)

@app.route('/api/scrape-synonyms', methods=['GET'])
def get_synonyms():
    word = request.args.get('word')
    synonyms = scrape_synonyms(word)
    return jsonify(synonyms)

if __name__ == '__main__':
    app.run()