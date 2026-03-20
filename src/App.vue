<template>
  <div class="wrap">
    <h1>まごレター✉️</h1>
    <p class="sub">おじいちゃんおばあちゃんに近況を送ろう</p>

    <div class="box">
      <input v-model="message" placeholder="今日はどんな一日だった？" />
      <button @click="addMessage">届ける</button>
    </div>

    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        {{ msg }}
        <button @click="deleteMessage(index)">削除</button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";

const message = ref("");
const messages = ref([]);
// 保存データ読み込み
const saved = localStorage.getItem("messages");
if (saved) {
  messages.value = JSON.parse(saved);
}
const addMessage = () => {
  if (message.value !== "") {
    messages.value.push(message.value);
    localStorage.setItem("messages", JSON.stringify(messages.value));
    message.value = "";
  }
};

const deleteMessage = (index) => {
  messages.value.splice(index, 1);
  localStorage.setItem("messages", JSON.stringify(messages.value));
};
</script>
<style>
.wrap {
  max-width: 480px;
  margin: 70px auto;
  text-align: center;
}

.sub {
  font-size: 14px;
  color: #777;
  margin-bottom: 20px;
}

.box {
  display: flex;
  gap: 8px;
  justify-content: center;
}

input {
  padding: 10px;
  width: 65%;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  padding: 10px 14px;
  background-color: #8ecae6;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #219ebc;
}

li {
  margin-top: 12px;
  padding: 10px;
  background: #fef6e4;
  border-radius: 8px;
  list-style: none;
}
</style>
