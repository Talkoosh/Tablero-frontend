import { boardService } from '../../services/board.service.js';
export const boardStore = {
  state: {
    boards: [],
    currBoardId: null,
  },
  getters: {
    boards(state) {
      return JSON.parse(JSON.stringify(state.boards));
    },
    currBoard(state) {
      if (!state.currBoardId) return;
      console.log(state.currBoardId);
      console.log('boards', state.boards);
      const board = state.boards.find((b) => b._id === state.currBoardId);
      return JSON.parse(JSON.stringify(board));
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
  },
  actions: {
    // addComment({ commit }, { txt }) {},
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
  },
};
