<template>
    <div class="container">
        Name: <input v-model="name" type="text"></input>
        <div>
            Text: <input v-model="currentMessage" type="text">
            <Button class="btn btn-success" @click="submitMessage">Submit</Button>
        </div>
        <div v-for="message of messages">
            {{message.poster}} :: {{message.text}}
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

            this.channel.push("post_message", {text: "Welcome to your online lesson.", poster: "Bot"});
            this.channel.push("post_message", {text: "You can meet with you classmates and your tutor and hav interactive lessons here.", poster: "Bot"});

            this.channel.on('message_received', payload => this.messages.push({text: payload.text, poster: payload.poster}));

        },
        methods: {
            submitMessage: function() {
                this.channel.push("post_message", {text: this.currentMessage, poster: this.name});
                this.clearDownInputs();
            },
            clearDownInputs: function() {
                this.currentMessage = "";
                this.name = "";
            }
        }
    }
</script>

<style scoped>

</style>