<template>
    <section
        v-if="(task.members?.length || task.dueDate || task.attachments?.length || task.checklists?.length) && !task.style.isBackground"
    >
        <div class="badges">
            <div v-if="task.watching" class="watch">
                <span class="watch-icon badge-icon"></span>
            </div>
            <div
                @click.prevent="toggleDateDone"
                class="date"
                v-if="task.dueDate?.dueDate"
                :style="dateBadgeBg"
            >
                <span v-if="this.task.dueDate.isComplete" class="date-complete-icon badge-icon"></span>
                <span v-else class="date-incomplete-icon badge-icon"></span>
                <span class="badge-text">{{ date }}</span>
            </div>
            <div class="description" v-if="task.description">
                <span class="description-icon badge-icon"></span>
            </div>
            <div class="comments" v-if="task.comments">
                <span class="comments-icon badge-icon"></span>
                <span class="badge-text">{{ commentCount }}</span>
            </div>
            <div class="attachments" v-if="task.attachments?.length">
                <span class="attachments-icon badge-icon"></span>
                <span class="badge-text">{{ attachmentsCount }}</span>
            </div>
            <div class="checklist" v-if="task.checklists?.length">
                <span class="checklist-icon badge-icon"></span>
                <span class="badge-text">{{ checklistDisplay }}</span>
            </div>
        </div>
        <div class="task-members" v-if="task.membersIds?.length">
            <div class="member-img" v-for="member in task.members">
                <img :src="member.imgUrl" :title="member.fullname" />
            </div>
        </div>
    </section>
</template>

<script>

export default {
    props: {
        task: Object,
    },
    components: {},
    created() {
        this.taskToEdit = { ...this.task }
    },
    data() {
        return {
            taskToEdit: null
        }
    },
    methods: {
        toggleDateDone() {
            this.taskToEdit.dueDate.isComplete = !this.taskToEdit.dueDate.isComplete
            const boardId = this.$route.params.boardId;
            this.$store.dispatch({ type: 'saveTask', task: JSON.parse(JSON.stringify(this.taskToEdit)), boardId })
        }
    },
    computed: {
        date() {
            const time = new Date(this.task.dueDate.dueDate)
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            const month = monthNames[time.getMonth()]
            const day = time.getDate()
            const year = time.getFullYear()
            const now = new Date(Date.now())
            const currYear = now.getFullYear()

            if (year !== currYear) {
                return `${month} ${day}, ${year}`
            } else {
                return `${month} ${day}`
            }
        },
        commentCount() {
            return this.task.comments.length
        },
        attachmentsCount() {
            return this.task.attachments?.count
        },
        checklistDisplay() {
            var totalAmount = 0
            var doneAmount = 0
            this.task.checklists.forEach(c => {
                c.todos.forEach(t => {
                    totalAmount++
                    if (t.isDone) doneAmount++
                })
            })
            return `${doneAmount}/${totalAmount}`
        },
        dateBadgeBg() {
            if (this.task.dueDate.isComplete) return 'background-color: #61bd4f; color: #fff'
            const today = new Date(Date.now()).getDate()
            const dueDay = new Date(this.task.dueDate).getDate()
            const diff = this.task.dueDate - Date.now()
            if (diff > 86400000) return
            if (dueDay - today === 1) return 'background-color: #f2d600; color: #fff;'
        }
    },
    unmounted() { },
}
</script>