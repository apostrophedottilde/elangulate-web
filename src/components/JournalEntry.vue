<template>
    <div class="container">
        <thumbnail-image v-bind:url="creatorAvatar.profileImageUrl"></thumbnail-image>
        <div class="title-top">
            <div class="aParent">
                <h3>{{title}}</h3>
            </div>
        </div>
        <div>
            <div class="card">
                <div class="lang-header">{{foreignLanguage}}</div>
                <div class="" v-for="sentence in sentences" v-bind:key="sentence.id + '1'">
                    <div class="card-text">{{sentence.foreignText}}</div>
                </div>

                <hr/>

                <div class="lang-header">{{nativeLanguage}}</div>
                <div class="" v-for="sentence in sentences" v-bind:key="sentence.id + '2'">
                    <div class="card-text">{{sentence.nativeText}}</div>
                </div>
            </div>

            <br/><br/>

            <suggested-corrections v-bind:journalEntryId="id" v-bind:sentences="sentences"></suggested-corrections>

            <div class="card correction-sets-container">
                Correction sets
                <correction-sets v-bind:journalEntryId="id" v-bind:originalSentences="sentences"></correction-sets>
            </div>
        </div>
    </div>
</template>         

<script>
    import axios from 'axios'
    import Correction from "./Correction";
    import CorrectionSets from "./CorrectionSets";
    import SuggestedCorrections from "./SuggestedCorrections";

    export default {
        name: "journal-entry",
         components: {CorrectionSets, Correction, SuggestedCorrections},
         data: function () {
            return {
                id: 0,
                creator: 0,
                title: '',
                foreignLanguage: '',
                nativeLanguage: '',
                sentences: [],
                creatorAvatar: {},
            }
        },
        created: function() {
            this.id = this.$route.params.threadId;
            this.fetchJournalEntry(this.id);
        },
         methods: {
            fetchJournalEntry: async function(id) {
                const jwt = this.$cookie.get('jwt');
                const base = process.env.VUE_APP_API_ROOT_URL;

                await axios.get(`${base}/journal-entries/${id}`, {headers: {'Authorization': jwt}})
                    .then(result => {
                        this.id =  result.data.id;
                        this.creator = result.data.creator;
                        this.title = result.data.title;
                        this.foreignLanguage =  result.data.foreignLanguage;
                        this.nativeLanguage = result.data.nativeLanguage;
                        this.sentences = result.data.sentences;
                        this.fetchAvatarForUser(this.creator);
                    })
                    .catch(err => console.log(err))
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
            submitCorrectionSet: function(corrections, entrySentences) {
                const jwt = this.$cookie.get('jwt');
                const newCorrections = [];

                entrySentences.forEach((e, index)=> {
                    const text = !corrections[index] ? null : corrections[index];
                    newCorrections.push({
                        sentenceId: e.id,
                        correctionText: text
                    });
                });

                const postData = {
                    journalEntryId: this.id,
                    corrections: newCorrections
                };
                const base = process.env.VUE_APP_API_ROOT_URL;

                axios.post(`${base}/correction-sets`, postData, {headers: {'Authorization': jwt}})
                    .then(result => {
                        console.log('saved correction set' + result)
                        this.currentCorrections.push(result.data)
                    }, error => {
                        console.error(error)
                    })
            },
             fetchAvatarForUser: function(userId) {
                 const base = process.env.VUE_APP_API_ROOT_URL;
                 const jwt = this.$cookie.get('jwt');

                 return axios.get(`${base}/users/${userId}/profile/avatar`, {
                     headers: {
                         'Authorization': jwt,
                         'Content-Type': 'multipart/form-data'
                     }
                 })
                 .then(result => {
                     console.log("AVATAR:" + JSON.stringify(result.data));
                     this.creatorAvatar =  result.data;
                 })
                 .catch(error => {
                     console.error(error)
                 })
             }
        },
    }
</script>

<style scoped>

    .correction-suggestions {
        background: #9dc0db;
    }

    .correction-sets-container {
        margin-top: 2em;
        background: #ffe6e9;
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


</style>