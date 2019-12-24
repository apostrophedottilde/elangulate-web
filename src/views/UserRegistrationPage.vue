<template>
    <form>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Username</span>
            </div>
            <input v-model="username" type="text" class="form-control" placeholder="Username" aria-label="Username">
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">First name</span>
            </div>
            <input v-model="firstName" type="text" class="form-control" placeholder="First name" aria-label="First name">
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Last name</span>
            </div>
            <input v-model="lastName" type="text" class="form-control" placeholder="Last name" aria-label="Last name">
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Email</span>
            </div>
            <input v-model="email" type="email" class="form-control" aria-label="Email"/>
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Password</span>
            </div>
            <input v-model="password" type="password"  class="form-control" aria-label="Password"/>
        </div>

        <input v-on:click="registerUser" type="button" value="Register" class="btn btn-primary"/>
    </form>
</template>

<script>
    import { Socket, Channel} from 'phoenix-socket'

    export default {
        name: 'user-registration-form',
        data: () => {
            return {
                username: '',
                firstName: '',
                lastName: '',
                password: '',
                email: '',
                channel: null,
                socket: null
            }
        },
        created: function() {
            this.socket = new Socket("ws://localhost:4000/socket");
            this.socket.connect();
            this.channel = this.socket.channel("user:management", {});
            this.channel.join()
                .receive("ok", resp => this.response = "Joined user management successfully")
                .receive("error", resp => this.response = "Unable to join user management");
            this.channel.on('user_registered', payload => {
                console.log('Bearer ' + payload.jwt);
                const jwt = this.$cookie.set("jwt", 'Bearer ' + payload.jwt);
            });

        },
        methods: {
            registerUser: function () {
                this.channel.push('register_user', {
                    username: this.username,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    password: this.password,
                    email: this.email
                })
            }
        }
    }
</script>

<style scoped>

</style>