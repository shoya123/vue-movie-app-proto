<template>
	<li class="movies-item">
		<a class="movies-item__link" :class="{'no-image': noImage}" :href="'/movie/' + movie.id" @click.prevent="openMoviePopup(movie.id, true)">
			<figure class="movies-item__poster">
				<img v-if="!noImage" class="movies-item__img" src="~assets/placeholder.png" v-img="poster()" alt="">
				<img v-if="noImage" class="movies-item__img is-loaded" src="~assets/no-image.png" alt="">
			</figure>
			<div class="movies-item__content">
				<p class="movies-item__title">{{ movie.title }}</p>
			</div>
		</a>
	</li>
</template>

<script>
import img from '../directives/v-image.js'

export default {
	props: ['movie'],
	directives: {
		img: img
	},
	data(){
		return {
			noImage: false
		}
	},
	methods: {
		poster(){
			if(this.movie.poster_path) {
				return 'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + this.movie.poster_path;
			} else {
				this.noImage = true;
			}
		},
		openMoviePopup(id, event){
			eventHub.$emit('openMoviePopup', id, event);
		}
	}
}
</script>

