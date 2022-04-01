<template>
    <section>
        <div class="activities-container module">
            <div class="header">
                <span class="icon"></span>
                <h2>Activity</h2>
                <button>Hide details</button>
            </div>
            <div ref="comment-box" class="comment-box" v-clickoutside="hideButton">
                <avatar-profile :username="user.username"></avatar-profile>
                <textarea
                    ref="textarea"
                    @focus="showButton"
                    placeholder="Write a comment..."
                    v-model="txt"
                ></textarea>
                <button ref="save-btn" @click="addComment" class="save-comment">Save</button>
            </div>
            <ul class="comments-list">
                <li v-for="comment in comments" :key="comment.id" class="comment">
                    <activities-comment
                        @delete-comment="deleteComment"
                        @save-comment="saveComment"
                        :user="user"
                        :comment="comment"
                    ></activities-comment>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import avatarProfile from './avatar.profile.vue'
import activitiesComment from './activities.comment.vue'
export default {
    props: {
        comments: Array,
        members: Array,
        user: Object
    },
    data() {
        return {
            txt: '',
            isEditing: false
        }
    },
    created() {

    },
    methods: {
        addComment() {
            this.$emit('add-comment', this.txt)
            this.hideButton();
            this.txt = '';
        },
        showButton() {
            this.$refs['comment-box'].style.height = '85px';
            this.$refs['save-btn'].style.pointerEvents = 'auto';
            this.$refs['save-btn'].style.opacity = 1;
        },
        hideButton() {
            this.$refs['comment-box'].style.height = '35px';
            this.$refs['save-btn'].style.opacity = 0;
            this.$refs['save-btn'].style.pointerEvents = 'none';
        },
        deleteComment(commentId) {
            this.$emit('delete-comment', commentId)
        },
        saveComment(txt, commentId){
            this.$emit('save-comment', txt, commentId)
        }

    },
    computed: {

    },
    components: {
        avatarProfile,
        activitiesComment
    }
}
</script>