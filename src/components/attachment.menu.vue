<template>
    <section class="attachment-menu">
        <div class="attachment-header">
            <h3 class="menu-title">Attach from...</h3>
            <span @click="closeAction" class="icon attachment-exit"></span>
        </div>
        <hr />
        <label>
            <div class="computer-attach-container">
                <p class="computer-attach">Computer</p>
            </div>
            <input type="file" @change="attachFile" hidden />
        </label>
        <hr />
        <h3 class="link-title">Attach a link</h3>
        <input type="text" placeholder="Paste a photo link here..." v-model="photoLink">
        <button @click="attachFile(photoLink)">Attach</button>
    </section>
</template>

<script>

    export default {
            data() {
                return {
                    photoLink: null
                }
            },
            created() {
                
            },
            methods: {
              attachFile(photo){
                  let photoToSend = photo; 
                  if(typeof photo !== 'string') photoToSend = photoToSend.path[0].files[0]; 
                  this.$emit('attach-file', photoToSend);

              },
              closeAction(ev){
                  this.$emit('close-action', ev)
              }
            },
            computed: {
              
            }
    }
</script>