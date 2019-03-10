<template>
  <vuescroll ref="dvs">
    <div class="detail-panel">
      <section class="movie">
        <div class="movie__container" v-if="movieLoaded">
          <header class="movie__header" :style="{ 'background-image': 'url(' + movieBackdropSrc + ')' }">
            <div class="movie__wrap movie__wrap--header">
              <figure class="movie__poster">
                <img v-if="moviePosterSrc" class="movie__img" src="~assets/placeholder.png" v-img="moviePosterSrc">
                <img v-if="!moviePosterSrc" class="movies-item__img is-loaded" src="~assets/no-image.png">
              </figure>
              <div class="movie__title">
                <h1 class="movie__title-text">
                  {{ movie.title }}
                  <span v-if="movie.tagline">{{ movie.tagline }}</span>
                </h1>
              </div>
            </div>
          </header>
          <div class="movie__main">
            <div class="movie__wrap movie__wrap--main">
              <div class="movie__actions" v-if="userLoggedIn && favoriteChecked">
                <a href="#" class="movie__actions-link" :class="{'active' : favorite === true}" @click.prevent="toggleFavorite">
                  <svg class="movie__actions-icon" :class="{'waiting' : favorite === ''}">
                    <use xlink:href="#iconFavorite"></use>
                  </svg>
                  <span class="movie__actions-text" v-if="favorite === ''">Wait...</span>
                  <span class="movie__actions-text" v-else-if="favorite">Marked as Favorite</span>
                  <span class="movie__actions-text" v-else>Mark as Favorite?</span>
                </a>
              </div>
              <div class="movie__info">
                <div v-if="movie.overview" class="movie__description">
                  {{ movie.overview }}
                </div>
                <div class="movie__details">
                  <div v-if="movie.genres.length" class="movie__details-block">
                    <h2 class="movie__details-title">
                      ジャンル
                    </h2>
                    <div class="movie__details-text">
                      <span v-for="genre in movie.genres" :key="genre.id" >
                        <router-link :to="{name: 'discover', query: {'movieId': $route.query['movieId'], 'with_genres': genre.id }}">{{ genre.name }}</router-link>
                      </span>
                    </div>
                  </div>
                  <div v-if="movie.release_date" class="movie__details-block">
                    <h2 class="movie__details-title">
                      公開日
                    </h2>
                    <div class="movie__details-text" v-html="releaseDate(movie.release_date)"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          映画を選択してください。
        </div>
      </section>
    </div>
  </vuescroll>
</template>

<script>
import axios from 'axios'
import numeral from 'numeral'
import storage from '../storage.js'
import img from '../directives/v-image.js'
import formatDate from '../directives/v-formatDate.js'
import vuescroll from 'vuescroll';

export default {
  // props: ['id'],
  components: { vuescroll },
  directives: {
    img: img,
    formatDate: formatDate
  },
	data () {
		return {
			id: 430,
      movie: {},
      movieLoaded: false,
      moviePosterSrc: '',
      movieBackdropSrc: '',
      userLoggedIn: storage.sessionId ? true : false,
			favoriteChecked: '',
			favorite: ''
		}
	},
	methods: {
		fetchMocvie () {
			let id = this.id;
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${storage.apiKey}&language=${storage.language}`)
      .then(function(resp){
          let movie = resp.data;
          this.movie = movie;
          this.poster();
          this.backdrop();
          if(this.userLoggedIn){
            this.checkIfInFavorites(movie.id);
          } else {
            this.movieLoaded = true;
          }
          // Push state
          // if(storage.createMoviePopup){
          //   storage.moviePath = '/movie/' + id;
          //   history.pushState({ popup: true }, null, storage.moviePath);
          //   storage.createMoviePopup = false;
          // }
          // Change Page title
          document.title = this.movie.title + storage.pageTitlePostfix;
          console.log(movie);
      }.bind(this))
      .catch(function(error) {
        // this.$router.push({ name: '404' });
        console.log('データの取得不可');
      }.bind(this));	
		},
    poster() {
      if(this.movie.poster_path){
        this.moviePosterSrc = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.movie.poster_path;
      }
    },
    backdrop(){
      if(this.movie.backdrop_path){
        this.movieBackdropSrc = 'https://image.tmdb.org/t/p/w500' + this.movie.backdrop_path;
      }
    },
    releaseDate(enReleaseDate){
      let splitted = enReleaseDate.split('-');
      return `${splitted[0]}年${splitted[1]}月${splitted[2]}日`; 
    },
    nestedDataToString(data) {
      let nestedArray = [], resultString;
      data.forEach((item) => nestedArray.push(item.name));
      resultString = nestedArray.join(', ');
      return resultString;
    }
	},
	created () {
    let fetch = function() {
      this.id = this.$route.query['movieId'];
      this.fetchMocvie();      
    }.bind(this);

    eventHub.$on('openMovie', function(e){
      fetch();
    }.bind(this));

    if (!this.movieLoaded) {
      fetch();
    }
  },
  beforeUpdate () {
    // this.$refs['dvs'].scrollTo(
    //   {
    //     y: 0
    //   },
    //   0,
    //   'easeInQuad'
    // );
  }
}

</script>

<style lang="scss">

.detail-panel {
    padding: 30px 20px;   
    overflow: auto;
    height: 100%;
}
.movie {
  box-shadow: 2px 2px 4px;
  padding-bottom: 70px;
  a{
    text-decoration: none;
    color: #333;
    display: inline-block;
    border: 1px solid #333;
    padding: 3px; 
    margin: 5px;
  }
  a:hover{
    background-color: #333;
    color: #fff;
  }
}
.movie__info {
  min-height: 442px;
}

</style>
