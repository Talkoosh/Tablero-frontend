<template>
  <section class="main-header">
    <div class="main-logo">Tablero</div>
    <div class="left-navbar">
      <div class="main-header-dropdowns">
        <div class="workspace-drop ">
          <button class="drop-btn workspace-btn">Workspaces</button>
          <div class="workspace-drop-content dropdown">
            <header class="drop-header">
              <div class="drop-header">Workspaces</div>
              <button>X</button>
            </header>
            <div class="boards-list" v-for="board in boards" :key="board._id">
              <div class="board-details">
                <div class="board-img-container">
                  <img src="" alt="" />
                </div>
                <div class="board-text">
                    <div>{{ board.title }}</div>
                    <div>{{ board.createdBy.fullname }} workspace</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="recent-drop ">
          <button class="drop-btn recent-btn">Recent</button>
          <div class="recent-drop-content dropdown">
            <header class="drop-header">
              <div class="drop-header">Recent boards</div>
              <button>X</button>
            </header>
            <div class="boards-list" v-for="board in boards" :key="board._id">
              <div class="board-details">
                <div class="board-img-container">
                  <img src="" alt="" />
                </div>
                <div class="board-text">
                    <div>{{ board.title }}</div>
                    <div>{{ board.createdBy.fullname }} workspace</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="starred-drop ">
          <button class="drop-btn starred-btn">Starred</button>
          <div class="starred-drop-content dropdown">
            <header class="drop-header">
              <div class="drop-header">Starred boards</div>
              <button>X</button>
            </header>
            <div class="boards-list" v-for="board in boards" :key="board._id">
                 <div class="board-details">
                <div class="board-img-container">
                  <img src="" alt="" />
                </div>
                <div class="corad-text">
                   <div>{{ board.title }}</div>
                   <div>{{ board.createdBy.fullname }} workspace</div>
                </div>
                <div class="star-container">
                    <span>🎁</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="templates-drop">
          <button class="drop-btn" >Templates</button>
            <div class="templatese-drop-content">
                <header>
                    <div class="drop-header">Templates</div>
                    <button>X</button>
                </header>
                <li v-for="board in boards" :key="board._id">

                </li>
            </div>
       </div> -->
      </div>
      <button class="create-board-btn drop-btn">Create</button>
      <div class="seperator"></div>
    </div>
    <div class="right-navbar">
      <div class="board-search">
        <!-- <form class="search-container" action=""> -->
          <input  class="main-input" type="text" placeholder="Search" />
        <!-- </form> -->
      </div>
      <button class="right-nav-btn">
        <span>i</span>
      </button>
      <button class="right-nav-btn">
        <span>💡</span>
      </button>
      <div>
        <span>icon</span>
      </div>
    </div>
  </section>
</template>

<script>
// import '' from ''
export default {
  name: "",
  components: {},
  created() {
  },
  data() {
    return {
      boards: [
        {
          _id: "b101",
          title: "Robot dev proj",
          createdAt: 1589983468418,
          createdBy: {
            _id: "u101",
            fullname: "Abi Abambi",
            imgUrl: "http://some-img",
          },
          style: {},
          labels: [
            {
              id: "l101",
              title: "Done",
              color: "#61bd4f",
            },
            {
              id: "l102",
              title: "Progress",
              color: "#61bd33",
            },
          ],
          members: [
            {
              _id: "u101",
              fullname: "Tal Tarablus",
              imgUrl: "https://www.google.com",
            },
          ],
          groups: [
            {
              id: "g101",
              title: "Group 1",
              tasks: [
                {
                  id: "c101",
                  title: "Replace logo",
                },
                {
                  id: "c102",
                  title: "Add Samples",
                },
              ],
              style: {},
            },
            {
              id: "g102",
              title: "Group 2",
              tasks: [
                {
                  id: "c103",
                  title: "Do that",
                },
                {
                  id: "c104",
                  title: "Help me",
                  status: "in-progress",
                  description: "description",
                  comments: [
                    {
                      id: "ZdPnm",
                      txt: "also @yaronb please CR this",
                      createdAt: 1590999817436.0,
                      byMember: {
                        _id: "u101",
                        fullname: "Tal Tarablus",
                        imgUrl:
                          "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                      },
                    },
                  ],
                  checklists: [
                    {
                      id: "YEhmF",
                      title: "Checklist",
                      todos: [
                        {
                          id: "212jX",
                          title: "To Do 1",
                          isDone: false,
                        },
                      ],
                    },
                  ],
                  members: [
                    {
                      _id: "u101",
                      username: "Tal",
                      fullname: "Tal Tarablus",
                      imgUrl:
                        "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                    },
                  ],
                  labelIds: ["l101", "l102"],
                  createdAt: 1590999730348,
                  dueDate: 16156215211,
                  byMember: {
                    _id: "u101",
                    username: "Tal",
                    fullname: "Tal Tarablus",
                    imgUrl:
                      "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                  },
                  style: {
                    bgColor: "#26de81",
                  },
                },
              ],
              style: {},
            },
          ],
          activities: [
            {
              id: "a101",
              txt: "Changed Color",
              createdAt: 154514,
              byMember: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img",
              },
              task: {
                id: "c101",
                title: "Replace Logo",
              },
            },
          ],
        },
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>