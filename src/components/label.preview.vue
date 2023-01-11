<template>
    <span @click.stop.prevent="showTitle" class="label" :style="labelStyle" :class="isLabelOpen">
        <span class="label-text" :style="textAnimationBehavior">{{ labelTitle }}</span>
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
            this.$store.dispatch({ type: 'toggleLabelTitle' })
        }
    },
    computed: {
        isTitleShown() {
            return this.$store.getters.isLabelTitleShown
        },
        isStartAnimation() {
            return this.$store.getters.isStartAnimation
        },
        labelStyle() {
            const label = this.getLabel(this.label)
            const width = this.isStartAnimation ? 'fit-content' : '40px'
            return `background-color: ${label?.color};height: ${this.labelSize.height}; width: ${this.labelSize.width}; min-width: ${width}`
        },
        labelTitle() {
            const label = this.getLabel(this.label)
            return label?.title
        },
        isLabelOpen() {
            return this.isTitleShown ? 'label-open' : 'label-closing';
        },
        textAnimationBehavior() {
            return this.isStartAnimation ? 'opacity: 1; position: relative' : 'opacity: 0; position: absolute'
        },
        labelSize() {
            return this.$store.getters.labelSize
        }
    },
    unmounted() { },
}
</script>