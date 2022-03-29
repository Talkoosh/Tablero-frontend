<template >
    <div class="task-details-overlay">
        <section v-clickoutside="closeTaskDetails" class="task-total-container">
            <div
                class="task-details-cover"
                v-if="(task?.style.color || task?.style.photo)"
                ref="detailsCover"
                :style="{ backgroundColor: coverBcg, backgroundImage: `url(${coverPhoto})` }"
            >
                <span class="icon task-close-btn" @click.stop="closeTaskDetails"></span>
                <div class="btn-container">
                    <button @click.stop="setCurrAction('coverMenu')">
                        <span class="icon cover-icon"></span>
                        <span>Cover</span>
                    </button>
                </div>
            </div>
            <section v-if="task" class="task-details-main">
                <div class="head">
                    <div class="text">
                        <span class="icon"></span>
                        <input
                            @focus="isEditingTitle = true"
                            @blur="closeEditingTitle"
                            :style="{
                                backgrounColor: isEditingTitle ? '#fff' : '',
                                boxShadow: isEditingTitle ? 'inset 0 0 0 1px #0079bf' : ''
                            }"
                            class="title-txt"
                            v-model="task.title"
                            type="text"
                        />
                        <p>in list ...</p>
                    </div>
                    <span
                        v-if="(!task?.style.color && !task?.style.photo)"
                        class="icon task-close-btn"
                        @click.stop="closeTaskDetails"
                    ></span>
                </div>
                <div class="details-main">
                    <div class="content">
                        <div class="task-top-actions module">
                            <div v-if="task.labelIds?.length" class="task-labels">
                                <h4>Labels</h4>
                                <div class="task-details-labels-container">
                                    <span v-for="label in labels" :key="label._id">
                                        <span
                                            v-if="task.labelIds.includes(label._id)"
                                            class="task-details-label"
                                            :style="{ backgroundColor: label.color }"
                                        >
                                            <span class="task-details-label-title">{{ label.title }}</span>
                                        </span>
                                    </span>
                                    <span class="task-details-label add-btn">
                                        <span class="add-icon"></span>
                                    </span>
                                </div>
                            </div>
                            <div v-if="task?.dueDate?.dueDate" class="task-dates">
                                <h4>Dates</h4>
                                <div class="main">
                                    <input
                                        type="checkbox"
                                        v-model="task.dueDate.isComplete"
                                        @change="updateTask"
                                    />
                                    <button class>
                                        {{ dueDate }}
                                        <span
                                            class="date-complete-label"
                                            v-if="task.dueDate.isComplete"
                                        >complete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="description module">
                            <div class="text">
                                <span class="icon desc-icon"></span>
                                <h2>Description</h2>
                                <div
                                    class="placeholder-desc"
                                    @click.stop="isEditingDesc = true"
                                    v-if="!task.description && !isEditingDesc"
                                >Add a more detailed description...</div>
                                <pre
                                    v-if="!isEditingDesc"
                                    @click.stop="isEditingDesc = !isEditingDesc"
                                >{{ task.description }}</pre>
                                <div v-else class="desc-edit">
                                    <textarea
                                        autofocus
                                        placeholder="Add a more detailed description..."
                                        class="desc-edit-txt"
                                        v-model="task.description"
                                    ></textarea>
                                    <div class="edit-btns">
                                        <button
                                            @click.stop="isEditingDesc = false; setDescTxt()"
                                        >Save</button>
                                        <span
                                            class="desc-close-icon"
                                            @click.stop="isEditingDesc = false; task.description = currDescTxt"
                                        ></span>
                                    </div>
                                </div>
                            </div>
                            <button
                                class="edit-btn"
                                v-if="!isEditingDesc && task.description"
                                @click.stop="isEditingDesc = true"
                            >Edit</button>
                        </div>
                        <div class="task-details-attachments" v-if="task.attachments?.length">
                            <span class="icon attachments-icon"></span>
                            <h2>Attachments</h2>
                            <div class="attachment" v-for="attachment in task.attachments">
                                <div class="attachment-pic">
                                    <img
                                        :src="attachment.url"
                                        v-if="attachment.resource_type === 'image'"
                                    />
                                </div>

                                <div class="attachment-main">
                                    <div class="header">
                                        <h4>
                                            {{ attachment.original_filename }}.{{ attachment.format }}
                                            <span
                                                class="icon arrow-icon"
                                            ></span>
                                        </h4>
                                    </div>
                                    <p>
                                        Added ... ago -
                                        <button>Comment</button> -
                                        <button
                                            @click="onDeleteAttachment(attachment.asset_id)"
                                        >Delete</button> -
                                        <button>Edit</button>
                                    </p>
                                    <button
                                        v-if="coverPhoto !== attachment.url"
                                        class="make-cover-btn"
                                        @click.stop="onSetPhoto(attachment.url)"
                                    >
                                        <span class="icon cover-icon"></span>
                                        <span>Make cover</span>
                                    </button>
                                    <button
                                        v-if="coverPhoto === attachment.url"
                                        class="make-cover-btn"
                                        @click.stop="onSetPhoto('')"
                                    >
                                        <span class="icon cover-icon"></span>
                                        <span>Remove cover</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <task-activities @add-comment="addComment" :comments="task.comments"></task-activities>
                    </div>
                    <div class="actions-menu">
                        <h3>Add to card</h3>
                        <component
                            :task="task"
                            @close-action="closeAction"
                            @label-add="onAddLabel"
                            @label-set="onSetLabel"
                            @label-delete="onDeleteLabel"
                            @color-set="onSetColor"
                            @photo-set="onSetPhoto"
                            @cover-size-set="onSetCoverSize"
                            @attach-file="onAttachFile"
                            @date-set="setDate"
                            v-clickoutside="closeAction"
                            :labels="labels"
                            :is="currAction"
                            :attachments="task.attachments"
                        ></component>
                        <button>
                            <span class="icon members-icon"></span>
                            <span>Members</span>
                        </button>
                        <button @click.stop="setCurrAction('labelMenu')">
                            <span class="icon labels-icon"></span>
                            <span>Labels</span>
                        </button>
                        <button>
                            <span class="icon checklist-icon"></span>
                            <span>Checklist</span>
                        </button>
                        <button @click="setCurrAction('datesMenu')">
                            <span class="icon dates-icon"></span>
                            <span>Dates</span>
                        </button>
                        <button @click.stop="setCurrAction('attachmentMenu')">
                            <span class="icon attachment-icon"></span>
                            <span>Attachment</span>
                        </button>
                        <button
                            v-if="!task.style.color && !task.style.photo"
                            @click.stop="setCurrAction('coverMenu')"
                        >
                            <span class="icon cover-icon"></span>
                            <span>Cover</span>
                        </button>

                        <h3>Actions</h3>
                        <button @click.stop="isArchiving = !isArchiving">
                            <span class="icon archive-icon"></span>
                            <span>Archive</span>
                        </button>
                        <div class="archive-btns" v-if="isArchiving" @click.stop="archive">
                            <button @click.stop="archive">
                                <span class="icon delete-icon"></span>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
