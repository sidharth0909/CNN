import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

TWITTER_BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")

def process_tweets(response):
    """ Enhanced tweet processing with better error handling """
    users = {u['id']: u for u in response.get('includes', {}).get('users', [])}
    media = {m['media_key']: m for m in response.get('includes', {}).get('media', [])}

    processed = []
    for tweet in response.get('data', []):
        try:
            user = users.get(tweet['author_id'], {})
            media_keys = tweet.get('attachments', {}).get('media_keys', [])
            
            tweet_data = {
                "id": tweet['id'],
                "text": tweet.get('text', ''),
                "date": datetime.strptime(tweet['created_at'], "%Y-%m-%dT%H:%M:%S.%fZ").isoformat(),
                "link": f"https://twitter.com/{user.get('username', '')}/status/{tweet['id']}",
                "user": {
                    "id": user.get('id', ''),
                    "name": user.get('name', 'Unknown'),
                    "username": user.get('username', 'unknown'),
                    "avatar": user.get('profile_image_url', '').replace('_normal', ''),
                },
                "stats": {
                    "comments": tweet.get('public_metrics', {}).get('reply_count', 0),
                    "retweets": tweet.get('public_metrics', {}).get('retweet_count', 0),
                    "likes": tweet.get('public_metrics', {}).get('like_count', 0),
                },
                "pictures": [media[mk]['url'] for mk in media_keys 
                           if media.get(mk, {}).get('type') == 'photo'],
                "videos": [media[mk]['preview_image_url'] for mk in media_keys 
                          if media.get(mk, {}).get('type') == 'video'],
            }
            processed.append(tweet_data)
        except KeyError as e:
            app.logger.error(f"Error processing tweet: {e}")
            continue
            
    return processed

@app.route('/api/tweets', methods=['GET'])
def get_tweets():
    try:
        if not TWITTER_BEARER_TOKEN:
            return jsonify({"error": "Server configuration error"}), 500

        query = request.args.get('q', '').strip()
        if not query:
            return jsonify({"error": "Search query is required"}), 400

        # Enhanced disaster-related query
        search_query = (
            f"({query}) (help OR relief OR rescue OR emergency OR volunteer OR donation) "
            f"-is:retweet -is:reply lang:en"
        )
        
        params = {
            'query': search_query,
            'max_results': 4,
            'expansions': 'author_id,attachments.media_keys',
            'tweet.fields': 'created_at,public_metrics,attachments,entities',
            'user.fields': 'name,username,profile_image_url',
            'media.fields': 'preview_image_url,url,type'
        }

        headers = {"Authorization": f"Bearer {TWITTER_BEARER_TOKEN}"}
        response = requests.get(
            "https://api.twitter.com/2/tweets/search/recent",
            headers=headers,
            params=params
        )

        if response.status_code != 200:
            error = response.json().get('detail', 'Unknown Twitter API error')
            return jsonify({"error": error}), response.status_code

        data = response.json()
        return jsonify(process_tweets(data))

    except Exception as e:
        app.logger.error(f"API Error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy", "version": "1.0.0"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)