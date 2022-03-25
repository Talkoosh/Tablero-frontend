<template>
    <nav class="board-nav">
        <header>
            <div class="title">
                <h3>{{ currNav || 'Menu' }}</h3>
            </div>
            <hr class="menu-header-divider" />
        </header>
        <div class="main-menu">
            <div v-if="currNav === 'Change background'" class="change-bg">
                <div @click="setCurrNav('Photos')" class="photos-card-container">
                    <div class="photos-card"></div>
                    <div class="title">Photos</div>
                </div>
                <div @click="setCurrNav('Colors')" class="colors-card-container">
                    <div class="colors-card"></div>
                    <div class="title">Colors</div>
                </div>
            </div>
            <div v-if="currNav === 'Colors'" class="bg-colors">
                <div @click="changeBoardBgc('#0079bf')" class="color-card blue-card"></div>
                <div @click="changeBoardBgc('#d29034')" class="color-card orange-card"></div>
                <div @click="changeBoardBgc('#529739')" class="color-card green-card"></div>
                <div @click="changeBoardBgc('#af4632')" class="color-card red-card"></div>
                <div @click="changeBoardBgc('#89609e')" class="color-card purple-card"></div>
                <div @click="changeBoardBgc('#cd5a91')" class="color-card pink-card"></div>
                <div @click="changeBoardBgc('#4abf6a')" class="color-card lightgreen-card"></div>
                <div @click="changeBoardBgc('#04adcb')" class="color-card lightblue-card"></div>
                <div @click="changeBoardBgc('#838c90')" class="color-card gray-card"></div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: {
        board: Object,
    },
    components: {},
    created() { },
    data() {
        return {
            currNav: 'Change background'
        }
    },
    methods: {
        setCurrNav(nav) {
            this.currNav = nav
        },
        changeBoardBgc(bgc) {
            this.$emit('change-board-bgc', bgc)
        }
    },
    computed: {},
    unmounted() { },
}
</script>