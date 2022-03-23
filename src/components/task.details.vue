<template >
    <section v-if="task" class="task-details-main">
        <div class="head">
            <div class="text">
                <h1>{{ task.title }}</h1>
                <p>in list ...</p>
            </div>
            <button>X</button>
        </div>
        <div class="details-main">
            <div class="content">
                <div class="description module">
                    <div>
                        <h2>Description</h2>
                        <p>{{ task.description }}</p>
                    </div>
                    <button>Edit</button>
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
</template>

<script>
import taskActivities from './task.activities.vue'

export default {
    data() {
        return {
        }
    },
    async created() {
        // const boardId = this.$route.params.boardId;
        // const taskId = this.$route.params.cardId;
        // await this.$store.dispatch({ type: 'getTask', taskId, boardId })
    },
    methods: {
        async addComment(txt) {
            if (!this.task.comments || this.task.comments.length) this.task.comments = [];

            const comment = {
                txt,
                createdAt: Date.now(),
            }
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
        }
    }
}
</script>