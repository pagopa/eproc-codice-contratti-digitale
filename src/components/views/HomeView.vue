<template>
    <section class="it-hero-wrapper py-4">
        <div class="container-fluid">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <BreadcrumbNode :article="undefined" :section="undefined"/>
                        <HeroCard/>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="container">
        <div style="position:relative; top:-4em" class="row">
            <div class="card-body bg-white shadow rounded m-3 mb-5">
                <SearchBar :treeContainer="this.$root"/>
            </div>
            <hr>
            <div class="col-12 col-md-6" v-for="nodes in this.$root.contentTree.chunk(this.$root.contentTree.nodes.length/2)" :key="nodes">
                <div class="col-12" v-for="node in nodes" :key="node.id">
                    <div class="m-2 shadow rounded">
                        <div class="p-3">
                            <ContainerNode :contentTree="this.$root.contentTree" :node="node"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BreadcrumbNode from '../navigator/BreadcrumbNode.vue';
import SearchBar from '../navigator/SearchBar.vue';
import ContainerNode from '../navigator/ContainerNode.vue';
import HeroCard from '../partials/HeroCard.vue';

export default {
    name: "HomeView",
    components: {
        BreadcrumbNode,
        SearchBar,
        ContainerNode,
        HeroCard
    }
}
</script>