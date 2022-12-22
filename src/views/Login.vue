<template>
  <div class="input-div">
        <h2>LogIn</h2>
        <form class="register-from">
          <label for="username">Username</label>
          <input type="text" name="username" class="register-from-input" v-model="userlogin.username"><br>
          <label for="password">Password</label>
          <input type="password" name="password" class="register-from-input" v-model="userlogin.password">
      </form>
      <button @click="loginMethod">LogIn</button>
    </div>
</template>

<script>
import {store} from '../store/store.js'
export default {
  data(){
    return{
      authorized:false,
      userlogin:{
        username:'',
        password:'',
      },
      token:''
    }
  },
  methods:
  {
    loginMethod()
    {
      console.log("sended claims: \n login: "+ this.userlogin.username + "\n password: "+ this.userlogin.password)
      //alert("sended claims: \n login: "+ this.login + "\n password: "+ this.password)
      let response = {access_token:"",username:""}
      let user = JSON.stringify(this.userlogin)
      let httpRequest  = new XMLHttpRequest()
      httpRequest.open("POST","https://localhost:5001/api/users/login")
      httpRequest.setRequestHeader("Content-Type", "application/json")
      httpRequest.onload = () =>
            {
                if (httpRequest.status == 200) { 
                //console.log(httpRequest.responseText);
                response = JSON.parse(httpRequest.responseText)
                this.token = response.access_token
                this.authorized = true
                console.log("Access token: "+this.token)
                console.log("Authorized? " +this.authorized)
                //this.setUsers(response.username)
                //this.setToken(response.access_token)
                store.commit('setUser',response.username)
                store.commit('setToken',response.access_token)
                } else 
                {
                    console.log("Server response: ", httpRequest.responseText);
                    this.authorized = false
                }
            }
            httpRequest.send(user)
    }
  }
}
</script>

<style>

</style>