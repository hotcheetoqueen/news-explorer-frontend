module.exports.MAIN_API_URL = 'https://api.hotcheetonews.students.nomoreparties.site';
// module.exports.MAIN_API_URL = 'http://localhost:3001';

module.exports.NEWS_API_KEY = 'd7bd606001134726ac4c37d3e059e1b6';
module.exports.NEWS_API_URL = 'http://newsapi.org';
module.exports.PROXY_NEWS_API_URL = 'https://nomoreparties.co/news';

module.exports.NEWS_TIMEFRAME = 7 * 24 * 3600 * 1000;
module.exports.NEWS_ERRORS = {
    server: 'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.',
    keyword: 'Please enter a keyword',
}