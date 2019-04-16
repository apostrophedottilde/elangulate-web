<template>
    <div>
        <div class="card" v-for="entry in journalEntries" v-bind:key="entry.id">
            <div @click="switchToSingleJournalEntryView(entry.id)">
                <p class="card-text">{{entry.title}}</p>
                <p class="card-text">{{entry.sentences.foreignLanguage}}</p>
                <p class="card-text">{{entry.sentences.nativeLanguage}}</p>

                <div class="" v-for="(sentence, index) in entry.sentences" v-if="index <= 3" v-bind:key="sentence.id">
                    <div class="card-text">{{sentence.foreignText}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import store from '../store'
    import axios from 'axios'
    const protocol = 'http';
    const host = 'localhost';
    const port = '9001';


    export default {
        name: "relevant-journal-entries",
        data: () => {
            return {
                blag: '',
                journalEntries: [{
                    sentences: {

                    }
                }],
                selectedThread: ''
            }
        },
        created: function () {
            this.fetchThreads();
        },
        methods: {
            fetchThreads: function() {
                const jwt = this.$cookie.get('jwt');
                console.log(jwt);
                axios.get('http://localhost:9001/journal-entries?page=0&size=20', { headers: { 'Authorization': jwt } })
                    .then(result => {
                        result.data.forEach(t => this.journalEntries.push(t));
                    }, error => {
                        console.error(error)
                    })
            },
            switchToSingleJournalEntryView: function(entryId) {
                this.$router.push({ name: 'journal-entry', params: { entryId }})
            }
        }
    }
</script>

<style scoped>
    .posts-list {
        padding-left: 20px;
        max-width: 56em;
    }
</style>