<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App'
}
</script>
<style>
  p{
    line-height: 28px;
  }
  code {
    padding: 2px 4px;
    color: #567482;
    background-color: #eee;
    border-radius: 0.3rem;
    display: inline;
    line-height: 28px;
  }
  p code{
    background-color: #f3f6fa
  }
  pre{
    margin-bottom: 10px;
  }
  /*a, a:hover{*/
    /*color: #1890ff;*/
  /*}*/
  /*a:hover{*/
    /*text-decoration: underline;*/
  /*}*/

</style>
