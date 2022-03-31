<template>
    <div class="task-details-attachments">
        <span class="icon attachments-icon"></span>
        <h2>Attachments</h2>
        <div class="attachment" v-for="attachment in attachments">
            <div class="attachment-pic">
                <img :src="attachment.url" v-if="attachment?.resource_type === 'image'" />
            </div>

            <div class="attachment-main">
                <div class="header">
                    <h4>
                        {{ attachment.original_filename }}.{{ attachment.format }}
                        <span
                            class="icon arrow-icon"
                        ></span>
                    </h4>
                </div>
                <p>
                    Added ... ago -
                    <button>Comment</button> -
                    <button @click="onDeleteAttachment(attachment.asset_id)">Delete</button> -
                    <button>Edit</button>
                </p>
                <button
                    v-if="coverPhoto !== attachment.url"
                    class="make-cover-btn"
                    @click.stop="onSetPhoto(attachment.url)"
                >
                    <span class="icon cover-icon"></span>
                    <span>Make cover</span>
                </button>
                <button
                    v-if="coverPhoto === attachment.url"
                    class="make-cover-btn"
                    @click.stop="onSetPhoto('')"
                >
                    <span class="icon cover-icon"></span>
                    <span>Remove cover</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        attachments: Array,
        coverPhoto: String
    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        onDeleteAttachment(id) {
            this.$emit('delete-attachment', id)
        },
        onSetPhoto(photo) {
            this.$emit('set-photo', photo)
        }
    },
    computed: {

    }
}
</script>