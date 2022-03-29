<template>
    <section class="dates-menu">
        <div class="dates-menu-header">
            <h3 class="menu-title">Dates</h3>
            <span class="menu-exit" @click="closeAction"></span>
        </div>
        <hr />
        <div class="main">
            <Datepicker
                menuClassName="date-picker"
                v-model="dueDate.dueDate"
                inline
                autoApply
                :enableTimePicker="false"
            />
            <button class="save-btn" @click="setDate">Save</button>
            <button class="remove-btn">Remove</button>
        </div>
        {{ dueDate.date }}
    </section>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    data() {
        return {
            dueDate: {
                dueDate: null,
                isComplete: false
            }
        }
    },
    created() {

    },
    methods: {
        setDate(){
            this.$emit('date-set', {...this.dueDate})
        }
    },
    computed: {

    },
    components: {
        Datepicker,
    }
}
</script>