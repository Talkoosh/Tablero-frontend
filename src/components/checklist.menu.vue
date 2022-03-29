<template>
    <section class="checklist-menu">
        <div class="checklist-menu-header">
            <h3 class="menu-title">Add checklist</h3>
            <span class="checklist-menu-exit" @click="closeAction"></span>
        </div>
        <hr/>
        <h4>Title</h4>
        <input type="text" v-model="title">
        <button @click="setTitle">Add</button>
    </section>
</template>

<script>

export default {
    data() {
        return {
          title: 'Checklist'
        }
    },
    created() {
        
    },
    methods: {
      closeAction(ev){
          this.$emit('close-action', ev);
      },
      setTitle(){
          this.$emit('checklist-title-set', this.title);
      }
    },
    computed: {
      
    }
}
</script>