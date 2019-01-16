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
      title: 'あなたのお気に入りの映画',
      query: 'favorite',
      isCategory: false
    }
  ],
  categories: {},
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

export default storage;
