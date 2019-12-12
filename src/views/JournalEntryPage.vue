<template>
    <div class="container" >
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

            <br/>
            <correction-sets v-bind:journalEntryId="id" v-bind:originalSentences="sentences"></correction-sets>
           </div>
    </div>
</template>         

<script>
    import axios from 'axios'
    import Correction from "../components/Correction";
    import CorrectionSets from "../components/CorrectionSets";
    import NewCorrectionSetSuggestion from "../components/NewCorrectionSetSuggestion";

    export default {
        name: "journal-entry",
         components: {CorrectionSets, Correction, NewCorrectionSetSuggestion},
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
             addCorrectionSet: function(correctionSet) {
                 console.log('Added a correction set and received event in JournalEntryPage.vue ' + JSON.stringify(correctionSet))
             },
            fetchJournalEntry: async function(id) {
                const jwt = this.$cookie.get('jwt');
                const base = process.env.VUE_APP_API_ROOT_URL;

                await axios.get(`${base}/journal-entries/${id}`, {headers: {'Authorization': jwt}})
                    .then(result => {
                        console.log("creator of journal entry: " + result.data.creator)
                        this.id =  result.data.id;
                        this.creator = result.data.creator;
                        this.title = result.data.title;
                        this.foreignLanguage =  result.data.foreignLanguage;
                        this.nativeLanguage = result.data.nativeLanguage;
                        this.sentences = result.data.sentences;
                        return this.creator
                    })
                    .then(this.fetchAvatarForUser)
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
    .aParent div {
        float: left;
        clear: none;
    }

    .bParent div {
        clear: none;
    }

    .title-top {
        margin-bottom: 2em;
    }

    .lang-header {
        text-decoration: underline;
    }
</style>