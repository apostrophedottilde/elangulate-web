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
    import axios from 'axios'
    export default {
        name: 'user-registration-form',
        data: () => {
            return {
                username: '',
                password: '',
                email: ''
            }
        },
        methods: {
            registerUser: function () {
                const base = process.env.VUE_APP_API_ROOT_URL;
                axios.post(`${base}/users/sign-up`,
                    {
                        username: this.username,
                        password: this.password,
                        email: this.email
                    })
                    .then(result => {
                        console.log(result)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
        }
    }
</script>

<style scoped>

</style>