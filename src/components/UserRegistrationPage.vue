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

        <div class="container">
            <div class="large-12 medium-12 small-12 cell">
                <label>File
                    <input type="file" id="profileImage" ref="image" v-on:change="handleFileUpload()"/>
                </label>
                <button v-on:click="submitFile()">Submit</button>
            </div>
        </div>

        <div class="input-group mb-3">
            <div>
                <div class="input-group mb-3">
                    <select v-on:change="handleAddForeignLanguage($event.target.value)">
                        <option disabled value="">Please select languages you are learning</option>
                        <option v-for="lang in availableLanguages" :value="lang">{{lang}}</option>
                    </select>
                </div>
                <div class="input-group mb-3">
                    <select v-on:change="handleAddNativeLanguage($event.target.value)">
                        <option disabled value="">Please select your native-level languages</option>
                        <option v-for="lang in availableLanguages" :value="lang">{{lang}}</option>
                    </select>
                </div>

                <div>
                    <div class="aParent">
                        Foreign languages learning:
                        <span class="aParent" v-for="(lang, index) in foreignLanguages" v-bind:key="lang+index">
                            <b-badge class="aParent" pill variant="info">{{lang}}</b-badge>
                        </span>
                    </div>
                    <div class="aParent">
                        Native spoken languages:
                        <span v-for="(lang, index) in nativeLanguages" v-bind:key="lang+index">
                            <b-badge class="aParent" pill variant="success">{{lang}}</b-badge>
                        </span>
                    </div>
                </div>
            </div>
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
                image: '',
                username: '',
                password: '',
                email: '',
                foreignLanguages: [],
                nativeLanguages: [],
                availableLanguages: []
            }
        },
        created: function() {
            this.fetchAvailableLanguages()
        },
        methods: {
            registerUser: function () {
                const base = process.env.VUE_APP_API_ROOT_URL;
                axios.post(`${base}/users/sign-up`,
                    {
                        username: this.username,
                        password: this.password,
                        email: this.email,
                        learningLanguages: this.foreignLanguages,
                        nativeLanguages: this.nativeLanguages
                    })
                    .then(result => {
                        console.log(result)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            },
            submitFile() {
                const jwt = this.$cookie.get('jwt');
                const base = process.env.VUE_APP_API_ROOT_URL;

                let formData = new FormData();
                formData.append('image', this.image);
                axios.post(`${base}/users/1234567890/profile/image/mashyfile`, formData, {
                    headers: {
                        'Authorization': jwt,
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function(){
                    console.log('SUCCESS!!');
                })
                .catch(function(){
                    console.log('FAILURE!!');
                });
            },
            handleFileUpload(){
                this.image = this.$refs.image.files[0];
            },
            handleAddForeignLanguage(lang){
                this.foreignLanguages.push(lang);
            },
            handleAddNativeLanguage(lang){
                this.nativeLanguages.push(lang);
            },
            fetchAvailableLanguages: function () {
                const base = process.env.VUE_APP_API_ROOT_URL;
                const jwt = this.$cookie.get('jwt');

                axios.get(`${base}/languages`,{
                    headers: {
                        'Authorization': jwt,
                            'Content-Type': 'multipart/form-data'
                    }
                })
                .then(result => {
                    console.log(result);
                    this.availableLanguages = result.data
                })
                .catch(error => {
                    console.error(error)
                })
            },
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
</style>