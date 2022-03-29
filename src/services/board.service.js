import { utilService } from './util.service.js';
// import { storageService } from './async-storage-service.js';
import { httpService } from './http.service.js';
import { userService } from './user.service.js';

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
};

const KEY = 'board';

// BOARD CRUD

async function query() {
  try {
    const user = await userService.getLoggedinUser();
    const boards = await httpService.get(KEY, user);
    if (!boards.length) {
      const board = await _makeBoard();
      boards.push(board);
    }
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
    return await httpService.put(KEY + '/' + board._id, board);
  } catch (err) {
    throw err;
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

async function _makeBoard() {
  try {
    const board = {
      title: 'Our Trabelo Project',
      createdAt: 1589983468418,
      createdBy: {
        _id: 'u123',
        fullname: 'Guest',
        imgUrl:
          'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
      },
      style: {
        // backgroundColor: '#d19034',
        photo:
          'https://images.unsplash.com/photo-1647614224159-0f2e7d804be4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgzMjQ3ODU&ixlib=rb-1.2.1&q=80&w=1080',
      },
      labels: [
        {
          _id: 'l101',
          title: '',
          color: '#61BD4F',
        },
        {
          _id: 'l102',
          title: '',
          color: '#F2D600',
        },
        {
          _id: 'l106',
          title: '',
          color: '#FF9F1A',
        },
        {
          _id: 'l103',
          title: '',
          color: '#EB5A46',
        },
        {
          _id: 'l104',
          title: '',
          color: '#C377E0',
        },
        {
          _id: 'l105',
          title: '',
          color: '#0079BF',
        },
      ],
      members: [
        {
          _id: 'u123',
          fullname: 'Guest',
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
              style: {
                color: '#5ba4cf',
                isBackground: true,
              },
            },
            {
              _id: 'c102',
              title: 'Add Samples',
              style: {
                photo:
                  'https://images.unsplash.com/photo-1646581946674-c4f7481e6249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgzMjUwMTE&ixlib=rb-1.2.1&q=80&w=1080',
                isBackground: true,
              },
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
              style: {
                color: '#af4632',
                isBackground: false,
              },
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
              labelIds: ['l101', 'l102', 'l105'],
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
                // color: '#4abf6a',
                photo:
                  'https://images.unsplash.com/photo-1646004882332-ffbf15147f08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgzMjUwMTE&ixlib=rb-1.2.1&q=80&w=1080',
                isBackground: false,
              },
            },
          ],
          // "style": {}
        },
        {
          _id: 'g103',
          title: 'Group 3',
          tasks: [
            {
              _id: 'c107',
              title: 'Drag some stuff',
              style: {
                color: '#ff8ed4',
                isBackground: true,
              },
            },
            {
              _id: 'c120',
              title: 'Hang out',
              style: {
                photo:
                  'https://images.unsplash.com/photo-1647341083163-0a8d788f4a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgzMjU2OTE&ixlib=rb-1.2.1&q=80&w=1080',
                isBackground: false,
              },
            },
            {
              _id: 'c2837',
              title: 'Watch some views',
              style: {
                photo:
                  'https://images.unsplash.com/photo-1646324760621-5a07e65eb747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgzMjY0ODY&ixlib=rb-1.2.1&q=80&w=1080',
                isBackground: false,
              },
            },
            {
              _id: 'c42069',
              title: 'Make adventures',
              style: {
                photo:
                  'https://images.unsplash.com/photo-1646375817588-4ac38a73dc21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgzMjY0ODY&ixlib=rb-1.2.1&q=80&w=1080',
                isBackground: false,
              },
            },
          ],
          // "style": {} style is not editable in trello
        },
        {
          _id: 'g104',
          title: 'Group 4',
          tasks: [
            {
              _id: 'c394',
              title: 'Look how nice',
              style: {
                color: '#ffaf3f',
                isBackground: false,
              },
              labelIds: ['l104', 'l106', 'l103'],
            },
            {
              _id: 'c999',
              title: 'Get some sleep',
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
              labelIds: ['l101', 'l102', 'l105'],
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
                // color: '#4abf6a',
                photo:
                  'https://images.unsplash.com/photo-1634072319894-107e61606191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTM3MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgzMjU1NjM&ixlib=rb-1.2.1&q=80&w=1080',
                isBackground: true,
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
            style: {
              color: '#FA45E',
              isBackground: false,
            },
          },
        },
      ],
    };
    const savedBoard = await httpService.post(KEY, board);
    return savedBoard;
  } catch (err) {
    throw err;
  }
}
