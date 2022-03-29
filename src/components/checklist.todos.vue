<template>
    <section>
        <ul>
            <li v-for="todo in todos" :key="todo._id">
                <input type="checkbox" />
                <p>{{ todo.txt }}</p>
            </li>
        </ul>
    </section>
</template>

<script>

export default {
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