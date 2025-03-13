<template>
    <RouterLink :to="to">
        <div class="d-flex">
            <svg style="min-width: 20px;" class="icon icon-xs align-top mt-1 icon-primary">
                <use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-chevron-right"'></use>
            </svg>
            <span>
                {{ text }}
            </span>
        </div>
    </RouterLink>
</template>

<script>

export default {
    name: 'ArticleNode',
    props: {
        to : {
            type: String,
            required: true
        },
        text : {
            type: String,
            required: true
        }
    }
}
</script>