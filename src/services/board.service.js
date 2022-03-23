import { utilService } from './util.service.js';
import { storageService } from './async-storage-service.js';
export const boardService = {
  addBoard,
  updateBoard,
  saveGroup,
};

const KEY = 'board';

// BOARD CRUD

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
    return await storageService.put(board);
  } catch (err) {
    throw err;
  }
}

// GROUP CRUD

async function saveGroup(boardId, title) {
  const board = storageService.get(KEY, boardId);
  const groupToSave = {
    _id: utilService.makeId(),
    title,
    tasks: [],
  };
  board.groups.push(groupToSave);

  try {
    await updateBoard(board)
  } catch(err){
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
