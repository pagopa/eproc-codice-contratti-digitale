<template>
    <section class="it-hero-wrapper py-4">
        <div class="container-fluid">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <BreadcrumbNode :article="undefined" :section="this.section" />
                        <HeroCard/>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="container">
        <div style="position:relative; top:-4em" class="row">
            <div class="card-body bg-white shadow rounded m-3 mb-5">
                <SearchBar :treeContainer="this" />
            </div>
            <hr>
            <div class="col-12" v-for="nodes in this.contentTree.chunk(this.contentTree.nodes.length / 2)" :key="nodes">
                <div class="col-12" v-for="node in nodes" :key="node.id">
                    <div class="m-2 shadow rounded">
                        <div class="p-3">
                            <ContainerNode :contentTree="this.contentTree" :node="node" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import lodash from 'lodash'
import contents from '@/assets/data/contents.json'
import { ContentTree } from '@/classes/tree.js'
import BreadcrumbNode from '../navigator/BreadcrumbNode.vue';
import SearchBar from '../navigator/SearchBar.vue';
import ContainerNode from '../navigator/ContainerNode.vue';
import HeroCard from '../partials/HeroCard.vue'

export default {
    name: "SectionView",
    components: {
        BreadcrumbNode,
        SearchBar,
        ContainerNode,
        HeroCard
    },
    data() {
        return {
            contentTree: undefined,
            section: undefined
        }
    },
    async created() {
        this.loadTree()

    },
    mounted() {
        this.contentTree.setUnfiltered()
        this.updateContentTree();
    },
    methods: {
        loadTree() {
            let virtualTree = lodash.cloneDeep(contents);
            var filteredSections = {}
            for (const [key, value] of Object.entries(virtualTree.sections)) {
                if (value.parent === this.$route.params.section || key == this.$route.params.section || (value.parent && value.parent.includes(this.$route.params.section))) {
                    if (key == this.$route.params.section) {
                        value.parent = null
                    }
                    filteredSections[key] = value;
                }
            }
            virtualTree.sections = filteredSections
            this.contentTree = new ContentTree(virtualTree)
            this.section = this.$root.contentTree.getNodeById({ id: null, childrens: this.$root.contentTree.nodes }, this.$route.params.section)
        },
        updateContentTree() { //notifica Vue dell'aggiornamento dei nodi del contentTree
            this.contentTree.nodes = [...this.contentTree.nodes];
        }
    }
}
</script>