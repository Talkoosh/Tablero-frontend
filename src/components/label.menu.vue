<template>
    <section class="label-menu">
        <div v-if="!isAdding" class="label-main">
            <div class="label-menu-header">
                <h3 class="menu-title">Labels</h3>
                <span class="label-menu-exit" @click="closeAction"></span>
            </div>
            <hr />
            <div class="main">
                <input type="text" placeholder="Search labels..." />
                <h4>Labels</h4>
                <div class="label-container" v-for="label in labels" :key="label._id">
                    <span
                        @click="toggleLabel(label._id)"
                        :style="{ backgroundColor: label.color, color: labelShadowColor(label.color) }"
                        class="label"
                    >
                        <span class="label-title">{{ label.title }}</span>
                        <span class="check-icon" v-if="labelIds.includes(label._id)"></span>
                    </span>
                    <span class="label-edit-icon" @click.stop="editLabel(label)"></span>
                </div>
                <button @click.stop="toggleIsAdding" class="create-btn">Create a new label</button>
            </div>
        </div>
        <div v-else class="label-add">
            <div class="header">
                <span @click.stop="isAdding = false" class="back-icon"></span>
                <h3 class="menu-title">Create Label</h3>
                <span @click="closeAction" class="close-icon"></span>
            </div>
            <hr />
            <div class="main">
                <h4>Name</h4>
                <input type="text" v-model="labelToAdd.title" autofocus />
                <h4>Select a color</h4>
                <div class="labels-container">
                    <span
                        @click="setLabelColor(labelColor)"
                        class="labelColor"
                        v-for="labelColor in labelColors"
                        :key="labelColor"
                        :style="{ backgroundColor: labelColor }"
                    >
                        <span class="check-icon" v-if="labelToAdd.color === labelColor"></span>
                    </span>
                    <div class="text">
                        <p class="txt-no-color">No color.</p>
                        <p class="txt-lng-no-color">This won't show up on the front of cards.</p>
                    </div>
                </div>
                <button @click.stop="onAddLabel" v-if="!labelToAdd._id" class="add-btn">Create</button>
                <div class="edit-btns" v-else>
                    <button @click.stop="onAddLabel" class="save-btn">Save</button>
                    <button @click.stop="onDeleteLabel" class="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    props: {
        labels: Array,
        task: Object
    },
    data() {
        return {
            labelToAdd: {
                title: '',
                color: '#61BD4F'
            },
            labelColors: [
                '#61BD4F',
                '#F2D600',
                '#FF9F1A',
                '#EB5A46',
                '#C377E0',
                '#0079BF',
                '#00c2e0',
                '#51e898',
                '#ff78cb',
                '#344563',
                '#b3bac5'
            ],
            isAdding: false
        }
    },
    created() {
        if (!this.task.labelIds) this.task.labelIds = [];
    },
    methods: {
        toggleIsAdding(){
            this.isAdding = true;
        },
        closeAction(ev) {
            this.$emit('close-action', ev);
        },
        toggleLabel(labelId) {
            if (this.labelIds.includes(labelId)) {
                const idx = this.labelIds.findIndex(id => id === labelId);
                this.labelIds.splice(idx, 1);
            } else {
                this.labelIds.push(labelId)
            }
            this.$emit('label-set', this.labelIds)
        },
        setLabelColor(color) {
            this.labelToAdd.color = color;
        },
        onAddLabel() {
            if (!this.labelToAdd.title) return;
            this.$emit('label-add', {...this.labelToAdd});
            this.isAdding = false
            this.labelToAdd = {
                title: '',
                color: ''
            }
        },
        editLabel(label) {
            this.labelToAdd = {...label}
            this.isAdding = true;
        },
        onDeleteLabel() {
            this.$emit('label-delete', this.labelToAdd._id);
            this.isAdding = false;
            this.labelToAdd = {
                title: '',
                color: ''
            }
        }


    },
    computed: {
        labelIds() {
            return this.task.labelIds
        },
        labelShadowColor() {
            return shadowColor => {
                shadowColor = shadowColor.toUpperCase();
                switch (shadowColor) {
                    case '#61BD4F':
                        return '#529739'
                    case '#F2D600':
                        return '#D9B41C'
                    case '#FF9F1A':
                        return '#CD8313'
                    case '#EB5A46':
                        return '#AF4632'
                    case '#C377E0':
                        return '#89609E'
                    case '#0079BF':
                        return '#055A8C'
                    case '#00C2E0':
                        return '#0098B7'
                    case '#51E898':
                        return '#4BBF6B'
                    case '#FF78CB':
                        return '#C9558F'
                    case '#344563':
                        return '#091E42'
                    case '#B3BAC5':
                        return '#97a0af'
                }
            }
        }
    },
    components: {
    }
}
</script>