<template>
    <nav class="board-nav">
        <header>
            <div class="title">
                <h3>{{ currNav || 'Menu' }}</h3>
            </div>
            <div class="close-menu">
                <span @click="closeMenu" class="close-icon"></span>
            </div>
            <div :style="backPos" @click="currNav = prevPage" class="back-menu">
                <span class="back-icon"></span>
            </div>
            <hr class="menu-header-divider" />
        </header>
        <div class="main-menu">
            <div v-if="currNav === 'Menu'" class="menu-home">
                <div @click="currNav = 'Change background'" class="change-bg">
                    <span class="bg-display" :style="displayBg"></span>
                    <h4>Change background</h4>
                </div>
            </div>
            <div class="change-bg" :style="changeBgPos">
                <div @click="setCurrNav('Photos')" class="photos-card-container">
                    <div class="photos-card"></div>
                    <div class="title">Photos</div>
                </div>
                <div @click="setCurrNav('Colors')" class="colors-card-container">
                    <div class="colors-card"></div>
                    <div class="title">Colors</div>
                </div>
            </div>
            <div :style="colorsPos" class="bg-colors">
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
            <div :style="photosPos" class="bg-photos">
                <div
                    class="photo-card"
                    v-for="photo in photos"
                    :style="'background-image: url(' + photo + ')'"
                    @click="changeBoardBgp(photo)"
                ></div>
            </div>
        </div>
    </nav>
</template>

<script>import { photoService } from "../services/photo.service.js"

export default {
    props: {
        board: Object,
    },
    components: {},
    async created() {
        const photos = await photoService.loadDefaultPhotos()
        this.photos = photos
    },
    data() {
        return {
            currNav: 'Menu'
        }
    },
    methods: {
        setCurrNav(nav) {
            this.currNav = nav
        },
        changeBoardBgc(bgc) {
            this.$emit('change-board-bgc', bgc)
            this.$store.commit({ type: 'changeHeaderBgc', bgc })
        },
        closeMenu() {
            this.$emit('close-menu')
        },
        changeBoardBgp(url) {
            this.$emit('change-board-bgp', url)
            this.$store.commit({ type: 'changeHeaderBgc', bgc: '#026aa7' })
        },
    },
    computed: {
        displayBg() {
            if (!this.board) return

            if (this.board.style.photo) return `background-image: url(${this.board.style.photo})`
            return `background-color: ${this.board.style.backgroundColor}`
        },
        prevPage() {
            switch (this.currNav) {
                case 'Colors':
                    return 'Change background'
                // break
                case 'Photos':
                    return 'Change background'
                // break
                case 'Change background':
                    return 'Menu'
            }
        },
        backPos() {
            return this.currNav === 'Menu' ? 'transform: translateX(-50px)' : 'transform: translateX(0)'
        },
        changeBgPos() {
            return this.currNav === 'Change background' ? 'transform: translateX(0px)' : 'transform: translateX(600px); position: absolute'
        },
        colorsPos() {
            return this.currNav === 'Colors' ? 'transform: translateX(0px)' : 'transform: translateX(600px); position: absolute'
        },
        photosPos() {
            return this.currNav === 'Photos' ? 'transform: translateX(0px)' : 'transform: translateX(600px); position: absolute'
        }
    },
    unmounted() { },
}
</script>