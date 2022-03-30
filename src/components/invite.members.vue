<template>
    <section class="add-member-container" :style="clickedPos">
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
            />
            <button class="add-member-btn" :class="isDisabled" :disabled="isMembersArr">Add member</button>
            <div
                v-if="userToAdd"
                class="search-results"
                :style="results.length ? '' : 'height: 70px'"
            >
                <div
                    v-if="!results.length"
                    class="no-users-found"
                >Looks like that person isn't a Tablero member yet.</div>
                <div @click="addMember" class="member-container" v-for="user in results">
                    <img :src="user.imgUrl" alt />
                    <span>{{ user.username }}</span>
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
        }
    },
    methods: {
        searchForUsers() {
            this.$store.dispatch({ type: 'searchForUsers', searchInput: this.userToAdd })
        },
        addMember(user) {
            this.usersToAdd.push(user)
        }
    },
    computed: {
        clickedPos() {
            console.log(this.clickPos)
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