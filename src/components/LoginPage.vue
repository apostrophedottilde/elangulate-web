<template>
    <div class="container">
        <form class="align-content-center">
            <div class="form-group">
                <label>Username</label>
                <input v-model="username" type="text" formControlName="username" class="form-control"/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" formControlName="password" class="form-control"/>
            </div>
            <input v-on:click="login" type="button" value="Login" class="btn btn-dark"/>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'login-page',
        data: () => {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login: function () {
                axios.post('http://localhost:9001/login',
                    {
                        username: this.username,
                        password: this.password,
                    })
                    .then(result => {
                        console.error('RESPONSE' + JSON.stringify(result.headers));
                        this.$cookie.set('jwt', result.headers['authorization'], 1);
                        this.$router.push({name: "BrowseThreadsPage"});

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