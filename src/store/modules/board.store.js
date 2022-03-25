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
    boardLabels(state){
      if (!state.currBoardId || !state.boards.length) return;
      const board = state.boards.find((b) => b._id === state.currBoardId);
      if(!board.labels || !board.labels.length) return;
      return JSON.parse(JSON.stringify(board.labels))
    }

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
    setCurrTask(state, { task }) {
      state.currTask = task;
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
    async getTask({ commit }, { taskId, boardId }) {
      try {
        const task = await boardService.getTask(taskId, boardId);
        commit({ type: 'setCurrTask', task });
      } catch (err) {}
    },
    async saveTask({ commit }, { task, boardId }) {
      const editedTask = await boardService.saveTask(task, boardId);
      commit({ type: 'setCurrTask', task: editedTask });
    },
    async addTask({ commit }, { task, boardId }) {
      const taskToAdd = await boardService.saveTask(task, boardId);
      commit({ type: 'addTask', task: taskToAdd, groupId: task.groupId });
    },
  },
};
