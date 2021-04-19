import { NEWS_API_KEY, NEWS_API_URL, PROXY_NEWS_API_URL } from './constants';

class NewsApi {
    constructor({ baseUrl, headers, apiKey, newsApiUrl, proxyApiUrl })  {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this.apiKey = apiKey;
        this.newsApiUrl = newsApiUrl;
        this.proxyApiUrl = proxyApiUrl;
    }

    getArticles(keyword) {
        return fetch(
            `${this.proxyApiUrl}/v2/everything?q=${keyword}`
                + `&from=${this.lastWeek.toISOString()}`
                + `&to=${this.today.toISOString()}`
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
    today: new Date(),
    lastWeek: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
    proxyApiUrl: PROXY_NEWS_API_URL,
});

export default newsApi;