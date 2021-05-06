<template>
  <div class="container">
    <div class="content" v-for="(item, index) in arr" :key="index">
      {{ arr[index] }}
    </div>
    <el-input v-model="content"></el-input>
    <el-button type="primary" class="block-btn" @click="send" size="default"
      >发送</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
      content: "",
    };
  },
  sockets: {
    connect() {
      console.log("连接 socket 成功");
    },
  },

  mounted() {
    // this.$socket.emit("conect", 1);
  },
  methods: {
    send() {
      this.$socket.emit("chat", this.content);
    },
  },
};
</script>

<style>
</style>