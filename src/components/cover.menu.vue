<template>
    <section class="cover-menu">
        <section v-if="!isSearch" class="cover-menu-first">
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
                            :style="{ pointerEvents: (currColor || currPhoto) ? 'auto' : 'none', boxShadow: !isBackground ? (isCoverActive ? '0 0 0 2px #ffffff, 0 0 0 4px #0079bf' : '') : '' }"
                        >
                            <div
                                class="head"
                                :style="{ backgroundColor: coverSizesColor, backgroundImage: `url(${coverSizesPhoto})` }"
                            ></div>
                            <div class="cover-content">
                                <div
                                    class="row-lg"
                                    :style="{ backgroundColor: (currColor || currPhoto) ? '#6B778C' : '#cfd3db' }"
                                ></div>
                                <div
                                    class="row-sml"
                                    :style="{ backgroundColor: (currColor || currPhoto) ? '#6B778C' : '#cfd3db' }"
                                ></div>
                                <div class="cover-show-bottom">
                                    <div class="cover-show-btns">
                                        <div
                                            class="cover-show-btn"
                                            :style="{ backgroundColor: (currColor || currPhoto) ? '#6B778C' : '#cfd3db' }"
                                        ></div>
                                        <div
                                            class="cover-show-btn"
                                            :style="{ backgroundColor: (currColor || currPhoto) ? '#6B778C' : '#cfd3db' }"
                                        ></div>
                                    </div>
                                    <div
                                        class="cover-show-member"
                                        :style="{ backgroundColor: (currColor || currPhoto) ? '#6B778C' : '#cfd3db' }"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div
                            ref="fullCover"
                            class="full-cover"
                            @click="setCoverSize('full')"
                            :style="{ backgroundColor: coverSizesColor, backgroundImage: `url(${coverSizesPhoto})`, pointerEvents: isCoverActive ? 'auto' : 'none', boxShadow: isBackground ? (isCoverActive ? '0 0 0 2px #ffffff, 0 0 0 4px #0079bf' : '') : '' }"
                        >
                            <div class="cover-content">
                                <div
                                    class="row-lg"
                                    :style="{ backgroundColor: (currColor || currPhoto) ? '#6B778C' : '#FFF' }"
                                ></div>
                                <div
                                    class="row-sml"
                                    :style="{ backgroundColor: (currColor || currPhoto) ? '#6B778C' : '#FFF' }"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <button
                        v-if="currColor || currPhoto"
                        @click="setTaskColor(''); setTaskPhoto('')"
                    >Remove cover</button>
                </div>
                <h4>Colors</h4>
                <div class="colors-container">
                    <div v-for="color in colors" :key="color">
                        <span
                            class="color"
                            @click="setTaskColor(color)"
                            :style="{ backgroundColor: color, boxShadow: currColor === color ? '0 0 0 2px #ffffff, 0 0 0 4px #0079bf' : '' }"
                        ></span>
                    </div>
                </div>
                <div class="attachments">
                    <h4>Attachments</h4>
                     <div class="attachments-container">
                        <div @click="setTaskPhoto(attachment.url)" v-for="attachment in attachments" :key="attachment.asset_id">
                            <img
                                :src="attachment.url"
                                :style="{ boxShadow: currPhoto === attachment.url ? '0 0 0 2px #ffffff, 0 0 0 4px #0079bf' : '' }"
                            />
                        </div>
                    </div>
                </div>
                <div class="photos-main">
                    <h4>Photos from Unsplash</h4>
                    <div class="photos-container">
                        <div @click="setTaskPhoto(img)" v-for="img in defaultImgs" :key="img">
                            <img
                                :src="img"
                                :style="{ boxShadow: currPhoto === img ? '0 0 0 2px #ffffff, 0 0 0 4px #0079bf' : '' }"
                            />
                        </div>
                    </div>
                    <button @click.stop="isSearch = true" class="more-photos-btn">Search for photos</button>
                </div>
            </div>
        </section>
        <section v-if="isSearch" class="cover-menu-second">
            <div class="header">
                <span class="back-btn"></span>
                <h3 class="menu-title">Photo search</h3>
                <span class="close-btn"></span>
            </div>
            <hr />
            <input
                type="text"
                placeholder="Search Unsplash for photos"
                v-model.lazy="searchKey"
                v-debounce="400"
            />
            <h4>Suggested searches</h4>
            <button
                class="keyword"
                v-for="keyword in searchKeywords"
                :key="keyword"
                @click="searchKey = keyword"
            >{{ keyword }}</button>
            <h4>Top photos</h4>
            <div
                class="search-photos-container"
                :style="{ gridTemplateColumns: searchKey ? '1fr 1fr' : '1fr 1fr 1fr' }"
            >
                <img
                    v-for="img in searchPhotos"
                    :key="img"
                    :src="img"
                    @click.stop="setTaskPhoto(img)"
                />
            </div>
        </section>
    </section>
</template>

<script>

import { photoService } from '../services/photo.service.js'

export default {
    props: {
        task: Object,
        attachments: Array
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
            defaultImgs: [],
            searchKeywords: ['Productivity',
                'Perspective',
                'Organization',
                'Colorful',
                'Nature',
                'Business',
                'Minimal',
                'Space',
                'Animals'],
            isSearch: false,
            searchPhotos: [],
            searchKey: ''
        }
    },
     created() {
        if (!this.task.style) {
            this.task.style = {};
        }
        this.loadDefaultPhotos();

    },
    methods: {
        async loadDefaultPhotos() {
            const photos = await photoService.loadDefaultPhotos()
            this.defaultImgs = photos.slice(0, 6)
        },
        setTaskColor(color) {
            this.isCoverActive = color ? true : false;
            this.$emit('color-set', color)
        },
        async setTaskPhoto(photo) {
            if (this.isSearch) {
                const storagePhotos = await photoService.loadDefaultPhotos();
                storagePhotos.pop();
                storagePhotos.unshift(photo);
                photoService.savePhotosToStorage(storagePhotos);
                this.loadDefaultPhotos();
                this.isSearch = false;
                this.searchKey = '';
            }
            this.isCoverActive = photo ? true : false;
            this.$emit('photo-set', photo)
            console.log(this.task.style);
        },
        setCoverSize(size) {
            this.$emit('cover-size-set', size)
        },
        closeAction(ev) {
            this.$emit('close-action', ev);
        },
        async getPhotosBySearch() {
            const photos = await photoService.getPhotosByKeyword(this.searchKey);
            this.searchPhotos = photos;
        },
    },
    computed: {
        coverSizesColor() {
            if (this.task.style.photo) return '';
            return this.task.style.color ? this.task.style.color : '#CFD3DB'
        },
        coverSizesPhoto() {
            if (this.task.style.color) return '';
            return this.task.style.photo ? this.task.style.photo : '#CFD3DB'
        },
        isCoverActive() {
            if (this.task.style.color) return true;
            if (this.task.style.photo) return true;
            else return false;
        },
        currColor() {
            return this.task.style.color;
        },
        currPhoto() {
            return this.task.style.photo;
        },
        isBackground() {
            return this.task.style.isBackground;
        }
    },
    watch: {
        searchKey: {
            async handler() {
                if (!this.searchKey) this.searchKey = 'nature'
                this.getPhotosBySearch();
            },
            immediate: true
        },

    }
}
</script>