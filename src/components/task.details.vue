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
                        <div v-if="task.labelIds?.length" class="task-labels module">
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
                            v-clickoutside="closeAction"
                            :labels="labels"
                            :is="currAction"
                        ></component>
                        <button>
                            <span class="icon members-icon"></span>
                            <span>Members</span>
                        </button>
                        <button @click.stop="setCurrAction('labelMenu')">
                            <span class="icon labels-icon"></span>
                            <span>Labels</span>
                        </button>
                        <button
                            v-if="!task.style.color && !task.style.photo"
                            @click.stop="setCurrAction('coverMenu')"
                        >
                            <span class="icon cover-icon"></span>
                            <span>Cover</span>
                        </button>
                        <button>
                            <span class="icon checklist-icon"></span>
                            <span>Checklist</span>
                        </button>
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
import FastAverageColor from 'fast-average-color';

export default {
    data() {
        return {
            isEditingDesc: false,
            isEditingTitle: false,
            currDescTxt: '',
            currAction: '',
            coverBcg: null,
            coverPhoto: null
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
            this.$store.dispatch({type: 'deleteLabel', labelId, task: this.task ,boardId})
        },
        onSetPhoto(photo) {
            delete this.task.style.color;
            this.task.style.photo = photo;
            console.log(this.task.style);
            const boardId = this.$route.params.boardId;
            this.$store.dispatch({ type: 'saveTask', task: this.task, boardId });
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


    },
    computed: {
        task() {
            return this.$store.getters.currTask;
        },
        labels() {
            return this.$store.getters.boardLabels;
        },
    },
    components: {
        taskActivities,
        labelMenu,
        coverMenu
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