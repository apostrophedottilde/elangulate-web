<template>
    <div class="stitched-collection">
        <div class="card">
            <div class="original-text">
                {{originalText}}
            </div>

            <div class="">
                <div class="aParent" v-for="step in correction.correctionSteps" v-bind:key="step.id">
                    <div class="ins" v-if="step.action=='ADD'">{{step.text}}</div>
                    <div class="del" v-if="step.action=='REMOVE'">{{step.text}}</div>
                    <div class="no-change" v-if="step.action=='NO_CHANGE'">{{step.text}}</div>
                </div>
            </div>

            <div class="card reviews-container">
                <div>
                    <input type="text" class="form-control" v-model="commentInput" value="Comment on review"/>
                    <input type="button" class="btn btn-outline-danger" @click="sumbitReview()" value="Review corrections"/>
                </div>

                <div class="card reviews" v-for="review in reviews" v-bind:key="review.id">
                    Stars: {{review.stars}}
                    Comment: {{review.comment}}
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "correction",
        props: {
            correction: {
                id: Number,
                correctionSteps: {
                    action: String,
                    text: String
                }
            },
            originalText: String
        },
        data: function() {
            return {
                commentInput: '',
                starsInput: 0,
                isPerfectCorrectionInput: false,
                reviews: []
            }
        },
        created: function() {
            console.log(this.correction);
            this.fetchCorrectionReviews();
        },
        methods: {
            getFullCorrection: function(correction) {
                let fullCorrection = '';
                correction.correctionSteps.forEach(s => {
                    if(s.action === 'ADD' || s.action === 'NO_CHANGE') {
                        fullCorrection = fullCorrection.concat(s.text)
                    }
                });
                return fullCorrection;
            },
            fetchCorrectionReviews: function() {
                const jwt = this.$cookie.get('jwt');
                const base = process.env.VUE_APP_API_ROOT_URL;

                axios.get(`${base}/correction-reviews?correctionId=${this.correction.id}`, {headers: {'Authorization': jwt}})
                    .then(result => {
                        this.reviews = result.data;
                        console.log("Reviews: " + JSON.stringify(this.reviews))
                    }, error => {
                        console.error(error)
                    })
            },
            sumbitReview: function() {
                const jwt = this.$cookie.get('jwt');
                const base = process.env.VUE_APP_API_ROOT_URL;

                axios.post(`${base}/correction-reviews?correctionId=${this.correction.id}`, {
                        stars: 6,
                        comment: this.commentInput
                    }, {headers: {'Authorization': jwt}})
                    .then(result => {
                        this.reviews.push(result.data);
                        console.log("New Review: " + JSON.stringify(result.data))
                    }, error => {
                        console.error(error)
                    })
            }
        }
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

    .reviews {
        margin-left: 1em;
        margin-right: 1em;
        margin-top: 1em;
        background: #e9e7ff;
    }

    .reviews-container {
        margin-left: 1em;
        margin-right: 1em;
        margin-top: 1em;
        background: #adabc3;
    }

    .full-correction {
        color: #5b5b5b;
        font-style: italic;
        clear: both;
    }

    .stitched-collection {
       border-top: 2em;
        margin-bottom: 2em;
    }

    .del {
        text-decoration: line-through;
        text-decoration-style: double;
        color: #a49898;
    }

    .no-change {
        color: black;
    }

    .ins {
        font-weight: bold;
        color: #5651af;
    }
</style>