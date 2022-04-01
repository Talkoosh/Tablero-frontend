<template>
    <section>
        <avatar-profile :username="comment?.byMember?.username"></avatar-profile>
        <div class="content">
            <div class="comment-header">
                <span class="comment-fullname">{{ comment?.byMember?.username }}</span>
                <span class="comment-time">{{ commentTime(comment?.createdAt) }}</span>
            </div>
            <div class="comment-txt">
                <p v-if="!isEditing">{{ comment.txt }}</p>
                <div v-else class="comment-edit">
                    <textarea v-model="editTxt"></textarea>
                    <div>
                        <button @click.stop="saveComment">Save</button>
                        <span @click.stop="isEditing = false" class="exit-icon"></span>
                    </div>
                </div>
            </div>
            <div class="comment-btns" v-if="comment?.byMember._id === user._id && !isEditing">
                <button @click.stop="isEditing = true" class="edit-btn">Edit</button>-
                <button @click="deleteComment(comment._id)" class="delete-btn">Delete</button>
            </div>
        </div>
    </section>
</template>


<script>
import avatarProfile from './avatar.profile.vue'
export default {
    props: {
        comment: Object,
        user: Object
    },
    data() {
        return {
            isEditing: false,
            editTxt: this.comment.txt
        }
    },
    created() {

    },
    methods: {
        deleteComment(commentId) {
            this.$emit('delete-comment', commentId)
        },
        saveComment(){
            this.$emit('save-comment', this.editTxt, this.comment._id);
            this.isEditing = false;
        }
    },
    computed: {
        commentTime() {
            return timestamp => {
                const date = new Date(timestamp).toString().split(' ');
                const newDate = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3]
                return newDate;
            }
        }
    },
    components: {
        avatarProfile
    }
}
</script>