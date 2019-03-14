<template>
  <div class="form-input">
    <label :for="name" v-if="label" :class="{ 'isFile': isFile }">{{ label }}</label>
    <input :name="name" :id="name" :type="type" :placeholder="placeholder" 
    @input="$emit('input', $event.target.value)"
    @change="$emit('change', $event)">  
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    value: String,
    placeholder: String,
    name: String,
    label: String,
    type: {
      type: String,
      default: 'text'
    },
  },
  computed: {
    isFile: function () {
      return this.type === 'file';
    }
}
}
</script>

<style scoped>
  .form-input{
    margin-top: 10px;
    margin-bottom: 20px;
  }
  label {
    display:block;
    color: white;
    padding-left: 15px;
  }
  input {
    display:block;
    border-radius: 21px;
    padding: 8px;
    padding-left: 15px;
    background-color: transparent;
    width: 100%
  }
  input[type="file"]{
    width: 0px;
    height: 0px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .isFile{
    display:block;
    border-radius: 21px;
    padding: 8px;
    padding-left: 15px;
    background-color: transparent;
    width: 100%
  }
  label.isFile{
    width: 150px;
  }
  .light .isFile {
    border: 2px solid white;
  }
  .dark .isFile {
    border: 2px solid #4c4c4c;
  }

  input::placeholder{
    color: #ddd
  }
  input:focus {
    /* border-radius: 15px; */
    outline: none;

  }
  
  /* Light styles */
  .light label{
    color: white
  }
  .light input{
    border: 2px solid white;
    color: white
  }
  .light input:focus {
    box-shadow: 0px 0px 10px 1px white;
  }
  
  /* Dark styles  */
  .dark label{
    color: #4c4c4c
  }
  .dark input{
    border: 2px solid #4c4c4c;
    color: #4c4c4c
  }
  .dark input:focus {
    box-shadow: 0px 0px 10px 1px #4c4c4c;
  }
</style>
