<template>
  <div class="home">
    <div class="messages">
      <div  :class="{message:true,messageOwn:inputName==item.name, messageOthers:inputName!=item.name}" v-for="item in messages">
        <span>{{item.name}}</span>
        <p>{{ item.text }}</p>
      </div>
    </div>
    <div class="send">
      <input :disabled="isDisabled" class="input-text" v-model="inputMsg" placeholder="Text">
      <input class="input-name" v-model="inputName" placeholder="Name">
      <button @click="handleButton">Send</button>
    </div>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.home,#__nuxt,body,html{
  height: 100%;
  
}
.home{
  border: 1px solid;
  height: 100%;
}

.messages{
  height: calc(100% - 50px);
  overflow-y: scroll;
}
.message{
  /* border: 1px solid salmon; */
  background-color: rgb(172, 238, 183);
    max-width: 409px;
    min-height: 61px;
    margin: 10px;
    padding: 10px;
}
.messageOwn{
    background-color: rgb(193, 192, 255);
    max-width: 409px;
    min-height: 61px;
    margin: 10px;
    padding: 10px;
    position: relative;
    margin-left: auto;
}
.message span{
  font-size: 17px;
  font-style: italic;
    font-weight: 600;
}
.send{
  position: fixed;
  bottom: 0;
  width: 100%;
}
.send input{
  height: 50px;
}
.send .input-text{
  width: 70%;
}
.send .input-name{
  width: 20%;
}
.send button{
  width: 10%;
  height: 50px;
}

</style>


<script setup>

import io from 'socket.io-client'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import Swal from 'sweetalert2'

const runtimeConfig = useRuntimeConfig();
const inputMsg=ref('')
const inputName=ref('')
const messages=ref([])
const isDisabled = computed(() => inputName.value == '');
console.log(runtimeConfig.public.API)
const socket = io(runtimeConfig.public.API)
const client = feathers()
client.configure(socketio(socket))

const messageService = client.service('messages')
  messageService.on('created', (message) =>{
  messages.value.push(message)
  console.log(JSON.parse(JSON.stringify(messages.value)));
})  


const handleButton=()=>{
  messageService.create({
  text: inputMsg.value,
  name: inputName.value
  })
  // inputMsg.value=""
}
const alertInput=async()=>{

const inputValue = "";
const { value: ipAddress } = await Swal.fire({
  title: "Enter your name",
  input: "text",
  inputLabel: "Your name",
  inputValue,
  allowOutsideClick:false,
  allowEscapeKey:false,
  allowEnterKey:true,
  inputValidator: (value) => {
    if (!value) {
      return "You need to write name!";
    }
  }
});
if (ipAddress) {
  inputName.value=ipAddress
  Swal.fire(`Hy ${ipAddress} welcome to club`);
}
}
onBeforeMount(()=>{
  alertInput()
})


</script>
