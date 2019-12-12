<template>
    <div class="container">
        Status:  {{response}}
    </div>
</template>

<script>
    import { Socket} from 'phoenix-socket'

    export default {
        name: 'chat-page',
        data: () => {
            return {
                response: String
            }
        },
        created: function() {
            let socket = new Socket("ws://localhost:4000/socket")
            socket.connect();
            this.channel = socket.channel("room:lobby", {});
            this.channel.join()
                .receive("ok", resp => {
                    this.response = "Joined successfully";
                    console.log("Joined successfully", resp)
                })
                .receive("error", resp => {
                    this.response = "Unable to join";
                    console.log("Unable to join", resp)
                })

            let data = {};
            this.channel.push("room:lobby", {data: data})
        },
    }
</script>

<style scoped>

</style>