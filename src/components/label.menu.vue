<template>
    <section class="label-menu">
        <div class="label-menu-header">
            <h3 class="menu-title">Labels</h3>
            <span class="label-menu-exit"></span>
        </div>
        <hr>
        <div class="main">
            <input type="text" placeholder="Search labels..."/>
            <h4>Labels</h4>
            <div class="label-container" v-for="label in labels" :key="label._id">
                <span :style="{ backgroundColor: label.color }" class="label"></span>
                <span class="label-edit-icon"></span>
            </div>
            <button class="create-btn">Create a new label</button>
        </div>
    </section>
</template>

<script>

export default {
    props: {
        labels: Array
    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
    },
    computed: {

    }
}
</script>