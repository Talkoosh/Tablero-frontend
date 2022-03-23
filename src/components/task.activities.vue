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
                    <div class="content">
                        <div class="header">
                            <span class="comment-fullname">{{ comment.byMember.fullname }}</span>
                            <p>{{ comment.txt }}</p>
                        </div>
                        <div class="comment-time">
                            <span class="comment-time">{{ comment.createdAt }}</span>
                        </div>
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