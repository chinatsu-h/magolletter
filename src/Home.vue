<template>
  <div class="wrap">
    <h1>まごレター</h1>

    <!-- 入力 -->
    <input v-model="text" placeholder="メッセージを書く" />
    <button @click="sendMessage">届ける</button>

    <!-- 送ったメッセージ -->
    <h2>送ったメッセージ</h2>
    <ul>
      <li v-for="msg in messages" :key="msg.id">
        {{ msg.text }}
        <button @click="deleteMessage(msg.id)">削除</button>
      </li>
    </ul>

    <!-- 祖父母リンク -->
    <h2>祖父母からの返信</h2>
    <router-link to="/viewer">祖父母はこちら</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlhKXZW1JiA8Vu8ZRiX0eps4hw3FKw3Y",
  authDomain: "magolletter.firebaseapp.com",
  projectId: "magolletter",
  storageBucket: "magolletter.firebasestorage.app",
  messagingSenderId: "213931368926",
  appId: "1:213931368926:web:d37ccd40eabf83b1333d4f",
  measurementId: "G-862KYPNYJK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 入力
const text = ref("");

// メッセージ一覧
const messages = ref([]);

// 送信
const sendMessage = async () => {
  if (!text.value) return;

  await addDoc(collection(db, "messages"), {
    text: text.value,
    createdAt: new Date(),
  });

  text.value = "";
  loadMessages();
};

// 削除
const deleteMessage = async (id) => {
  try {
    await deleteDoc(doc(db, "messages", id));
    loadMessages();
  } catch (error) {
    console.error("削除エラー:", error);
  }
};

// 取得
const loadMessages = async () => {
  const snapshot = await getDocs(collection(db, "messages"));
  messages.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// 初期読み込み
loadMessages();
</script>

<style>
.wrap {
  max-width: 500px;
  margin: 50px auto;
  text-align: center;
}

input {
  padding: 10px;
  font-size: 16px;
}

button {
  margin-left: 10px;
  padding: 10px 15px;
  font-size: 16px;
}

li {
  margin-top: 12px;
  padding: 12px;
  font-size: 20px;
  list-style: none;
}
</style>
