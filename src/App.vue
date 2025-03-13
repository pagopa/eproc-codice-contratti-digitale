<template>
	<HeaderTemplate />
	<main>
		<component :is="currentView" :key="this.$route.fullPath" :article="this.article" :section="this.section" :version="this.version"></component>
	</main>
	<FooterTemplate />
</template>

<style>
.it-hero-wrapper {
	margin-top: 6.5em;
	min-height: 260px !important;
	background: linear-gradient(-180deg, rgba(0, 102, 204, 1) 0%, rgba(0, 51, 102, 1) 100%);
}

@media screen and (min-width: 767px) {
	.it-hero-wrapper {
		margin-top: 11em;
	}
}
</style>

<script>
import { ref } from 'vue';

import HomeView from './components/views/HomeView';
import ArticleView from './components/views/ArticleView';
import SectionView from './components/views/SectionView';

import HeaderTemplate from './components/template/Header.vue'
import FooterTemplate from './components/template/Footer.vue'
import { ContentTree } from './classes/tree.js'
import contents from './assets/data/contents.json'
import lodash from 'lodash'

export default {
	name: 'App',
	components: {
		HeaderTemplate,
		FooterTemplate
	},
	setup() {
		const currentView = ref(HomeView);

		function changeView(view, sectionValue, articleValue, versionValue) {
			currentView.value = view;
			this.article = articleValue;
			this.section = sectionValue;
			this.version = versionValue;
		}
		return { currentView, changeView };
	},
	watch: {
		'$route.fullPath'(to, from) {
			this.updateLocation()
		}
	},
	mounted() {
		this.updateLocation();
	},
	data() {
		return {
			contentTree: new ContentTree(lodash.cloneDeep(contents)),
			dlgs: contents.dlgs,
			baseURL: process.env.VUE_APP_BASE_URL,
			article: "",
			section: "",
			version: ""
		}
	},
	methods: {
		updateLocation() {
			let urlObj = (new URL(window.location))
			const params = new URLSearchParams(urlObj.search);
			if (!params.get('section') && !params.get('article') && !params.get('version')){
				this.changeView(HomeView, null, null, null)
			}
			if (params.get('section')) {
				this.changeView(SectionView, params.get('section'), params.get('article'), params.get('version'))
			}
			if (params.get('article')) {
				this.changeView(ArticleView, params.get('section'), params.get('article'), params.get('version'));
			}
		},
		updateContentTree() { //notifica Vue dell'aggiornamento dei nodi del contentTree
			this.contentTree.nodes = [...this.contentTree.nodes];
		},
	}
}
</script>