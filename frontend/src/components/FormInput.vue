<template>
  <div class="form-input">
    <label v-if="label">{{ label }}</label>
    <input :type="type" :placeholder="placeholder" @input="$emit('input', $event.target.value)">  
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    value: String,
    placeholder: String,
    label: String,
    type: {
      type: String,
      default: 'text'
    },
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
    border: 2px solid white;
    border-radius: 21px;
    padding: 8px;
    padding-left: 15px;
    background-color: transparent;
    color: white;
    width: 100%
  }
  input::placeholder{
    color: #ddd
  }
  input:focus {
    /* border-radius: 15px; */
    outline: none;
    box-shadow: 0px 0px 10px 1px white;
  }
</style>
