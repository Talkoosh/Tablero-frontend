<template>
    <section class="attachment-menu">
        <div class="attachment-header">
            <h3 class="menu-title">Attach from...</h3>
            <span class="icon attachment-exit" @click="closeAction"></span>
        </div>
        <hr />
        <label>
            <div class="computer-attach-container">
                <p class="computer-attach">Computer</p>
            </div>
            <input type="file" @change="attachFile" hidden />
        </label>
    </section>
</template>

<script>

    export default {
            data() {
                return {
                }
            },
            created() {
                
            },
            methods: {
              attachFile(ev){
                  this.$emit('attach-file', ev.path[0].files[0]);
              }
            },
            computed: {
              
            }
    }
</script>