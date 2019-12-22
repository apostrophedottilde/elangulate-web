<template>
    <div class="container">
        Name: <input v-model="name" type="text"></input>
        Conversation ID: {{convoId}}
        <div>
            Text: <input v-model="currentMessage" type="text">
            <Button class="btn btn-success" @click="startConversation">Start Conversation</Button>
            <Button class="btn btn-success" @click="postMessage">Submit</Button>

        </div>
        <div v-for="message of messages">
            {{message.poster}} - {{message.text}}
        </div>
    </div>
</template>

<script>
    import { Socket} from 'phoenix-socket'

    export default {
        name: 'chat-page',
        data: () => {
            return {
                response: String,
                currentMessage: String,
                name: String,
                convoId: Number,
                messages: [{
                    text: String,
                    poster: String
                }]
            }
        },
        created: function() {
            this.messages = [];
            this.clearDownInputs();
            let socket = new Socket("ws://localhost:4000/socket");
            socket.connect();
            this.channel = socket.channel("room:lobby", {});
            this.channel.join()
                .receive("ok", resp => this.response = "Joined successfully")
                .receive("error", resp => this.response = "Unable to join");

            this.channel.on('message_saved', payload => {
                this.messages.push({text: payload.text, poster: payload.poster})
                console.log(payload)
            });

            this.channel.on('conversation_joined', payload => {
                this.convoId = payload.id;
                this.messages.push({text: payload.text, poster: payload.poster})
                console.log(payload)

            });

            this.channel.on('paragraph_splitted', payload => {
                console.log(payload)
            });

            this.channel.on('sentence_diffed', payload => {
                console.log(payload)
            });
        },
        methods: {
            startConversation: function() {
                this.channel.push("join_conversation", {text: this.currentMessage, poster: this.name});
                this.currentMessage = "";
            },
            postMessage: function() {
                this.channel.push("post_message_to_conversation", {text: this.currentMessage, conversation_id: this.convoId, poster: this.name});
            },
            clearDownInputs: function() {
                this.convoId = 0;
                this.currentMessage = "";
                this.name = "";
            }
        }
    }
</script>

<style scoped>

</style>