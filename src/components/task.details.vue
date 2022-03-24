<template >
    <div @click="closeTaskDetails" class="task-details-overlay">
        <section @click="stopProg" v-if="task" class="task-details-main">
            <div class="head">
                <div class="text">
                    <span class="icon"></span>
                    <h1>{{ task.title }}</h1>
                    <p>in list ...</p>
                </div>
                <span class="icon" @click="closeTaskDetails"></span>
            </div>
            <div class="details-main">
                <div class="content">
                    <div class="description module">
                        <div class="text">
                            <h2>Description</h2>
                            <pre v-if="!isEditingDesc" @click.stop="isEditingDesc = !isEditingDesc">{{ task.description }}</pre>
                            <div v-else class="desc-edit">
                                <textarea
                                    placeholder="Add a more detailed description..."
                                    class="desc-edit-txt"
                                    v-model="task.description"
                                ></textarea>
                                <div class="edit-btns">
                                    <button @click.stop="isEditingDesc = false; setDescTxt()">Save</button>
                                    <button
                                        @click.stop="isEditingDesc = false; task.description = currDescTxt"
                                    >X</button>
                                </div>
                            </div>
                        </div>
                        <button v-if="!isEditingDesc" @click="isEditingDesc = true">Edit</button>
                    </div>
                    <task-activities @add-comment="addComment" :comments="task.comments"></task-activities>
                </div>
                <div class="actions-menu">
                    <h3>Add to card</h3>
                    <button>
                        <span>Members</span>
                    </button>
                    <button>
                        <span>Labels</span>
                    </button>
                    <button>
                        <span>Checklist</span>
                    </button>
                    <button>
                        <span>Dates</span>
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import taskActivities from './task.activities.vue'

export default {
    data() {
        return {
            isEditingDesc: false,
            currDescTxt: ''
        }
    },
    methods: {
        async addComment(txt) {
            if (!this.task.comments || this.task.comments.length) this.task.comments = [];

            const comment = {
                txt,
                createdAt: Date.now(),
            }
        },
        async setDescTxt() {
            const boardId = this.$route.params.boardId;
            this.task.description = this.task.description.trim()
            this.$store.dispatch({ type: 'saveTask', task: this.task, boardId })
        },
        closeTaskDetails() {
            const boardId = this.$route.params.boardId;
            this.$router.push('/board/' + boardId)
        },
        stopProg(e) {
            e.stopPropagation();

        }
    },
    computed: {
        task() {
            return this.$store.getters.currTask;
        }
    },
    components: {
        taskActivities
    },
    watch: {
        '$route.params.taskId': {
            async handler() {
                const boardId = this.$route.params.boardId;
                const taskId = this.$route.params.cardId;
                await this.$store.dispatch({ type: 'getTask', taskId, boardId })
            },
            deep: true,
            immediate: true,
        },
        isEditingDesc: {
            handler() {
                if (this.isEditingDesc) this.currDescTxt = this.task.description;
            }
        }
    }
}
</script>