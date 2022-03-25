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
                    <div class="half-cover">
                        <div class="head" :style="{backgroundColor: coverColor}"></div>
                        <div class="cover-content">
                            <div class="row-lg" :style="{backgroundColor: task.style.color? '#6B778C' : '#cfd3db'}"></div>
                            <div class="row-sml" :style="{backgroundColor: task.style.color? '#6B778C' : '#cfd3db'}"></div>
                            <div class="cover-show-bottom">
                                <div class="cover-show-btns">
                                    <div class="cover-show-btn" :style="{backgroundColor: task.style.color? '#6B778C' : '#cfd3db'}"></div>
                                    <div class="cover-show-btn" :style="{backgroundColor: task.style.color? '#6B778C' : '#cfd3db'}"></div>
                                </div>
                                <div class="cover-show-member" :style="{backgroundColor: task.style.color? '#6B778C' : '#cfd3db'}"></div>
                            </div>
                        </div>
                    </div>
                    <div class="full-cover" :style="{backgroundColor: coverColor}">
                        <div class="cover-content">
                            <div class="row-lg" :style="{backgroundColor: task.style.color? '#6B778C' : '#FFF'}"></div>
                            <div class="row-sml" :style="{backgroundColor: task.style.color? '#6B778C' : '#FFF'}"></div>
                        </div>
                    </div>
                </div>
                <button>Remove cover</button>
            </div>
            <h4>Colors</h4>
            <div class="colors-container">
                <div v-for="color in colors" :key="color">
                    <span class="color" @click="setTaskColor(color)" :style="{ backgroundColor: color }"></span>
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
                '#172B4D']
        }
    },
    created() {
        if (!this.task.style) {
            this.task.style = {};
        }
    },
    methods:{
        setTaskColor(color){
            this.$emit('color-set', color)
        }
    },
    computed: {
        coverColor() {
            return this.task.style.color ? this.task.style.color : '#cfd3db'
        }
    }
}
</script>