<template>
  <div id="app">
    <div id="toolbar">
        Minha toolbar
    </div>
    <button @click="openCreate()">Adicionar</button>
    <div>
      <tr>
        <th>id</th>
        <th>Cliente</th>
        <th>Telefone</th>
      </tr>
      <tr v-for="item in lista" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.cliente}}</td>
        <td>{{item.telefone}}</td>
        <td><button @click="editCliente(item)">Editar</button></td>
        <td><button @click="deleteCliente(item.id)">Deletar</button></td>
      </tr>
    </div>
    <div v-if="form">
      <label for="fname">ID:</label>
      <input type="text" id="fname" name="fname" v-model="edit_modelo.id"><br><br>
      <label for="fname">Cliente:</label>
      <input type="text" id="fname" name="fname" v-model="edit_modelo.cliente"><br><br>
      <label for="lname">Telefone:</label>
      <input type="text" id="lname" name="lname" v-model="edit_modelo.telefone"><br><br>
      <button v-if="create" @click="createCliente()"> Criar </button>
      <button v-if="!create" @click="sendEditCliente()"> Editar </button>
      <button @click="closeForm()">Cancelar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      create: true,
      title_form: "alterar",
      form: false,
      lista: [],
      modelo: {
        id: "",
        cliente: "",
        telefone: "",
      },
      edit_modelo: {
        id: "",
        cliente: "",
        telefone: ""
      },
      url: "http://localhost:3000/atendimentos"
    }
  },
  async mounted(){
    this.getList()
  },
  methods: {
    async getList(){
      this.lista = (await axios.get(this.url)).data
      // this.lista = [
      //   { id: 1, cliente: "Daniel", telefone: "123" },
      //   { id: 2, cliente: "Matheus", telefone: "321" },
      // ]
    },
    async deleteCliente(id){
      let res = (await axios.delete(this.url + `/${id}`))
      console.loge(res)
    },
    editCliente(cliente){
      this.create = false
      this.form = true
      this.edit_modelo = Object.assign(this.edit_modelo, cliente)
    },
    async sendEditCliente(){
      let res = (await axios.patch(this.url + `/${this.edit_modelo.id}`, this.edit_modelo))
      console.log(res)
    },
    closeForm(){
      this.form = false
      this.edit_modelo = this.modelo
    },
    async createCliente(){
      let res = (await axios.post(this.url, this.edit_modelo))
      console.log(res)
    },
    openCreate(){
      this.create = true
      this.form = true
      this.edit_modelo = this.modelo
    }
  }
}
</script>

<style>
#toolbar{
  background-color: rgb(183, 183, 255);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
