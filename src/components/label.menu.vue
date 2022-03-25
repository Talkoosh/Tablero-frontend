<template>
    <section>
        <section class="label-menu">
            <div class="label-menu-header">
                <h3 class="menu-title">Labels</h3>
                <span class="label-menu-exit" @click="closeAction"></span>
            </div>
            <hr />
            <div class="main">
                <input type="text" placeholder="Search labels..." />
                <h4>Labels</h4>
                <div class="label-container" v-for="label in labels" :key="label._id">
                    <span
                        @click="toggleLabel(label._id)"
                        :style="{ backgroundColor: label.color, color: label.color}"
                        class="label"
                    >
                        <span class="check-icon" v-if="labelIds.includes(label._id)"></span>
                    </span>
                    <span class="label-edit-icon"></span>
                </div>
                <button class="create-btn">Create a new label</button>
            </div>
        </section>
    </section>
</template>

<script>

export default {
    props: {
        labels: Array,
        task: Object
    },
    data() {
        return {

        }
    },
    created() {
        if (!this.task.labelIds) this.task.labelIds = [];
    },
    methods: {
        closeAction(ev) {
            this.$emit('close-action', ev)
        },
        toggleLabel(labelId) {
            if (this.labelIds.includes(labelId)) {
                const idx = this.labelIds.findIndex(id => id === labelId);
                this.labelIds.splice(idx, 1);
            } else {
                this.labelIds.push(labelId)
            }
            this.$emit('label-set', this.labelIds)
        }
    },
    computed: {
        labelIds() {
            return this.task.labelIds
        }
    },
    components: {
    }
}
</script>