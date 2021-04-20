// const months = ['January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December'];

// module.exports.formatDate = (published) => {
//   const [year, month] = published.split('-');
//   const [day] = published.split('-')[2].split('T');
//   return `${months[month - 1]} ${day}, ${year}`;
// };

  const rankKeywords = (cards) => {
    const counts = {};
    
    cards.forEach((card) => {
      counts[card.keyword] = counts[card.keyword]
        ? counts[card.keyword] + 1
        : 1;
    });

    let keywordsRanked = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    keywordsRanked = keywordsRanked.map(
      (word) => word[0].toUpperCase() + word.slice(1),
    );

    return keywordsRanked;
  };
  
  module.exports.buildKeywordList = (cards) => {
    const words = rankKeywords(cards);
    let keywordList;

    if (words.length === 1) {
      [keywordList] = words;
    } else if (words.length === 2) {
      keywordList = `${words[0]} and ${words[1]}`;
    } else if (words.length === 3) {
      keywordList = `${words[0]}, ${words[1]} and ${words[2]}`;
    } else {
      keywordList = `${words[0]}, ${words[1]} and ${words.length - 2} other${
        words.length - 2 !== 1 ? 's' : ''
      }`;
    }
    return keywordList;
  };
  
  module.exports.rankKeywodPopularity = (cards) => {
    const popularity = rankKeywords(cards);
    const sortPopularity = (a, b) => popularity.indexOf(a.keyword) - popularity.indexOf(b.keyword);
    cards.sort(sortPopularity);

    return cards;
  };