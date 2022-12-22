<template>
      <div class="input-div">
        <h2>SignIn</h2>
        <form>
          <label for="">Name</label><br>
          <input type="text" v-model="user.userName"><br>
          <label for="">E-mail</label><br>
          <input type="text" v-model="user.email"><br>
          <label for="">Password</label><br>
          <input type="password" v-model="user.password" id="password"><br>
          <label for="">Confirm Password</label><br>
          <input type="password" id="passwordconfirm"><br>
          <span v-if="!confirmPassword" style="color: red;">Password didn’t match</span><br>
          <button style="margin-top:5px" type="button" @click="register">SignIn</button>
      </form>
    </div>
</template>

<script>
export default {
  data()
 {
  return{
    user:{
      userName:null,
      password:null,
      email:null,
    },
    confirmPassword:true
  }
 },
 methods:
 {
   register()
   {
    let user = JSON.stringify(this.user)
    let httpRequest = new XMLHttpRequest
    var pw1 = document.getElementById("password")
    var pw2 = document.getElementById("passwordconfirm")
    if(pw1.value != pw2.value)
    {
      this.confirmPassword = false
    }
    else
    {
      httpRequest.open("POST","https://localhost:5001/api/users/register")
      httpRequest.setRequestHeader("Content-Type", "application/json")
      httpRequest.onload = () =>
      {
        if (httpRequest.status == 200) { 
            console.log(httpRequest.responseText) 
        } 
          else 
          {
            console.log("Server response: ", httpRequest.responseText);
            this.authorized = false
          }
      }
      httpRequest.send(user)
    }
   }
 }
}
</script>

<style>
.input-div{
  margin-top: 15px;
  width: 350px;
  height: 500px;
  background-color: rgb(88, 109, 128);
  border-radius: 15px;
  padding: 20px;
}
.register-from{
margin: 15px;
}
.register-from-input
{
  width:100%
}
</style>