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
                <input type="text" placeholder="Photos" v-model.lazy="searchKey" v-debounce="400" />
                <span class="search-icon">
                    <svg
                        class="magnifying-glass"
                        width="18"
                        height="18"
                        role="presentation"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.2269 17.4164 13.8175 16.4356 15.0852L20.3769 19.0953C20.764 19.4892 20.7586 20.1223 20.3647 20.5095C19.9708 20.8966 19.3376 20.8911 18.9505 20.4972L15.0129 16.4909C13.7572 17.4383 12.1942 18 10.5 18ZM16 10.5C16 13.5376 13.5376 16 10.5 16C7.46243 16 5 13.5376 5 10.5C5 7.46243 7.46243 5 10.5 5C13.5376 5 16 7.46243 16 10.5Z"
                            fill="currentColor"
                        />
                    </svg>
                </span>
                <div class="photos">
                    <div
                        class="photo-card"
                        v-for="photo in searchPhotos"
                        :style="'background-image: url(' + photo + ')'"
                        @click="changeBoardBgp(photo)"
                    ></div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { photoService } from "../services/photo.service.js"

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
            currNav: 'Menu',
            photos: null,
            searchKey: '',
            searchPhotos: [],
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
        async getPhotosBySearch() {
            const photos = await photoService.getPhotosByKeyword(this.searchKey);
            this.searchPhotos = photos;
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
    watch: {
        searchKey: {
            async handler() {
                if (!this.searchKey) this.searchKey = 'nature'
                console.log(this.searchPhotos)
                this.getPhotosBySearch();
            },
            immediate: true
        },
    }
}
</script>