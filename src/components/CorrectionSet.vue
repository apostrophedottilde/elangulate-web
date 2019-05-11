<template>
    <div class="correction-set">
        <div class="avatar">
            <div class="">
                <thumbnail-image></thumbnail-image>
            </div>
            <div class="">
                Corrector: Yamrmi Bobski
            </div>
        </div>

        <div class="" v-for="correction in correctionSet.corrections" v-bind:key="correction.id">
            {{correction.title}}
            AIDS
            <correction v-bind:correction="correction" v-bind:originalText="findSpecificSentence(correction.sentenceId)"></correction>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Correction from "./Correction";
    export default {
        name: "correction-set",
        components: {Correction},
        data: function () {
            return {
                creatorAvatar: {}
            }
        },
        props: {
            correctionSet: {
                id: Number,
                creator: Number,
                journalEntryId: Number,
                corrections: [{
                    id: Number,
                    creator: Number,
                    sentenceId: Number,
                    correctionSteps: [{
                        action: String,
                        text: String,
                    }]

                }]
            },
            journalEntrySentences: [{
                id: Number,
                creator: String,
                foreignText: String,
                nativeText: String,
                foreignLanguage: String,
                nativeLanguage: String,
            }],
        },
        beforeCreate: function()  {
            console.log("about to create correction set")
        },
        created: function()  {
            console.log("created correction set")
        },
        methods: {
            // findSpecificSentence: function(sentenceId) {
            //     const specificSentence = this.sentences.find(s => s.id === sentenceId);
            //     if(specificSentence) {
            //         return specificSentence.foreignText;
            //     }
            //     return 'NOT FOUND'
            // },
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
    .avatar {
        clear: initial;
        margin-bottom: 2em;
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
</style>