<template>
    <div class="col-12">
        <div v-for="node in childrens" :key="node.id">
            <div v-if="node.type == 'section'" class="mt-3 ms-3">
                <ContainerNode :contentTree="this.contentTree" :node="node" :key="node" />
            </div>
            <div v-else>
                <div v-if="this.contentTree && !this.contentTree.filtered">
                    <ArticleNode v-if="node.versions.length > 0" :to="'/index.html?article=' + node.id + '&version=' + node.findCurrentVersion().id" :text="!node.findCurrentVersion().title ? node.title : node.findCurrentVersion().title"/>
                </div>
                <div v-else>
                    <div v-for="version in node.versions" :key="version.id + version.filtered">
                        <div v-if="'filtered' in version">
                            <div v-if="!version.filtered" class="d-flex">
                                <ArticleNode :to="'/index.html?article=' + node.id + '&version=' + version.id" :text="`${!version.title ? node.title : version.title} ${version.normative_reference}`"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ContentTree } from '@/classes/tree';
import ArticleNode from '@/components/navigator/ArticleNode.vue';
import ContainerNode from '@/components/navigator/ContainerNode.vue'

export default {
    name: 'ContentNode',
    components: {
        ContainerNode,
        ArticleNode
    },
    props: {
        id: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        childrens: {
            type: Array,
            required: true
        },
        contentTree: {
            type: ContentTree,
            required: false
        }

    }
}
</script>