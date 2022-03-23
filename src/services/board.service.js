import { utilService } from './util.service.js';
import { storageService } from './async-storage-service.js';
export const boardService = {
  query,
  addBoard,
  updateBoard,
  getBoard,
  saveGroup,
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

// GROUP CRUD

async function saveGroup(boardId, group) {
  const board = await getBoard(boardId);
  try {
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

// TASK CRUD

function saveTask(task, groupId, boardId) {
  const board = storageService.get(KEY, boardId);
  const group = board.groups.find();
}

function _getEmptyBoard() {
  return {
    groups: [],
    style: {},
    members: [],
    activities: [],
  };
}

function _getEmptyTask() {}

async function _makeBoard() {
  try {
    const board = {
      title: 'Robot dev proj',
      createdAt: 1589983468418,
      createdBy: {
        _id: 'u101',
        fullname: 'Abi Abambi',
        imgUrl: 'http://some-img',
      },
      style: {},
      labels: [
        {
          id: 'l101',
          title: 'Done',
          color: '#61bd4f',
        },
        {
          id: 'l102',
          title: 'Progress',
          color: '#61bd33',
        },
      ],
      members: [
        {
          _id: 'u101',
          fullname: 'Tal Tarablus',
          imgUrl: 'https://www.google.com',
        },
      ],
      groups: [
        {
          id: 'g101',
          title: 'Group 1',
          tasks: [
            {
              id: 'c101',
              title: 'Replace logo',
            },
            {
              id: 'c102',
              title: 'Add Samples',
            },
          ],
          // "style": {} style is not editable in trello
        },
        {
          id: 'g102',
          title: 'Group 2',
          tasks: [
            {
              id: 'c103',
              title: 'Do that',
            },
            {
              id: 'c104',
              title: 'Help me',
              status: 'in-progress',
              description: 'description',
              comments: [
                {
                  id: 'ZdPnm',
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
                  id: 'YEhmF',
                  title: 'Checklist',
                  todos: [
                    {
                      id: '212jX',
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
            imgUrl: 'http://some-img',
          },
          task: {
            id: 'c101',
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
