<template>
    <li>
        <span :class="'node-' + node.uuid">{{ node.name }}</span>
        <ul v-if="children && node.children">
            <node v-for="child in node.children" :key="child.uuid" :node="child" :children="children"></node>
        </ul>  
    </li>
</template>

<script>
import Mark from 'mark.js'

export default {
  name: 'Node',
  props: {
    node: Object, 
    children: Boolean 
  },
  methods: {
    highlight () {
      let instance = new Mark(document.querySelector(".node-" + this.node.uuid))
      
      // instance.markRegExp(RegExp(/^(?=.)([+-]?([0-9]*)([.\,](\d+))?)/g),
      instance.markRegExp(RegExp(/(\d+([\,\.]?\d+)?)/g),
        {"element": "span", "className": "highight-number"}
      )
      instance.markRegExp(RegExp(/\B#\w*[a-zA-Z]+\w*/g),
        {"element": "span", "className": "highight-hashtag"}
      )
    }
  },
  created () {
    this.$nextTick(function () {
      this.highlight()
    })
  }
}

</script>

<style>
  .highight-number{
    background-color: rgba(0,0,200,0.5);
    color: white;
    padding: 2px 5px 2px 5px;
    border-radius: 5px;
  }
   .highight-hashtag{
    background-color: rgba(0,200,0,0.5);
    padding: 2px 5px 2px 5px;
    border-radius: 5px;
  }
</style>
