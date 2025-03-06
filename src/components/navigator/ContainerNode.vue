<template>
    <div class="content-container">
        <div class="d-flex btn p-0 text-start" @click="this.expanded = !this.expanded">
            <div class="container-icon my-auto" id="container-it-arrow-right-circle">
                <svg class="icon">
                    <use
                        :href="this.$root.baseURL + '/bootstrap-italia/dist/svg/sprites.svg#' + (this.expanded ? 'it-expand' : 'it-collapse')">
                    </use>
                </svg>
            </div>
            <h6 class="my-auto">{{ node.title }}</h6>
            <span v-if="node.type == 'section' && this.$route.fullPath.split('/').slice(0,3).join('/') != `/section/${node.id}`" class="ms-auto">
                <RouterLink :to="`/index.html?section=${node.id}`">
                    <svg class="icon" aria-hidden="true">
                        <use :href="this.$root.baseURL + '/bootstrap-italia/dist/svg/sprites.svg#it-external-link'"></use>
                    </svg>
                </RouterLink>
            </span>
        </div>
        <ContentNode v-if="this.expanded" :id="node.id" :type="node.type" :title="node.title"
            :childrens="node.childrens" :key="node.id" :contentTree="this.contentTree" />
    </div>
</template>

<style scoped>
.icon {
    width: 18px;
}
</style>

<script>

import ContentNode from './ContentNode.vue';

export default {
    name: 'ContainerNode',
    components: {
        ContentNode
    },
    data() {
        return {
            expanded: true
        }
    },
    props: {
        node: {
            type: Object,
            required: true
        },
        contentTree: {
            type: Object,
            required: false
        }
    }
}
</script>