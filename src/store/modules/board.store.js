import { boardService } from '../../services/board.service.js';
export const boardStore = {
  state: {
    boards: [],
    currBoardId: null,
    currTask: null,
  },
  getters: {
    boards(state) {
      if (!state.boards.length) return;
      return JSON.parse(JSON.stringify(state.boards));
    },
    currBoard(state) {
      if (!state.currBoardId || !state.boards.length) return;
      const board = state.boards.find((b) => b._id === state.currBoardId);
      return JSON.parse(JSON.stringify(board));
    },
    currTask(state) {
      if (!state.currTask) return;
      return JSON.parse(JSON.stringify(state.currTask));
    },
    boardLabels(state) {
      if (!state.currBoardId || !state.boards.length) return;
      const board = state.boards.find((b) => b._id === state.currBoardId);
      if (!board.labels || !board.labels.length) return;
      return JSON.parse(JSON.stringify(board.labels));
    },
  },
  mutations: {
    loadBoards(state, { boards }) {
      state.boards = boards;
    },
    setCurrBoardId(state, { boardId }) {
      state.currBoardId = boardId;
    },
    addGroup(state, { savedGroup }) {
      const boardIdx = state.boards.findIndex(
        (b) => b._id === state.currBoardId
      );
      state.boards[boardIdx].groups.push(savedGroup);
    },
    setCurrTask(state, { task, boardIdx, groupIdx, taskIdx }) {
      state.currTask = task;
      state.boards[boardIdx].groups[groupIdx].tasks[taskIdx] = task;
    },
    addTask(state, { task, groupId }) {
      const boardIdx = state.boards.findIndex(
        (b) => b._id === state.currBoardId
      );
      const group = state.boards[boardIdx].groups.find(
        (g) => g._id === groupId
      );
      group.tasks.push(task);
    },
    editGroup(state, { groupToEdit, boardId }) {
      const boardIdx = state.boards.findIndex((b) => b._id === boardId);
      const groupIdx = state.boards[boardIdx].groups.findIndex(
        (g) => g._id === groupToEdit._id
      );
      state.boards[boardIdx].groups[groupIdx] = groupToEdit;
    },
    updateBoard(state, { board }) {
      const boardIdx = state.boards.findIndex((b) => b._id === board._id);
      state.boards[boardIdx] = board;
    },
    addBoard(state, { savedBoard }) {
      console.log(savedBoard);
      state.boards.unshift(savedBoard);
    },
  },
  actions: {
    async loadBoards({ commit, state }) {
      try {
        if (state.boards.length) return;
        const boards = await boardService.query();
        commit({ type: 'loadBoards', boards });
      } catch (err) {
        throw err;
      }
    },
    async addGroup({ commit }, { boardId, groupToAdd }) {
      try {
        const savedGroup = await boardService.saveGroup(boardId, groupToAdd);
        commit({ type: 'addGroup', savedGroup });
      } catch (err) {
        throw err;
      }
    },

    async addBoard({ commit }, {boardToAdd}) {
      try {
        const savedBoard = await boardService.addBoard(boardToAdd.title,boardToAdd.style);
        commit({ type: 'addBoard', savedBoard });
      } catch (err) {
        throw err;
      }
    },
    async getTask({ commit }, { taskId, boardId }) {
      try {
        const task = await boardService.getTask(taskId, boardId);
        commit({ type: 'setCurrTask', task });
      } catch (err) {}
    },
    async saveTask({ commit, state }, { task, boardId }) {
      const editedTask = await boardService.saveTask(task, boardId);
      const board = state.boards.find((b) => b._id === boardId);
      const boardIdx = state.boards.findIndex((b) => b._id === boardId);
      const groupId = await boardService.getGroupIdByTaskId(task._id, boardId);
      console.log(groupId);
      const group = board.groups.find((g) => g._id === groupId);
      const groupIdx = board.groups.findIndex((g) => g._id === groupId);
      const taskIdx = group.tasks.findIndex((t) => t._id === task._id);
      commit({
        type: 'setCurrTask',
        task: editedTask,
        boardIdx,
        groupIdx,
        taskIdx,
      });
    },
    async addTask({ commit }, { task, boardId }) {
      const taskToAdd = await boardService.saveTask(task, boardId);
      commit({ type: 'addTask', task: taskToAdd, groupId: task.groupId });
    },
    async editGroup({ commit }, { groupToEdit, boardId }) {
      boardService.saveGroup(boardId, groupToEdit);
      commit({ type: 'editGroup', groupToEdit, boardId });
    },
    async changeBoardBgc({ commit }, { bgc, boardId }) {
      const board = JSON.parse(
        JSON.stringify(await boardService.getBoardById(boardId))
      );
      console.log(board);
      delete board.style.backgroundColor;
      delete board.style.photo;
      board.style.backgroundColor = bgc;
      await boardService.updateBoard(board);
      commit({ type: 'updateBoard', board });
    },
  },
};
