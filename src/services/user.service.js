import { httpService } from './http.service.js'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service.js'
// var gWatchedUser = null;

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
}

// Debug technique
window.userService = userService


async function getUsers(searchName) {
    return httpService.get(`user`, searchName)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    gWatchedUser = user;
    return user;
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    return user;
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    // socketService.emit('set-user-socket', user._id);
    return user;
}
async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)

    // socketService.emit('set-user-socket', user._id);
    return user;
}
async function logout() {
    // socketService.emit('unset-user-socket');
    return await httpService.post('auth/logout')
}


async function getLoggedinUser() {
    try {
        var user = await httpService.get('auth/loggedinUser');
        return user;
    } catch (err) {
        throw err;
    }
}
// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//     var user = getLoggedinUser()
//     // Dev Helper: Listens to when localStorage changes in OTHER browser

//     // Here we are listening to changes for the watched user (comming from other browsers)
//     window.addEventListener('storage', async () => {
//         if (!gWatchedUser) return;
//         const freshUsers = await storageService.query('user')
//         const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
//         if (!watchedUser) return;
//         if (gWatchedUser.score !== watchedUser.score) {
//             console.log('Watched user score changed - localStorage updated from another browser')
//             socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
//         }
//         gWatchedUser = watchedUser
//     })
// })();

// This is relevant when backend is connected
// (async () => {
//     var user = getLoggedinUser()
//     if (user) socketService.emit('set-user-socket', user._id)
// })();

