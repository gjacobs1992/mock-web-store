<template>
  <div id="header-container">
    <div id="spacer"></div>
    <img src="https://placehold.co/700x100" id="site-logo" />
    <font-awesome-icon icon="fa-user" id="user-icon"/>
    <div id="menu" :visible="visible">
      
    </div>
  </div>
</template>

<script>
export default {
  name: "the-header",
  data(){
    return{
      visible: true,
    }
  }
};
</script>

<style>
#header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgb(28, 153, 147);
  margin-bottom: -2px;
}
#spacer{
  width: 20%;
}
#site-logo{
  text-align: center;
}
#user-icon{
  flex-grow: 0;
  color: white;
  font-size: 1.75rem;
  cursor: pointer;
}
</style>
