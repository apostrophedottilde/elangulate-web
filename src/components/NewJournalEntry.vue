<template>
    <form>
        <div class="input-group mb-3">
            <div>
                <div class="input-group mb-3">
                    <select v-model="selectedForeignLanguage">
                        <option disabled value="">Please select <i>foreign</i> language</option>
                        <option v-for="learning in foreignLanguagesSpoken" :value="learning">
                            {{learning}}
                        </option>
                    </select>
                </div>
                <div class="input-group mb-3">
                    <select v-model="selectedNativeLanguage">
                        <option disabled value="">Please select <i>native</i> language</option>
                        <option v-for="native in nativeLanguagesSpoken" :value="native">
                            {{native}}
                        </option>
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
            <div class="input-group mb-3">
                <div class="language-selection input-group-prepend">
                    <span class="input-group-text"># {{index}}</span>
                </div>
                <input v-model="sentence.foreignText" type="text" class="native-sentence form-control"/>
            </div>

            <div class="translation-offset input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Native translation</span>
                </div>
                <input v-model="sentence.nativeText"  type="text" class="form-control" placeholder="Native translation"/>
            </div>
        </div>

        <div v-if="hasSplitParagraph !== true" class="input-group mb-3">
            <div class="language-selection input-group-prepend">
                <span class="input-group-text">Foreign text</span>
            </div>
            <input v-model="nativeParagraph" type="text" class="form-control" placeholder="Foreign paragraph"/>
        </div>

        <input v-on:click="fetchParagraphSplitIntoSentences()" type="button" value="Split paragraph into sentences" class="btn btn-primary"/>
        <input v-on:click="submitJournalEntry()" type="button" value="Submit Thread" class="btn btn-success"/>
    </form>
</template>

<script>
    import axios from 'axios'
    import jwt_decode from 'jwt-decode';


    export default {
        name: "new-journal-entry",
        data: function() {
            return {
                title: '',
                selectedForeignLanguage: '',
                selectedNativeLanguage: '',
                foreignLanguagesSpoken: [],
                nativeLanguagesSpoken: [],
                sentences: [],
                currentForeignSentence: '',
                currentNativeSentence: '',
                nativeParagraph: '',
                splitSentences: [],
                hasSplitParagraph: false,
                userId: 0
            }
        },
        created: function() {
            const jwt = this.$cookie.get('jwt');
            let decoded = jwt_decode(jwt);
            this.userId = decoded.sub;
            this.sentences = [];
            this.foreignLanguagesSpoken = this.fetchLearningLanguagesForUser(this.userId);
            this.nativeLanguagesSpoken = this.fetchNativeLanguagesForUser(this.userId);
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
            fetchParagraphSplitIntoSentences: function() {
                const jwt = this.$cookie.get('jwt');
                const base = process.env.VUE_APP_API_ROOT_URL;

                axios.post(`${base}/journal-entries/split-journal`, {
                    foreignLanguage: this.selectedForeignLanguage,
                    paragraphText: this.nativeParagraph,
                },{ headers: { 'Authorization': jwt } })
                    .then(result => {
                        this.splitSentences = result.data;
                        this.buildSentencesFromSplitParagraphText(this.splitSentences);
                        this.hasSplitParagraph = true;
                    }, error => {
                        console.error(error)
                    })
            },
            buildSentencesFromSplitParagraphText: function (split) {
                split.forEach(ss => {
                    this.sentences.push({
                        foreignText: ss,
                        nativeText: this.currentNativeSentence
                    })
                });
            },
            fetchLearningLanguagesForUser: function(userId) {
                const jwt = this.$cookie.get('jwt');
                const base = process.env.VUE_APP_API_ROOT_URL;

                return axios.get(`${base}/users/${userId}/languages-spoken?type=learning`, { headers: { 'Authorization': jwt } })
                    .then(result => {
                        return this.foreignLanguagesSpoken = result.data;
                    }, error => {
                        console.error(error)
                    })
            },
            fetchNativeLanguagesForUser: function(userId) {
                const jwt = this.$cookie.get('jwt');
                const base = process.env.VUE_APP_API_ROOT_URL;

                return axios.get(`${base}/users/${userId}/languages-spoken?type=native`, { headers: { 'Authorization': jwt } })
                    .then(result => {
                        return this.nativeLanguagesSpoken = result.data;
                    }, error => {
                        console.error(error)
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

    .native-sentence {
        background: #c9c6e3;
        color: darkslateblue;
    }

    .translation-offset {
        padding-left: 4em;
    }
</style>