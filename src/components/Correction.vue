<template>
    <div class="stitched-collection">
        <div class="card">
            <div class="original-text">
                {{originalText}}
            </div>

            <!--<div class="full-correction">-->
                <!--Full correction: {{getFullCorrection(correction)}}-->
            <!--</div>-->

            <div class="">
                <div class="aParent"v-for="step in correction.correctionSteps" v-bind:key="step.id">
                    <div class="ins" v-if="step.action=='ADD'">{{step.text}}</div>
                    <div class="del" v-if="step.action=='REMOVE'">{{step.text}}</div>
                    <div class="no-change" v-if="step.action=='NO_CHANGE'">{{step.text}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "correction",
        props: {
            correction: {
                correctionSteps: {
                    action: String,
                    text: String
                }
            },
            originalText: String
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
        color: #a20900;
    }

    .no-change {
        color: black;
    }

    .ins {
        font-weight: bold;
        color: #009219;
    }
</style>