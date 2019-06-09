<template>
    <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle="correctionSetAccordianId" variant="dark">
                <div class="avatar aParent">
                    <div class="aParent">
                        <thumbnail-image v-bind:url="creatorAvatar.profileImageUrl"></thumbnail-image>
                    </div>
                    <div  class="aParent">
                        {{creatorAvatar.username}}
                    </div>
                </div>
<!--                <div class="aParent">-->
                    <span class="when-opened">
                        <font-awesome-icon icon="chevron-down"/>
                    </span>
                    <span class="when-closed">
                        <font-awesome-icon icon="chevron-up"/>
                    </span>
<!--                </div>-->

            </b-btn>
        </b-card-header>
        <b-collapse v-bind:id="correctionSetAccordianId" visible role="tabpanel">
            <b-card-body>
                <div class="" v-for="correction in correctionSet.corrections" v-bind:key="correction.id">
                    {{correction.title}}
                    <correction v-bind:correction="correction" v-bind:originalText="findSpecificSentence(correction.sentenceId)"></correction>
                </div>
            </b-card-body>
        </b-collapse>
    </b-card>
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
            console.log('correction creator: '+ this.correctionSet.creator)
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
        computed: {
            correctionSetAccordianId: function () {
                return 'correction-set-' + this.correctionSet.id;
            }
        }
    }
</script>

<style scoped>

    .collapsed > .when-opened,
    :not(.collapsed) > .when-closed {
        display: none;
    }

    .avatar {
        clear: initial;
        margin-bottom: 2em;
    }

    .aParent div {
        float: left;
        clear: none;
    }

    .bParent div {
        clear: none;
    }
</style>