import taskActivities from './task.activities.vue'
import labelMenu from './label.menu.vue'
import coverMenu from './cover.menu.vue'
import attachmentMenu from './attachment.menu.vue'
import datesMenu from './dates.menu.vue'
import FastAverageColor from 'fast-average-color'

export default {
    data() {
        return {
            isEditingDesc: false,
            isEditingTitle: false,
            currDescTxt: '',
            currAction: '',
            coverBcg: null,
            coverPhoto: null,
            isArchiving: false,
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
            if (this.currAction) return;
            const boardId = this.$route.params.boardId;
            this.$router.push('/board/' + boardId)
        },
        setCurrAction(action) {
            this.currAction = action;
        },
        closeAction(ev) {
            ev.stopPropagation();
            this.currAction = null;
        },
        closeEditingTitle() {
            this.isEditingTitle = false;
            const boardId = this.$route.params.boardId;
            this.$store.dispatch({ type: 'saveTask', task: this.task, boardId })
        },
        async onSetLabel(labelIds) {
            try {
                this.task.labelIds = labelIds;
                const boardId = this.$route.params.boardId;
                this.$store.dispatch({ type: 'saveTask', task: this.task, boardId })
            } catch (err) {
                console.log(err);
            }
        },
        onSetColor(color) {
            delete this.task.style.photo;
            this.task.style.color = color;
            const boardId = this.$route.params.boardId;
            this.$store.dispatch({ type: 'saveTask', task: this.task, boardId });
        },
        onAddLabel(label) {
            const boardId = this.$route.params.boardId;
            this.$store.dispatch({ type: 'addLabel', label, boardId })
        },
        onDeleteLabel(labelId) {
            const boardId = this.$route.params.boardId;
            this.$store.dispatch({ type: 'deleteLabel', labelId, task: { ...this.task }, boardId })
        },
        async onSetPhoto(photo) {
            delete this.task.style.color;
            this.task.style.photo = photo;

            if (!photo) await this.onSetCoverSize('half');

            const boardId = this.$route.params.boardId;
            await this.$store.dispatch({ type: 'saveTask', task: this.task, boardId });
            this.coverPhoto = photo;
        },
        onSetCoverSize(size) {
            this.task.style.isBackground = (size === 'full') ? true : false;
            const boardId = this.$route.params.boardId;
            this.$store.dispatch({ type: 'saveTask', task: this.task, boardId })
        },
        setCoverStyle(color, photo) {
            this.coverBcg = color;
            this.coverPhoto = photo;
        },
        async onAttachFile(file) {
            this.$store.dispatch('attachFile', { file, task: this.task })
        },
        async onDeleteAttachment(id) {
            this.$store.dispatch({ type: 'deleteAttachment', id, task: this.task })
        },
        async archive() {
            this.isArchiving = false;
            const boardId = this.$route.params.boardId;
            await this.$store.dispatch({ type: 'deleteTask', taskId: this.task._id, boardId });
            this.$router.push(`/board/${boardId}`)
        },
        setDate(dueDate) {
            dueDate.dueDate = Date.parse(dueDate.dueDate.toString())
            this.$store.dispatch({ type: 'setDate', task: this.task, dueDate })
        },
        updateTask() {
            const boardId = this.$route.params.boardId;
            this.$store.dispatch({ type: 'saveTask', task: this.task, boardId })
        }

    },
    computed: {
        task() {
            return this.$store.getters.currTask;
        },
        labels() {
            return this.$store.getters.boardLabels;
        },
        dueDate() {
            if (!this.$store.getters.currTask.dueDate.dueDate) return;
            let date = new Date(this.$store.getters.currTask.dueDate.dueDate)
            const options = { month: 'short' };
            date = `${new Intl.DateTimeFormat('en-US', options).format(date)} ${date.getDate()}, ${date.getFullYear()}`
            return date;
        }
    },
    components: {
        taskActivities,
        labelMenu,
        coverMenu,
        attachmentMenu,
        datesMenu
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
        },
        'task.style': {
            async handler() {
                if (!this.task) return
                if (this.task.style.photo) {
                    console.log(this.task);
                    const fac = new FastAverageColor();
                    const color = await fac.getColorAsync(this.task.style.photo);
                    this.setCoverStyle(color.hexa, this.task.style.photo)
                    // this.$refs.detailsCover.style.backgroundImage = `url(${this.task.style.photo})`
                }
                else if (this.task.style.color) {
                    this.setCoverStyle(this.task.style.color, null)
                }
            },
            immediate: true,
            deep: true
        },
    }
}
</script>