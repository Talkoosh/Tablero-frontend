<template>
    <section
        v-if="task.members?.length || task.dueDate || task.attachments?.length || task.checklists?.length && !task.style.isBackground"
    >
        <div class="badges">
            <div v-if="task.watching" class="watch">
                <span class="watch-icon badge-icon"></span>
            </div>
            <div class="date" v-if="task.dueDate">
                <span class="date-icon badge-icon"></span>
                {{ date }}
            </div>
            <div class="description" v-if="task.description">
                <span class="description-icon badge-icon"></span>
            </div>
            <div class="comments" v-if="task.comments">
                <span class="comments-icon badge-icon"></span>
                {{ commentCount }}
            </div>
            <div class="attachments" v-if="task.attachments?.length">
                <span class="attachments-icon badge-icon"></span>
                {{ attachmentsCount }}
            </div>
            <div class="checklist" v-if="task.checklists?.length">
                <span class="checklist-icon badge-icon"></span>
                {{ checklistDisplay }}
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
    },
    data() {
        return {}
    },
    methods: {},
    computed: {
        date() {
            const time = new Date(this.task.dueDate)
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            const month = monthNames[time.getMonth()]
            const day = time.getDate()
            const year = time.getFullYear()
            const now = new Date(Date.now())
            console.log(now)
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
            return
        },
        checklistDisplay() {
            return
        }
    },
    unmounted() { },
}
</script>