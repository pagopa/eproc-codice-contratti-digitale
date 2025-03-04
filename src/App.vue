<template>
	<HeaderTemplate />
	<main>
		<RouterView :key="$route.fullPath" />
	</main>
	<FooterTemplate />
</template>

<style>
.it-hero-wrapper {
	margin-top: 6.5em;
	min-height: 260px !important;
	background: linear-gradient(-180deg, rgba(0, 102, 204, 1) 0%, rgba(0,51,102, 1) 100%);
}

@media screen and (min-width: 767px) {
	.it-hero-wrapper {
		margin-top: 11em;
	}
}
</style>

<script>
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
	data() {
		return {
			contentTree: new ContentTree(lodash.cloneDeep(contents)),
			dlgs: contents.dlgs,
            baseURL : process.env.VUE_APP_BASE_URL
		}
	},
	methods: {
		updateContentTree() { //notifica Vue dell'aggiornamento dei nodi del contentTree
			this.contentTree.nodes = [...this.contentTree.nodes];
		},
	}
}
</script>