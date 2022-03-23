import { utilService } from './util.service.js';
import { storageService } from './async-storage-service.js';
export const boardService = {
  query,
  addBoard,
  updateBoard,
  getBoard,
  removeBoard,
  saveGroup,
  removeGroup,
  saveTask,
  getTask,
  removeTask,
};

const KEY = 'board';

// BOARD CRUD

async function query() {
  try {
    const boards = await storageService.query(KEY);
    if (!boards.length) {
      const board = await _makeBoard();
      boards.push(board);
    }
    return boards;
  } catch (err) {
    throw err;
  }
}

async function addBoard(title) {
  const boardToSave = _getEmptyBoard();
  boardToSave.createdAt = Date.now();
  boardToSave.title = title;

  try {
    return await storageService.post(KEY, boardToSave);
  } catch (err) {
    throw err;
  }
}

async function updateBoard(board) {
  try {
    return await storageService.put(KEY, board);
  } catch (err) {
    throw err;
  }
}

async function getBoard(boardId) {
  try {
    const board = await storageService.get(KEY, boardId);
    return board;
  } catch (err) {
    throw err;
  }
}

async function removeBoard(boardId) {
  try {
    return await storageService.remove(KEY, boardId);
  } catch (err) {
    throw err;
  }
}

// GROUP CRUD

async function saveGroup(boardId, group) {
  try {
    const board = await getBoard(boardId);
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
    const board = await getBoard(boardId);
    const idx = board.groups.findIndex((g) => g._id === groupId);
    board.groups.splice(idx, 1);
    return await updateBoard(board);
  } catch (err) {
    throw err;
  }
}

// TASK CRUD

async function saveTask(task, groupId, boardId) {
  try {
    const board = await getBoard(boardId);
    const group = board.groups.find((g) => g._id === groupId);
    if (task._id) {
      const idx = group.tasks.findIndex((t) => t._id === task._id);
      group.tasks[idx] = task;
      await updateBoard(board);
      return task;
    } else {
      const taskToAdd = _createTask(task.title);
      group.push(taskToAdd);
      await updateBoard(board);
      return taskToAdd;
    }
  } catch (err) {
    throw err;
  }
}

async function getTask(taskId, boardId) {
  const board = await getBoard(boardId);
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
    const board = await getBoard(boardId);
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

function _getEmptyBoard() {
  return {
    groups: [],
    style: {},
    members: [],
    activities: [],
  };
}

function _createTask(title) {
  return {
    title,
    description: '',
    _id: utilService.makeId(),
    createdAt: Date.now(),
  };
}

async function _makeBoard() {
  try {
    const board = {
      title: 'Robot dev proj',
      createdAt: 1589983468418,
      createdBy: {
        _id: 'u101',
        fullname: 'Abi Abambi',
        imgUrl:
          'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
      },
      style: {},
      labels: [
        {
          _id: 'l101',
          title: 'Done',
          color: '#61bd4f',
        },
        {
          _id: 'l102',
          title: 'Progress',
          color: '#61bd33',
        },
      ],
      members: [
        {
          _id: 'u101',
          fullname: 'Tal Tarablus',
          imgUrl:
            'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
        {
          _id: 'u102',
          fullname: 'Tal Tarablus',
          imgUrl:
            'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
      ],
      groups: [
        {
          _id: 'g101',
          title: 'Group 1',
          tasks: [
            {
              _id: 'c101',
              title: 'Replace logo',
            },
            {
              _id: 'c102',
              title: 'Add Samples',
            },
          ],
          // "style": {} style is not editable in trello
        },
        {
          _id: 'g102',
          title: 'Group 2',
          tasks: [
            {
              _id: 'c103',
              title: 'Do that',
            },
            {
              _id: 'c104',
              title: 'Help me',
              status: 'in-progress',
              description: 'description',
              comments: [
                {
                  _id: 'ZdPnm',
                  txt: 'also @yaronb please CR this',
                  createdAt: 1590999817436.0,
                  byMember: {
                    _id: 'u101',
                    fullname: 'Tal Tarablus',
                    imgUrl:
                      'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              checklists: [
                {
                  _id: 'YEhmF',
                  title: 'Checklist',
                  todos: [
                    {
                      _id: '212jX',
                      title: 'To Do 1',
                      isDone: false,
                    },
                  ],
                },
              ],
              members: [
                {
                  _id: 'u101',
                  username: 'Tal',
                  fullname: 'Tal Tarablus',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
              labelIds: ['l101', 'l102'],
              createdAt: 1590999730348,
              dueDate: 16156215211,
              byMember: {
                _id: 'u101',
                // "username": "Tal", not sure if necessary
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                bgColor: '#26de81',
              },
            },
          ],
          // "style": {}
        },
      ],
      activities: [
        {
          _id: 'a101',
          txt: 'Changed Color',
          createdAt: 154514,
          byMember: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl:
              'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
          task: {
            _id: 'c101',
            title: 'Replace Logo',
          },
        },
      ],
    };
    const savedBoard = await storageService.post(KEY, board);
    return savedBoard;
  } catch (err) {
    throw err;
  }
}
