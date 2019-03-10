<template>
  <div class="form-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormButtonGroup',
}
</script>

<style>
  .form-button-group {
    float: left;
    margin: 10px;
  }
  .form-button-group > div.form-button:first-child{
    border-top-left-radius: 21px;
    border-bottom-left-radius: 21px;
  }
  .form-button-group > div.form-button{
    border-radius: 0px;
    border-right: 0px;
  }
  .form-button-group > div.form-button:last-child{
    border-top-right-radius: 21px;
    border-bottom-right-radius: 21px;
    border: 2px solid #4c4c4c;
  }

</style>
