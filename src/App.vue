<template>
  <div>
    <h1>まごレター</h1>

    <!-- 入力 -->
    <input v-model="message" placeholder="メッセージを書いてね" />
    <button @click="addMessage">投稿</button>

    <!-- 一覧表示 -->
    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        {{ msg }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("");
const messages = ref([]);

const addMessage = () => {
  if (message.value !== "") {
    messages.value.push(message.value);
    message.value = "";
  }
};
</script>

