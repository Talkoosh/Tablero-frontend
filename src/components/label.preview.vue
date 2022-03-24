<template>
    <span @click.prevent="isTitleShown = !isTitleShown" class="label" :style="labelStyle">
        <span class="label-text">{{ labelTitle }}</span>
    </span>
</template>

<script>
export default {
    props: {
        label: String,
    },
    components: {

    },
    created() {
    },
    data() {
        return {
            isTitleShown: false,
        }
    },
    methods: {
        getLabel(labelId) {
            if (!this.label) return;
            const board = this.$store.getters.currBoard
            const label = board.labels.find(l => l._id === labelId)
            return label
        }
    },
    computed: {
        labelStyle() {
            const label = this.getLabel(this.label)
            return `background-color: ${label.color}`
        },
        labelTitle() {
            const label = this.getLabel(this.label)
            return this.isTitleShown ? label.title : ''
        },
    },
    unmounted() { },
}
</script>