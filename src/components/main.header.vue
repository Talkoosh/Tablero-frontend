<template>
  <section class="main-header">
    <img src="../img/logo.png" alt />
    <div class="main-header-dropdowns">
        <div class="workspace-drop">
            <button class="drop-btn" >Workspaces </button>
        </div>

        <div class="recent-drop">
            <button class="drop-btn" >Recent</button>
        </div>

        <div class="starred-drop">   
           <button class="drop-btn" >Starred </button>
        </div> 


       <div class="templates-drop">
          <button class="drop-btn" >Templates</button>
       </div>
       
    </div>
  </section>
</template>
<script>
// import '' from ''
export default {
  name: "",
  components: {},
  created() {},
  data() {
    return {
      board: [{
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
      }],
    };
  },
  computed: {},
  methods: {},
};
</script>