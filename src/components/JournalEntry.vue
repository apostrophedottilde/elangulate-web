<template>
    <div class="container">
        <thumbnail-image></thumbnail-image>
        <div class="title-top">
            <div class="aParent">
                <h3>{{entry.title}}</h3>
            </div>
        </div>

        <div>
            <div class="card">
                <div class="lang-header">{{entry.foreignLanguage}}</div>
                <div class="" v-for="sentence in entry.sentences" v-bind:key="sentence.id + '1'">
                    <div class="card-text">{{sentence.foreignText}}</div>
                </div>

                <hr/>

                <div class="lang-header">{{entry.nativeLanguage}}</div>
                <div class="" v-for="sentence in entry.sentences" v-bind:key="sentence.id + '2'">
                    <div class="card-text">{{sentence.nativeText}}</div>
                </div>
            </div>

            <br/><br/>
            <div class="card">
                <h5>Suggest corrections</h5>
                <div class="" v-for="(sentence, index) in entry.sentences" v-bind:key="sentence.id + '3'">
                    <div class="card">
                        <div class="card-text">{{sentence.foreignText}}</div>
                        <div class="card-text greyed">{{sentence.nativeText}}</div>
                        <input type="text" v-model="currentCorrections[index]" class="form-control" value="Sentence correction"/>
                    </div>
                </div>
                <input type="button" class="btn btn-outline-dark" @click="submitCorrectionSet(currentCorrections, entry)" value="Suggest corrections"/>
            </div>
        </div>

        <div class="card correction-sets-container">
            Correction sets
            <div class="card correction-sets-list" v-for="set in liveCorrectionSets" v-bind:key="set.id">
                <div class="correction-set">
                    <div class="avatar">
                        <div class="">
                            <thumbnail-image></thumbnail-image>
                        </div>
                        <div class="">
                            Corrector: Yamrmi Bobski
                        </div>
                    </div>

                    <div class="" v-for="correction in set.corrections" v-bind:key="correction.id">
                        {{correction.title}}
                        <!--<correction v-bind:correction="correction" v-bind:originalText="findSpecificSentence(0)"></correction>-->

                        <correction v-bind:correction="correction" v-bind:originalText="findSpecificSentence(0)"></correction>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import NewCorrectionSet from "./NewCorrectionSet";
    import CorrectionSet from "./CorrectionSet";
    import Correction from "./Correction";
     export default {
        name: "journal-entry",
         components: {Correction},
         data: function () {
            return {
                id: '',
                entry: {},
                currentCorrections: [],
                liveCorrectionSets: []
            }
        },
        created() {
            this.id = this.$route.params.threadId;
            this.fetchJournalEntry(this.id);
            this.fetchCorrectionSets();
        },
         methods: {
            fetchJournalEntry: function(id) {
                const jwt = this.$cookie.get('jwt');
                axios.get(`http://localhost:9001/journal-entries/${id}`, {headers: {'Authorization': jwt}})
                    .then(result => {
                        this.entry = result.data;
                        this.currentCorrections = new Array(this.entry.sentences.length);
                    }, error => {
                        console.error(error)
                    })
            },
             fetchCorrectionSets: function() {
                 const jwt = this.$cookie.get('jwt');
                 axios.get(`http://localhost:9001/correction-sets`, {headers: {'Authorization': jwt}})
                     .then(result => {
                         this.liveCorrectionSets = result.data;
                     }, error => {
                         console.error(error)
                     })
             },
            findSpecificSentence: function(id) {
                const specificSentence = this.entry.sentences.find(s => s.id === id);
                if(specificSentence) {
                    console.log(this.entry.sentences)
                    return specificSentence.foreignText;
                }
            },
             getFullCorrection: function(correction) {
                 let fullCorrection = '';
                 correction.correctionSteps.forEach((s, i) => {
                     if(s.action === 'ADD' || s.action === 'NO_CHANGE') {
                         fullCorrection = fullCorrection.concat(s.text)
                     }
                 });
                 return fullCorrection;
             },
            submitCorrectionSet: function(corrections, entry) {
                const jwt = this.$cookie.get('jwt');
                const newCorrections = [];

                entry.sentences.forEach((e, index)=> {
                    const text = !corrections[index] ? null : corrections[index];
                    newCorrections.push({
                        sentenceId: e.id,
                        correctionText: text
                    });
                });

                const postData = {
                    journalEntryId: entry.id,
                    corrections: newCorrections
                };

                axios.post(`http://localhost:9001/correction-sets`, postData, {headers: {'Authorization': jwt}})
                    .then(result => {
                        console.log('saved correction set' + result)
                        this.liveCorrectionSets.push(result.data)
                    }, error => {
                        console.error(error)
                    })
            }
        },
    }
</script>

<style scoped>

    .avatar {
        clear: initial;
        margin-bottom: 2em;
    }

    .correction-sets-list {
        margin-left: 1em;
        margin-right: 1em;
        margin-top: 2em;
        background: #fff4f4;
    }

    .correction-set {
        margin-left: 1em;
        margin-right: 1em;
        margin-top: 2em;
    }

    .aParent div {
        float: left;
        clear: none;
    }

    .bParent div {
        clear: none;
    }

    .greyed {
        color: #9c9c9c;
        font-style: italic;
    }

    .title-top {
        margin-bottom: 2em;
    }

    .lang-header {
        text-decoration: underline;
    }

    .correction-sets-container {
        margin-top: 2em;
    }
</style>