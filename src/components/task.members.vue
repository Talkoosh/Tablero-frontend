<template>
    <section class="task-members">
        <h4>Members</h4>
        <div class="members-container">
            <div class="member" v-if="members" v-for="member in members" :key="member._id">
                <avatar-profile class="member-pic" @click="openMenu" :imgURL="member.imgUrl" :username="member.username"></avatar-profile>
            </div>
            <div @click="openMenu" class="add-member">
                <span class="icon plus-icon"></span>
            </div>
        </div>
    </section>
</template>

<script>
import avatarProfile from './avatar.profile.vue'
export default {
    props: {
        members: Array
    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        openMenu(){
            this.$emit('open-menu')
        }
    },
    computed: {

    },
    components: {
        avatarProfile
    }
}
</script>