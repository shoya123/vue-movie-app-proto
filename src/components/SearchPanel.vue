<template>
	<div class="search__panel">
		<vuescroll>
		<div class="search__panel--wrap">
			<button class="search__panel--close" @click="close"></button>
			<div class="search__panel--group">
				<svg class="search-icon"><use xlink:href="#iconSearch"></use></svg>
				<input class="search__panel--input" type="text" v-model.trim="searchQuery" ref="keyword" @keyup.enter="search" placeholder="映画のタイトルで検索">
			</div>

			<div class="search__panel--group">
				<h3>ジャンルで探す</h3>
				<router-link v-for="(name, id) in genres" :to="{name: 'discover', query: {'movieId': $route.query['movieId'], 'with_genres': id }}" :key="id" @click.native="close">
					{{ name }}
				</router-link>
			</div>
			<div class="search__panel--group">
				<h3>監督で探す（サンプル）</h3>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
				<a>監督</a>
			</div>
			<div class="search__panel--group">
				<h3>制作国で探す</h3>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
				<a>制作国</a>
			</div>
			<div class="search__panel--group">
				<h3>タグで探す</h3>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
				<a>タグ</a>
			</div>
		</div>
		</vuescroll>
	</div>
</template>

<script>
import axios from 'axios'
import storage from '../storage.js'
import vuescroll from 'vuescroll';

export default {
	components: { vuescroll },
	data () {
		return {
			searchQuery: '',
			genres: storage.genres
		}
	},
	methods: {
		close () {
			eventHub.$emit('closeSearchPanel');
		},
		search (e) {
			eventHub.$emit('search', this.searchQuery);
			this.close();
		}
	},
	created () {
		console.log(this.genres);
	},
	mounted () {
		this.$refs.keyword.focus();
	}
}
</script>

<style>
.search__panel {
	background-color: rgba(0, 0, 0, 0.9);
	height: 95%;
	width: 95%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	/* border-radius: 20px; */
	position: fixed;
	z-index: 999999999;
	padding-bottom: 30px;
}
.search__panel--wrap {
	position: relative;
}
.search__panel--group {
	padding: 50px 50px 0px 50px;
	position: relative;
}
.search-icon {
	transition: fill 0.5s ease;
	pointer-events: none;
	/* position: absolute; */
	top: 50%;
	margin-top: -7px;
	width: 14px;
	height: 14px;
	fill: #333;
	display: block;
	position: absolute;
	top: 75px;
	left: 70px;
}
.search__panel--input {
	display: block;
	width: 100%;
	padding: 15px 20px 15px 45px;
	outline: none;
	border: 0;
	background-color: #fff;
	font-weight: 300;
	font-size: 16px;
}
.search__panel--close {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  background: transparent;
  width: 40px;
  height: 40px;
  transition: background .5s ease;
  cursor: pointer !important;
	z-index: 9999;
}
.search__panel--close:hover{
	background-color: #01d277;
}
.search__panel--close:before, 
.search__panel--close:after {
  content: "";
  display: block;
  position: absolute;
  top: 19px;
  left: 10px;
  width: 20px;
  height: 2px;
  background: #fff;
}
.search__panel--close:before {
  transform: rotate(45deg);
}
.search__panel--close:after {
  transform: rotate(-45deg);
}

.search__panel h3 {
	color: #fff;
}
.search__panel a {
  color: #fff;
  font-size: 13px;
  text-decoration: none;
  padding: 5px;
  border: 1px solid #fff;
  margin: 5px;
  display: inline-block;
}
.search__panel a:hover{
	background-color: #fff;
	color: #333;
}
</style>
