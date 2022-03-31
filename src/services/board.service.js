import { utilService } from './util.service.js';
// import { storageService } from './async-storage-service.js';
import { httpService } from './http.service.js';
import { userService } from './user.service.js';
import { socketService } from './socket.service.js';

export const boardService = {
  query,
  getBoardById,
  addBoard,
  updateBoard,
  removeBoard,
  saveGroup,
  removeGroup,
  getGroupIdByTaskId,
  saveTask,
  getTask,
  removeTask,
  addMembersToBoard,
};

const KEY = 'board';

// BOARD CRUD

async function query() {
  try {
    const user = await userService.getLoggedinUser();
    const boards = await httpService.get(KEY, user);
    return boards;
  } catch (err) {
    throw err;
  }
}

async function getBoardById(boardId) {
  try {
    // const boards = await query();
    const board = httpService.get(KEY + '/' + boardId);
    return board;
  } catch (err) {
    throw err;
  }
}

async function addBoard(title, style) {
  var user = await userService.getLoggedinUser();
  // user.imgUrl = 'https://icon-library.com/images/member-icon/member-icon-19.jpg';
  const boardToSave = _getEmptyBoard();
  if (user) {
    boardToSave.members.push(user)
  } else {
    boardToSave.members.push({ _id: "u123", username: 'Guest' })
  }
  boardToSave.createdAt = Date.now();
  boardToSave.title = title;
  boardToSave.style = style || {};

  try {
    return await httpService.post(KEY, boardToSave);
  } catch (err) {
    throw err;
  }
}

async function updateBoard(board) {
  try {
    board = await httpService.put(KEY + '/' + board._id, board);
    console.log('bobobobob', board)
    socketService.emit('board-updated')
    return board
  } catch (err) {
    throw err;
  }
}

async function addMembersToBoard(users, boardId) {
  try {
    const board = await getBoardById(boardId)
    users.forEach(u => {
      if (board.members.some(m => m._id === u._id)) return
      else (board.members.push(u))
    })
    return await updateBoard(board)
  } catch (err) {
    throw err
  }
}

async function removeBoard(boardId) {
  try {
    return await httpService.remove(KEY + '/' + boardId);
  } catch (err) {
    throw err;
  }
}

// GROUP CRUD

async function saveGroup(boardId, group) {
  try {
    const board = await getBoardById(boardId);
    if (group._id) {
      const idx = board.groups.findIndex((g) => g._id === group._id);
      board.groups[idx] = group;
      await updateBoard(board);
      return group;
    } else {
      const groupToAdd = {
        _id: utilService.makeId(),
        title: group.title,
        tasks: [],
      };
      board.groups.push(groupToAdd);
      await updateBoard(board);
      return groupToAdd;
    }
  } catch (err) {
    throw err;
  }
}

async function removeGroup(boardId, groupId) {
  try {
    const board = await getBoardById(boardId);
    const idx = board.groups.findIndex((g) => g._id === groupId);
    board.groups.splice(idx, 1);
    return await updateBoard(board);
  } catch (err) {
    throw err;
  }
}

// TASK CRUD

async function saveTask(task, boardId) {
  try {
    const board = await getBoardById(boardId);
    if (task._id) {
      const groupId = await getGroupIdByTaskId(task._id, boardId);
      const group = board.groups.find((g) => g._id === groupId);
      const idx = group.tasks.findIndex((t) => t._id === task._id);

      group.tasks[idx] = task;
      await updateBoard(board);
      return task;

    } else {
      const group = board.groups.find((g) => g._id === task.groupId);
      const taskToAdd = _createTask(task.title);
      group.tasks.push(taskToAdd);
      await updateBoard(board);
      return taskToAdd;
    }
  } catch (err) {
    throw err;
  }
}

async function getTask(taskId, boardId) {
  const board = await getBoardById(boardId);
  try {
    const group = board.groups.find((g) => {
      const t = g.tasks.find((t) => t._id === taskId);
      if (t) return true;
    });
    if (!group) return;
    const task = group.tasks.find((t) => t._id === taskId);
    return task;
  } catch (err) {
    throw err;
  }
}

async function removeTask(taskId, boardId) {
  try {
    const board = await getBoardById(boardId);
    const group = board.groups.find((g) => {
      const t = g.tasks.find((t) => t._id === taskId);
      if (t) return true;
    });
    if (!group) return;
    const taskIdx = group.tasks.findIndex((t) => t._id === taskId);
    group.tasks.splice(taskIdx, 1);
    return await updateBoard(board);
  } catch (err) {
    throw err;
  }
}

async function getGroupIdByTaskId(taskId, boardId) {
  try {
    const board = await getBoardById(boardId);
    const group = board.groups.find((g) => {
      const task = g.tasks.find((t) => t._id === taskId);
      if (task) return true;
    });
    return group._id;
  } catch (err) {
    throw err;
  }
}

function _getEmptyBoard() {
  return {
    isStarred: false,
    groups: [],
    style: {},
    members: [],
    activities: [],
    labels: [
      {
        _id: utilService.makeId(),
        title: '',
        color: '#61BD4F',
      },
      {
        _id: utilService.makeId(),
        title: '',
        color: '#F2D600',
      },
      {
        _id: utilService.makeId(),
        title: '',
        color: '#FF9F1A',
      },
      {
        _id: utilService.makeId(),
        title: '',
        color: '#EB5A46',
      },
      {
        _id: utilService.makeId(),
        title: '',
        color: '#C377E0',
      },
      {
        _id: utilService.makeId(),
        title: '',
        color: '#0079BF',
      },
    ],
  };
}

function _createTask(title) {
  return {
    title,
    description: '',
    _id: utilService.makeId(),
    createdAt: Date.now(),
    labelIds: [],
    style: {
      color: '',
      isBackground: false,
    },
  };
}
