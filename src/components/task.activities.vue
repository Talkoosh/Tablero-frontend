<template>
    <section>
        <div class="activities-container module">
            <div class="header">
                <h2>Activity</h2>
                <button>Hide details</button>
            </div>
            <div class="comment-box">
                <textarea placeholder="Write a comment..." v-model="txt"></textarea>
                <button @click="saveComment">Save</button>
            </div>
            <ul class="comments-list">
                <li v-for="comment in comments" :key="comment.id">
                    <img :src="comment.byMember.imgUrl" />
                    <span class="comment-fullname">{{ comment.byMember.fullname }}</span>
                    <span class="comment-time">{{ comment.createdAt }}</span>
                    <div class="comment-text-container">
                        <p>{{ comment.txt }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>

export default {
    props: {
        comments: Array
    },
    data() {
        return {
            txt: ''
        }
    },
    created() {

    },
    methods: {
        saveComment() {
            this.$emit('add-comment', this.txt)
        }
    },
    computed: {

    },
    components: {
    }
}
</script>