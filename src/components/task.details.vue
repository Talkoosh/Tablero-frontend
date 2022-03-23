<template>
    <section class="task-details-main">
        <div class="head">
            <div class="text">
                <h1>{{ task.title }}</h1>
                <p>in list ...</p>
            </div>
            <button>X</button>
        </div>
        <div class="details-main">
            <div class="content">
                <div class="description-container module">
                    <h2>Description</h2>
                    <p>{{ task.description }}</p>
                </div>
                <task-activities @add-comment="saveComment" :comments="task.comments"></task-activities>
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
            task: {
                id: 'c104',
                title: 'Help me',
                status: 'in-progress',
                description: 'description',
                comments: [
                    {
                        id: 'ZdPnm',
                        txt: 'also @yaronb please CR this',
                        createdAt: 1590999817436.0,
                        byMember: {
                            _id: 'u101',
                            fullname: 'Tal Tarablus',
                            imgUrl:
                                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    },
                ],
                checklists: [
                    {
                        id: 'YEhmF',
                        title: 'Checklist',
                        todos: [
                            {
                                id: '212jX',
                                title: 'To Do 1',
                                isDone: false,
                            },
                        ],
                    },
                ],
                members: [
                    {
                        _id: 'u101',
                        username: 'Tal',
                        fullname: 'Tal Tarablus',
                        imgUrl:
                            'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    },
                ],
                labelIds: ['l101', 'l102'],
                createdAt: 1590999730348,
                dueDate: 16156215211,
                byMember: {
                    _id: 'u101',
                    // "username": "Tal", not sure if necessary
                    fullname: 'Tal Tarablus',
                    imgUrl:
                        'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
                style: {
                    bgColor: '#26de81',
                },
            },
        }
    },
    created() {

    },
    methods: {
        async addComment(txt){
           await this.$store.dispatch({type: 'addComment', txt})
        }
    },
    computed: {

    },
    components: {
        taskActivities
    }
}
</script>