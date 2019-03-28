<template>
  <div id="page">
    
    <h1 class="display-4">Sources <sup>(alpha)</sup> </h1>    

    <div class="row">
      <div class="col-md-6">
        <h3>Local sources</h3>
        <p>
            Next to workflowy more automatic connections are in the works, with for example fitbits and some others! 
            For now we are also able to query against files you allow us to access. Since we are not uploading 
            the files your data will be safe.
        </p>

        <p>Use the form below to allow access to a file:</p>

        <form-input-group>
          <form-input class="dark" type="text" v-model="upload.title" placeholder="Name"></form-input>
          <form-input class="dark" type="file" @change="readFile" name="file" label="Select a file" accept=".txt, .csv"></form-input>
          <form-button class="dark"><a href="#" @click.prevent="uploadFile">Allow access</a></form-button>
        </form-input-group>
      </div>
      
      <div v-if="files.length !== 0" class="col-md-6">
        <h3>Currently accessible files</h3>
        <table class="table table-sm">
          <tr>
            <th>Name</th>
            <th>Uploaded</th>
            <th>Actions</th>
          </tr>
          <tr :key="file.id" v-for="file in files">
            <td>{{ file.title }}</td>  
            <td>{{ file.created_at }}</td>
            <td><a href="#" @click="remove(file)">Delete</a></td>
          </tr>
        </table>
      </div>
    </div>
    
  </div>
</template>

<script>
import { uuid } from 'vue-idb'
import FormInput from '@/components/FormInput'
import FormInputGroup from '@/components/FormInputGroup'
import FormButton from '@/components/FormButton'

export default {
  name: 'Sources',
  data () {
    return {
      upload: {
        title: '',
        content: undefined
      },
      files: []
    }
  },
  components: {
    FormButton,
    FormInput,
    FormInputGroup
  },
  mounted() {
    this.all()
  },
  methods: {
    all() {
      this.$db.files.toArray().then( files => this.files = files )
    },
    update(){
      this.$db.files.toArray().then( files => this.files = files )
    },
    add (file){
      let id = uuid()
      this.$db.files.add({ 
        id: id, 
        title: file.title, 
        content: file.content,
        created_at: new Date(), 
        updated_at: new Date() 
      }).then(() => {
        let fileNodes = []
        file.content.split("\n").forEach(line => {
          fileNodes.push({
            "name": line,
            "source": id
          })
        })
        this.$store.commit('addNodes', fileNodes)
        this.update()
      })
    },
    remove (file){
      // Remove nodes for file
      this.$store.commit('removeFileNodes', file);
      // Remove files
      this.$db.files.where({'id': file.id}).delete().then(() => this.update())
    },
    readFile(ev) {
      const file = ev.target.files[0];
      console.log(ev)
      const reader = new FileReader();
      reader.onload = e => {this.upload.content = e.target.result}
      reader.readAsText(file);
    },
    uploadFile() {
      if (this.upload.content && this.upload.title) {
        this.add({
          title: this.upload.title, 
          content: this.upload.content
        })
      }
    }
  } 
}
</script>

<style>
  sup{ 
    font-size: 20px;
  }
</style>
