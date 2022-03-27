<template>
    <span @click.prevent="showTitle" class="label" :style="labelStyle" :class="isLabelOpen">
        <span class="label-text" :class="isLabelOpen">{{ labelTitle }}</span>
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
            // isTitleShown: false,
            startAnimation: false,
        }
    },
    methods: {
        getLabel(labelId) {
            if (!this.label) return;
            const board = this.$store.getters.currBoard
            const label = board.labels.find(l => l._id === labelId)
            return label
        },
        showTitle() {
            this.startAnimation = !this.startAnimation
            this.$store.commit({ type: 'toggleLabelTitle' })
        }
    },
    computed: {
        labelStyle() {
            const label = this.getLabel(this.label)
            return `background-color: ${label?.color}`
        },
        labelTitle() {
            const label = this.getLabel(this.label)
            return label?.title
        },
        isLabelOpen() {
            return this.isTitleShown ? 'label-open' : 'label-closing';
        },
        isTitleShown() {
            console.log(this.$store.getters.isLabelTitleShown)
            return this.$store.getters.isLabelTitleShown
        }
    },
    unmounted() { },
}
</script>