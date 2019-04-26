<template>
    <div>
        Journal entries in my languages I am learning
        <div class="card" v-for="entry in foreignJournalEntries" v-bind:key="entry.id">
            <div @click="switchToSingleJournalEntryView(entry.id)">
                <p class="card-text">{{entry.title}}</p>
                <p class="card-text">{{entry.sentences.foreignLanguage}}</p>
                <p class="card-text">{{entry.sentences.nativeLanguage}}</p>

                <div class="" v-for="(sentence, index) in entry.sentences" v-if="index <= 3" v-bind:key="sentence.id">
                    <div class="card-text">{{sentence.foreignText}}</div>
                </div>
            </div>
        </div>

        <hr>
        Journal entries in my native languages
        <div class="card" v-for="entry in nativeJournalEntries" v-bind:key="entry.id">
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
    import axios from 'axios'
    export default {
        name: "relevant-journal-entries",
        data: () => {
            return {
                blag: '',
                foreignJournalEntries: [],
                nativeJournalEntries: [],
                selectedThread: ''
            }
        },
        created: function () {
            this.fetchJournalEntriesInMyForeignLanguages();
            this.fetchJournalEntriesInMyNativeLanguages();
        },
        methods: {
            fetchJournalEntriesInMyForeignLanguages: function() {
                this.fetchJournalEntriesOfType('foreign', this.foreignJournalEntries)
            },
            fetchJournalEntriesInMyNativeLanguages: function() {
                this.fetchJournalEntriesOfType('native', this.nativeJournalEntries)
            },
            fetchJournalEntriesOfType: function(type, collection) {
                const jwt = this.$cookie.get('jwt');
                const base = process.env.VUE_APP_API_ROOT_URL;

                axios.get(`${base}/journal-entries?type=${type}&page=0&size=20`, { headers: { 'Authorization': jwt } })
                    .then(result => {
                        result.data.forEach(t => collection.push(t));
                    }, error => {
                        console.error(error)
                    })
            },
            switchToSingleJournalEntryView: function(entryId) {
                this.$router.push({name: "journal-entry", params: {threadId: entryId}});
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