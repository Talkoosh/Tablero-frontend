<template>
    <section class="members-menu">
        <div class="members-menu-header">
            <h3 class="menu-title">Members</h3>
            <span class="icon members-menu-exit" @click="closeAction"></span>
        </div>
        <hr />
        <input type="text" placeholder="Search members" v-model.lazy="filterTxt" v-debounce="400" />
        <h4>Board members</h4>
        <div class="members-container">
            <div
                v-if="filteredMembers"
                v-for="member in filteredMembers"
                :key="member._id"
                class="member"
                @click="addMemberToTask(member._id)"
            >
                <div class="content-container">
                    <avatar-profile class="member-profile" :username="member.username" :imgURL="member.imgUrl"></avatar-profile>
                    <span class="member-username">{{ member.username }}</span>
                </div>
                <span v-if="taskMembers?.includes(member._id)" class="icon checkmark-icon"></span>
            </div>
        </div>
    </section>
</template>

<script>
import avatarProfile from './avatar.profile.vue'

export default {
    props: {
        members: Array,
        taskMembers: Array
    },
    data() {
        return {
            filterTxt: ''
        }
    },
    created() {

    },
    methods: {
        closeAction(ev) {
            this.$emit('close-action', ev)
        },
        addMemberToTask(memberId) {
            this.$emit('add-member', memberId)
        }
    },
    computed: {
        filteredMembers() {
            if (!this.filterTxt) return this.members;
            const regex = new RegExp(this.filterTxt, 'i');
            const filteredMembers = this.members.filter(m => regex.test(m.username))
            return filteredMembers
        }
    },
    components: {
        avatarProfile
    }
}
</script>