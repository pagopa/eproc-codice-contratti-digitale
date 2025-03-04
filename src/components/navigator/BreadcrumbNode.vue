<template>
    <div class="container-fluid z-0">
        <div class="container">
            <div>
                <div class="col-12 col-lg-10">
                    <div class="cmp-breadcrumbs" role="navigation">
                        <nav class="breadcrumb-container bread" aria-label="Percorso di navigazione">
                            <ol style="background-color:transparent" class="breadcrumb dark p-0" data-element="breadcrumb">
                                <li :class="`breadcrumb-item` + (node.route && node.route == this.$route.path ? ' active' : '')" v-for="node in nodes" :key="node.title">
                                    <div v-if="node.route && ! node.route.includes('http')">
                                        <RouterLink v-if="node.route" :to="node.route">{{ node.title }}</RouterLink>
                                        <span v-else>{{ node.title }}</span>
                                        <span v-if="node !== this.article && nodes.length > 2" class="separator">
                                            /
                                        </span>
                                    </div>
                                    <div v-else>
                                        <a v-if="node.route" :href="node.route">{{ node.title }}</a>
                                        <span v-else>{{ node.title }}</span>
                                        <span v-if="node !== this.article"  class="separator">/</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ArticleNode, SectionNode } from '@/classes/tree'

export default {
    name: "BreadcrumbNode",
    data() {
        return {
            nodes: null
        }
    },
    props: {
        article: {
            type: ArticleNode,
            required: false
        },
        section: {
            type: SectionNode,
            required: false
        }
    },
    created() {
        this.nodes = [{ "title": "Home", "route": "https://www.serviziocontrattipubblici.it/" }, {"title": "Codice dei Contratti Pubblici Digitalizzato", "route" : "/index.html"}]
        if (this.article != undefined) {
            this.nodes = this.nodes.concat(this.$root.contentTree.getChain(this.article))
        }
        if (this.section != undefined) {
            this.nodes = this.nodes.concat(this.$root.contentTree.getChain(this.section))
        }
    }
}
</script>