<template>
    <section class="task-edit-main">
        <div class="edit-main">
            <h1>{{ task.title }}</h1>
            <div class="description-container">
                <h2>Description</h2>
                <p>{{ task.description }}</p>
            </div>
            <div class="activities-container">
                <h2>Activity</h2>
                <textarea placeholder="Write a comment..."></textarea>
                <ul class="comments-list">
                    <li v-for="comment in task.comments" :key="comment.id">
                        <img :src="comment.byMember.imgUrl" />
                        <span class="comment-fullname">{{ comment.byMember.fullname }}</span>
                        <span class="comment-time">{{ comment.createdAt }}</span>
                        <div class="comment-text-container">
                            <p>{{ comment.txt }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="actions-menu">
            <div class>
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

    },
    computed: {

    }
}
</script>