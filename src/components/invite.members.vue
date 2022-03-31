<template>
    <section class="add-member-container" :style="clickedPos" v-clickoutside="closeInvite">
        <header>
            <h4 class="menu-title">Invite to board</h4>
            <span class="x-icon"></span>
        </header>
        <hr />
        <div class="invite-body">
            <input
                type="text"
                placeholder="Email address or name"
                v-model.lazy="userToAdd"
                v-debounce="400"
                @input="openSearching"
                @click="openSearching"
            />

            <div class="users-to-add" v-if="usersToAdd.length">
                <div class="chosen-user" v-for="user in usersToAdd">
                    <span>{{ user.username }}</span>
                    <span @click="removeUserFromList(user._id)" class="x-icon"></span>
                </div>
            </div>

            <button
                class="add-member-btn"
                :class="isDisabled"
                :disabled="isMembersArr"
                @click="addCheckedUsers"
            >Add member{{ usersToAdd.length > 1 ? 's' : '' }}</button>
            <div
                v-if="isSearching"
                class="search-results"
                :style="results?.length ? '' : 'height: 70px'"
                v-clickoutside="closeSearching"
            >
                <div
                    v-if="!results?.length"
                    class="no-users-found"
                >Looks like that person isn't a Tablero member yet.</div>
                <div class="member-container" v-for="user in results">
                    <div @click="addMember(user)">
                        <img :src="user.imgUrl" alt />
                        <span>{{ user.username }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    props: {
        clickPos: Object,
    },
    components: {
    },
    created() {

    },
    data() {
        return {
            userToAdd: '',
            btnWidth: 71,
            btnHeight: 35,
            usersToAdd: [],
            isSearching: false,
        }
    },
    methods: {
        searchForUsers() {
            this.$store.dispatch({ type: 'searchForUsers', searchInput: this.userToAdd })
        },
        addMember(user) {
            if (this.usersToAdd.some(u => u._id === user._id)) return
            this.usersToAdd.push(user)
        },
        openSearching() {
            this.isSearching = true;
        },
        closeSearching() {
            this.isSearching = false;
        },
        addCheckedUsers() {
            this.$store.dispatch({ type: 'addCheckedUsers', users: this.usersToAdd })
            this.closeInvite()
        },
        closeInvite() {
            this.$emit('close-invite')
        },
        removeUserFromList(userId) {
            const idx = this.usersToAdd.findIndex(u => u._id === userId)
            this.usersToAdd.splice(idx, 1)
        }
    },
    computed: {
        board() {
            return this.$store.getters.currBoard
        },
        clickedPos() {
            return `left:${this.clickPos.x - this.btnWidth}px;top:${this.clickPos.y + this.btnHeight}px`
        },
        isMembersArr() {
            return (this.usersToAdd.length) ? false : true;
        },
        isDisabled() {
            return (this.usersToAdd.length) ? 'btn-enabled' : 'btn-disabled';
        },
        results() {
            return this.$store.getters.searchedUsers
        }
    },
    watch: {
        'userToAdd': {
            handler() {
                this.searchForUsers()
            }
        }
    }
}
</script>