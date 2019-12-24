<template>
    <div class="container">
        Name: <input v-model="name" type="text"></input>
        <div>
            Conversation ID: <input type="text" v-model="convoId">
        </div>
        <div>
            Text: <input v-model="currentMessage" type="number">
            <Button class="btn btn-success" @click="startConversation">Start Conversation</Button>
            <Button class="btn btn-success" @click="postMessage">Submit</Button>

        </div>
        <input type="text" v-model="channelInput">
        <Button class="btn btn-success" @click="joinVideo">Join Video</Button>

        <video autoplay height="375" width="350"> </video>

        <div v-for="message of messages">
            {{message.poster}} - {{message.text}}
        </div>
    </div>
</template>

<script>
    import { Socket} from 'phoenix-socket'
    import adapter from 'webrtc-adapter'

    const sock = new Socket("ws://localhost:4000/socket");
    sock.connect();


    export default {
        name: 'chat-page',
        data: () => {
            return {
                roomChannel: Object,
                channelInput: String,
                response: String,
                currentMessage: String,
                name: String,
                convoId: Number,
                messages: [{
                    text: String,
                    poster: String
                }],
                msg: 'Welcome to Your Vue.js App',
                video: '',
                stream: '',
                peerConn:'',
                connecteduser: null,
                configuration: {
                    iceServers:[
                        {
                            urls: "turn:localhost:4000",
                            credential: "wjg",
                            username: 'wjg'
                        }
                    ]

                }

            }
        },
        mounted() {
            console.log(adapter.browserDetails.browser);
            this.video = document.querySelector('video');
            var constraints = window.constraints = {
                audio: true,
                video: true
            };
            navigator.mediaDevices.getUserMedia(constraints).then(this.handleSuccess).catch(this.handleError)
        },
        created: function() {
            this.messages = [];
            this.channelInput = "";
            this.clearDownInputs();
        },
        methods: {
            startConversation: function() {
                this.roomChannel = sock.channel("room:" + this.convoId, {});
                this.roomChannel.join()
                    .receive("ok", resp => this.response = "Joined successfully")
                    .receive("error", resp => this.response = "Unable to join");
                this.roomChannel.on('message_saved', payload => {
                    this.messages.push({text: payload.text, poster: payload.poster})
                    console.log(payload)
                });
                this.roomChannel.on('conversation_joined', payload => {
                    this.convoId = payload.id;
                    this.messages.push({text: payload.text, poster: payload.poster})
                    console.log(payload)

                });
                this.roomChannel.on('paragraph_splitted', payload => {
                    console.log(payload)
                });
                this.roomChannel.on('sentence_diffed', payload => {
                    console.log(payload)
                });
                this.roomChannel.push("join_conversation", {text: this.currentMessage, poster: this.name});
                this.currentMessage = "";
            },
            postMessage: function() {
                this.roomChannel.push("post_message_to_conversation", {text: this.currentMessage, conversation_id: this.convoId, poster: this.name});
            },
            clearDownInputs: function() {
                this.convoId = 0;
                this.currentMessage = "";
                this.name = "";
            },
            joinVideo: function() {
                this.videoChatChannel = sock.channel("video_chat:" + this.channelInput, {});
                this.videoChatChannel.join()
                    .receive("ok", resp => this.response = "Joined successfully")
                    .receive("error", resp => this.response = "Unable to join")

                this.videoChatChannel.on('message', payload => {
                    console.log("got a message from rtc elixir")
                    console.log(payload)
                });
            },
            call: function() {
                this.videoChatChannel.push("call", {});z
            },
            handleSuccess(stream) {
                let videoTracks = stream.getVideoTracks();
                console.log('using video device:' + videoTracks[0].label);
                this.video.srcObject = stream;
            },
            handleError(error){
                console.log('getUserMedia error:' + error.name, error)
            }
        },
        sockets:  {
            connect(){
                console.log('socket connect success!');
            }
        },
    }
</script>

<style scoped>

</style>