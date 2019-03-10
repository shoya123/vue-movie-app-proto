let storage = {
  apiKey: 'f2e9895481abedb65290e30543384cfb',
  sessionId: localStorage.getItem('session_id') || null,
  userId: localStorage.getItem('user_id') || null,
  language: 'ja',
  pageTitlePostfix: ' — ' + document.title,
  listTypes: [
    {
      title: '人気の映画',
      shortTitle: '人気',
      query: 'popular',
      type: 'collection',
      isCategory: true
    },
    {
      title: '高評価の映画',
      shortTitle: '高評価',
      query: 'top_rated',
      type: 'collection',
      isCategory: true
    },
    {
      title: '公開予定の映画',
      shortTitle: '公開予定',
      query: 'upcoming',
      type: 'collection',
      isCategory: true
    },
    {
      title: '公開中の映画',
      shortTitle: '公開中',
      query: 'now_playing',
      type: 'collection',
      isCategory: true
    },
    {
      title: '検索結果',
      query: 'search',
      isCategory: false
    },
    {
      title: 'タグで検索',
      query: 'discover',
      isCategory: false
    },
    {
      title: 'あなたのお気に入りの映画',
      query: 'favorite',
      isCategory: false
    }
  ],
  categories: {},
  // https://developers.themoviedb.org/3/discover/movie-discover
  discoverType: [
    'sort_by',
    'certification_country',
    'certification',
    'certification.lte',
    'include_adult',
    'include_video',
    'page',
    'primary_release_year',
    'primary_release_date.gte',
    'primary_release_date.lte',
    'release_date.gte',
    'release_date.lte',
    'vote_count.gte',
    'vote_count.lte',
    'vote_average.gte',
    'vote_average.lte',
    'with_cast',
    'with_crew',
    'with_companies',
    'with_genres',
    'with_keywords',
    'with_people',
    'year',
    'without_genres',
    'with_runtime.gte',
    'with_runtime.lte',
    'with_release_type',
    'with_original_language',
    'without_keywords'
  ],
  genres: {
    '12': 'アドベンチャー',
    '14': 'ファンタジー',
    '16': 'アニメーション',
    '18': 'ドラマ',
    '27': 'ホラー',
    '28': 'アクション',
    '35': 'コメディ',
    '36': '履歴',
    '37': '西洋',
    '53': 'スリラー',
    '80': '犯罪',
    '99': 'ドキュメンタリー',
    '878': 'サイエンスフィクション',
    '9648': '謎',
    '10402': '音楽',
    '10749': 'ロマンス',
    '10751': 'ファミリー',
    '10752': '戦争',
    '10770': 'テレビ映画'
  },
  // For Browser History
  backTitle: '',
  moviePath: '',
  createMoviePopup: false,
  moviePopupOnHistory: false
};

// Create categories titles
storage.listTypes.forEach(function(listType){
  storage.categories[listType.query] = listType.title;
});

storage.util = {
  makeMergeObj (a, b) {
    let result = Object.assign({}, a);
    Object.keys(b).forEach(function(key) {
      result[key] = b[key];
    });
    return result;
  }
};


export default storage;
