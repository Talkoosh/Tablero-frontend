<template>
    <section class="avatar">
        <div class="avatar-pic">
            <img class="avatar-img" v-if="imgURL" :src="imgURL" />
            <div class="avatar-name" v-else="username">{{ usernameInitials }}</div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        imgURL: String,
        username: String
    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {

    },
    computed: {
        usernameInitials() {
            if(!this.username) return;
            const nameArr = this.username.split(' ');
            const firstLetter = nameArr[0][0].toUpperCase()
            const secondLetter = (typeof nameArr[nameArr.length - 1][0] === 'String') ? nameArr[nameArr.length - 1][0].toUpperCase(): nameArr[nameArr.length - 1][0];
            if (nameArr.length > 1) return firstLetter + secondLetter;
            else return firstLetter

        }
    }
}
</script>