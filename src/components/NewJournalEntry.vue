<template>
    <form>
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
            <div class="input-group-prepend">
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
                foreignLanguage: '',
                nativeLanguage: '',
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
                const stitchedSentences = this.sentences.map((s, i) => {
                    return {
                        foreignText: this.sentences[i].foreignText,
                        nativeText: this.sentences[i].nativeText
                    }
                });

                console.log("Sentences" + JSON.stringify(stitchedSentences));

                axios.post(`http://localhost:9001/journal-entries`, {
                    title: this.title,
                    foreignLanguage: "JAPANESE",
                    nativeLanguage: "ENGLISH",
                    sentences: this.sentences
                },{ headers: { 'Authorization': jwt } })
                    .then(result => {
                        const threadId = result.data.id;
                        this.$router.push({name: "journal-entry", params: {threadId: threadId}});
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

</style>