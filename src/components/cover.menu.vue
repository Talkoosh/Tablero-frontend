<template>
    <section class="cover-menu">
        <div class="cover-menu-header">
            <h3 class="menu-title">Cover</h3>
            <span class="cover-menu-exit" @click="closeAction"></span>
        </div>
        <hr />
        <div class="main">
            <h4>Size</h4>
            <div class="cover-size-container">
                <div class="imgs-container">
                    <div
                        ref="halfCover"
                        class="half-cover"
                        @click="setCoverSize('half')"
                        :style="{ pointerEvents: (task.style.color || task.style.photo) ? 'auto' : 'none', boxShadow: !task.style.isBackground ? (isCoverActive ? '0 0 0 2px #ffffff, 0 0 0 4px #0079bf' : '') : '' }"
                    >
                        <div class="head" :style="{ backgroundColor: coverColor, background: this.task.style.photo }"></div>
                        <div class="cover-content">
                            <div
                                class="row-lg"
                                :style="{ backgroundColor: task.style.color ? '#6B778C' : '#cfd3db' }"
                            ></div>
                            <div
                                class="row-sml"
                                :style="{ backgroundColor: task.style.color ? '#6B778C' : '#cfd3db' }"
                            ></div>
                            <div class="cover-show-bottom">
                                <div class="cover-show-btns">
                                    <div
                                        class="cover-show-btn"
                                        :style="{ backgroundColor: task.style.color ? '#6B778C' : '#cfd3db' }"
                                    ></div>
                                    <div
                                        class="cover-show-btn"
                                        :style="{ backgroundColor: task.style.color ? '#6B778C' : '#cfd3db' }"
                                    ></div>
                                </div>
                                <div
                                    class="cover-show-member"
                                    :style="{ backgroundColor: task.style.color ? '#6B778C' : '#cfd3db' }"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div
                        ref="fullCover"
                        class="full-cover"
                        @click="setCoverSize('full')"
                        :style="{ backgroundColor: coverColor, pointerEvents: task.style.color ? 'auto' : 'none', boxShadow: task.style.isBackground ? (isCoverActive ? '0 0 0 2px #ffffff, 0 0 0 4px #0079bf' : '') : '' }"
                    >
                        <div class="cover-content">
                            <div
                                class="row-lg"
                                :style="{ backgroundColor: task.style.color ? '#6B778C' : '#FFF' }"
                            ></div>
                            <div
                                class="row-sml"
                                :style="{ backgroundColor: task.style.color ? '#6B778C' : '#FFF' }"
                            ></div>
                        </div>
                    </div>
                </div>
                <button v-if="task.style.color" @click="setTaskColor('')">Remove cover</button>
            </div>
            <h4>Colors</h4>
            <div class="colors-container">
                <div v-for="color in colors" :key="color">
                    <span
                        class="color"
                        @click="setTaskColor(color)"
                        :style="{ backgroundColor: color, boxShadow: task.style.color === color ? '0 0 0 2px #ffffff, 0 0 0 4px #0079bf' : '' }"
                    ></span>
                </div>
            </div>
            <h4>Photos from Unsplash</h4>
            <div class="photos-container">
                <div @click="setTaskPhoto(img)" v-for="img in imgs" :key="img">
                    <img :src="img" alt="">
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    props: {
        task: Object,
    },
    data() {
        return {
            colors: ['#7BC86C',
                '#F5DD29',
                '#FFAF3F',
                '#EF7564',
                '#CD8DE5',
                '#5BA4CF',
                '#29CCE5',
                '#6DECA9',
                '#FF8ED4',
                '#172B4D'],
            imgs: [
                'https://images.unsplash.com/photo-1647249791223-1fe922c91eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgyOTk2NzQ&ixlib=rb-1.2.1&q=80&w=1080',
                'https://images.unsplash.com/photo-1647249791223-1fe922c91eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgyOTk2NzQ&ixlib=rb-1.2.1&q=80&w=1080',
                'https://images.unsplash.com/photo-1647249791223-1fe922c91eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgyOTk2NzQ&ixlib=rb-1.2.1&q=80&w=1080',
                'https://images.unsplash.com/photo-1647249791223-1fe922c91eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgyOTk2NzQ&ixlib=rb-1.2.1&q=80&w=1080',
                'https://images.unsplash.com/photo-1647249791223-1fe922c91eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgyOTk2NzQ&ixlib=rb-1.2.1&q=80&w=1080',
                'https://images.unsplash.com/photo-1647249791223-1fe922c91eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgyOTk2NzQ&ixlib=rb-1.2.1&q=80&w=1080',
            ]
        }
    },
    created() {
        if (!this.task.style) {
            this.task.style = {};
        }
    },
    methods: {
        setTaskColor(color) {
            this.isCoverActive = color ? true : false;
            this.$emit('color-set', color)
        },
        setTaskPhoto(photo){
            this.isCoverActive = photo ? true : false; 
            this.$emit('photo-set', photo)
        },
        setCoverSize(size) {
            this.$emit('cover-size-set', size)
        },
        closeAction(ev) {
            this.$emit('close-action', ev);
        }
    },
    computed: {
        coverColor() {
            return this.task.style.color ? this.task.style.color : '#cfd3db'
        },
        isCoverActive() {
            return this.task.style.color ? true : false;
        },
        currColor(){
            return this.task.style.color;
        },
        currPhoto(){
            return this.style.style.photo;
        }

    }
}
</script>