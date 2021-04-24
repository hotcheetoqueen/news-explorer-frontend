import { NEWS_API_KEY, NEWS_API_URL, PROXY_NEWS_API_URL, NEWS_TIMEFRAME } from './constants';

class NewsApi {
    constructor(article)  {
        this.apiKey = article.apiKey;
        this.newsApiUrl = article.newsApiUrl;
        this.proxyApiUrl = article.proxyApiUrl;
        this.now = article.now;
        this.pastWeek = article.pastWeek;
    }

    getArticles(keyword) {
        return fetch(
            `${this.proxyApiUrl}/v2/everything?q=${keyword}`
                + `&from=${this.pastWeek.toISOString()}`
                + `&to=${this.now.toISOString()}`
                + `&sortBy=popularity&pageSize=100&apiKey=${this.apiKey}`,
            {
                headers: {
                    'Content-Type': 'application/json',
            },
        },
    )
    .then((res) => { if (res.ok) {
        return res.json();
    }})
    .then((data) => data.articles);
    }
}

const newsApi = new NewsApi({
    newsApiUrl: NEWS_API_URL,
    apiKey: NEWS_API_KEY,
    now: new Date(),
    pastWeek: new Date(Date.now() - NEWS_TIMEFRAME),
    proxyApiUrl: PROXY_NEWS_API_URL,
});

export default newsApi;