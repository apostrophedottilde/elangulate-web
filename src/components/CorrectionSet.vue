<template>
    <div class="correction-set">
        <div class="avatar">
            <div class="">
                <thumbnail-image v-bind:url="creatorAvatar.profileImageUrl"></thumbnail-image>
            </div>
        </div>

        <div class="" v-for="correction in correctionSet.corrections" v-bind:key="correction.id">
            {{correction.title}}
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
            correctionSet: Object,
            originalSentences: Array,
        },
        beforeCreate: function()  {

        },
        created: function()  {
            this.fetchAvatarForUser(this.correctionSet.creator)
        },
        methods: {
            findSpecificSentence: function (sentenceId) {
                const specificSentence = this.originalSentences.find(s => s.id === sentenceId);
                if (specificSentence) {
                    return specificSentence.foreignText;
                }
                return 'NOT FOUND'
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
                    this.creatorAvatar = result.data;
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