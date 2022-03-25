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
            isTitleShown: false,
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
            if (!this.isTitleShown) {
                this.startAnimation = true
                setTimeout(() => {
                    this.isTitleShown = true
                }, 300)

            } else {
                this.startAnimation = false
                setTimeout(() => {
                    this.isTitleShown = false
                }, 300)
            }
        }
    },
    computed: {
        labelStyle() {
            const label = this.getLabel(this.label)
            return `background-color: ${label.color}`
        },
        labelTitle() {
            const label = this.getLabel(this.label)
            return label.title
        },
        isLabelOpen() {
            return this.startAnimation ? 'label-open' : 'label-closing';
        }
    },
    unmounted() { },
}
</script>