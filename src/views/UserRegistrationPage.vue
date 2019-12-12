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
    import axios from 'axios'

    export default {
        name: 'user-registration-form',
        data: () => {
            return {
                username: '',
                firstName: '',
                lastName: '',
                password: '',
                email: ''
            }
        },
        methods: {
            registerUser: function () {
                let data = {
                    username: this.username,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                };

                axios.post(`http://localhost:4000/api/users`, data, {
                    headers: {headers: {"Content-Type": "application/json"}}
                })
                .then(function(){

                })
                .catch(err => {
                    console.error(err)
                });
            }
        }
    }
</script>

<style scoped>

</style>