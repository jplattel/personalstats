<template>
  <div class="form-button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormButton',
  props: {
    label: String,
  }
}
</script>

<style scoped>
  /* General styles  */
  .form-button > a:hover {
    text-decoration: none;
  }
  .form-button{
    border: 2px solid;
    border-radius: 21px;
    padding: 8px;
    padding-left: 15px;
    padding-right: 15px;
    display: inline;
  }
  .form-button:hover{
    cursor: pointer;
    box-shadow: 0px 0px 10px 1px; 
  }


  /* Light styles */
  .light{
    border: 2px solid white;
    color: white
  }
  .light > a {
    color: white;
  }
  .light > a:hover{
    color: white;
  }

  /* Dark styles  */
  .dark{
    border: 2px solid #4c4c4c;
    color: #4c4c4c
  }
  .dark > a{
    color: #4c4c4c
  }
  .dark > a:hover{
    color: #4c4c4c;
  }
</style>
