<template>
    <form>
        <div class="input-group mb-3">
            <div>
                <div class="input-group mb-3">
                    <select v-model="selectedForeignLanguage">
                        <option disabled value="">Please select foreign language</option>
                        <option>English</option>
                        <option>Japanese</option>
                        <option>Russian</option>
                        <option>Chinese</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Spanish</option>
                        <option>Italian</option>
                    </select>
                </div>
                <div class="input-group mb-3">
                    <select v-model="selectedNativeLanguage">
                        <option disabled value="">Please select native language</option>
                        <option>English</option>
                        <option>Italian</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" >Title</span>
            </div>
            <input v-model="title" type="text" class="form-control" placeholder="Title" aria-label="Title">
        </div>

        <div v-for="(sentence, index) in sentences" v-bind:key="index">
            Sentence {{index}}:
            <div>
                {{sentence.foreignText}}
            </div>
            <div>
                {{sentence.nativeText}}
            </div>
        </div>

        <div class="input-group mb-3">
            <div class="language-selection input-group-prepend">
                <span class="input-group-text">Foreign text</span>
            </div>
            <input v-model="currentForeignSentence" type="text" class="form-control" placeholder="Foreign text"/>
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Native translation</span>
            </div>
            <input v-model="currentNativeSentence"  type="text" class="form-control" placeholder="Native translation"/>
        </div>

        <input v-on:click="addAnotherSentence()" type="button" value="Add another sentence" class="btn btn-primary"/>
        <input v-on:click="submitJournalEntry()" type="button" value="Submit Thread" class="btn btn-success"/>
    </form>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "new-journal-entry",
        data: function() {
            return {
                title: '',
                selectedForeignLanguage: '',
                selectedNativeLanguage: '',
                sentences: [],
                currentForeignSentence: '',
                currentNativeSentence: ''
            }
        },
        created: function() {
            this.sentences = []
        },
        methods: {
            submitJournalEntry: function() {
                const jwt = this.$cookie.get('jwt');
                const base = process.env.VUE_APP_API_ROOT_URL;

                axios.post(`${base}/journal-entries`, {
                    title: this.title,
                    foreignLanguage: this.selectedForeignLanguage,
                    nativeLanguage: this.selectedNativeLanguage,
                    sentences: this.sentences
                },{ headers: { 'Authorization': jwt } })
                    .then(result => {
                        const journalId = result.data.id;
                        this.$router.push({name: "journal-entry", params: {threadId: journalId}});
                    }, error => {
                        console.error(error)
                    })
            },
            addAnotherSentence: function () {
                // this.sentences = new Array(this.sentences.length + 1)
                this.sentences.push({
                    foreignText: this.currentForeignSentence,
                    nativeText: this.currentNativeSentence
                })
            }
        }
    }
</script>

<style scoped>
    .language-selection {
        float: left;
        clear: none;
    }

    .aParent select {
        float: left;
        clear: none;
    }

    .bParent select {
        clear: none;
    }
</style>