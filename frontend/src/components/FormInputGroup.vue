<template>
  <div class="form-input-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormInputGroup',
}
</script>

<style>
  .form-input-group div{
    float: left;
    margin-top: 10px;
  }
  .form-input-group div.form-input:first-child input{
    border-radius: 0px;
    border-top-left-radius: 21px;
    border-bottom-left-radius: 21px;
  }
  .form-input-group > div.form-input > input { 
    border-right: 0px;
  }
  .form-input-group > div.form-input > label.isFile{
    border-right: 0px;
  }
  .form-input-group > div.form-input > label, input{
    border-radius: 0px;
  }
  .form-input-group > div:last-child{
    border-radius: 0px;
    border-top-right-radius: 21px;
    border-bottom-right-radius: 21px;
  }

</style>
