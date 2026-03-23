<template>
  <div class="wrap">
    <h1>祖父母用</h1>

    <h2>届いたメッセージ</h2>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        {{ msg }}
      </li>
    </ul>

    <h2>返信する</h2>

    <button @click="sendReply('今何してるの？')">今何してるの？</button>
    <button @click="sendReply('そうなんだ！')">そうなんだ！</button>
    <button @click="sendReply('ありがとう！')">ありがとう！</button>

    <h2>返信一覧</h2>
    <ul>
      <li v-for="(rep, index) in replies" :key="index">
        {{ rep }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

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

// メッセージ
const messages = ref([]);

// 返信
const replies = ref([]);

// メッセージ取得
const loadMessages = async () => {
  const snapshot = await getDocs(collection(db, "messages"));
  messages.value = snapshot.docs.map((doc) => doc.data().text);
};

// 返信取得
const loadReplies = async () => {
  const snapshot = await getDocs(collection(db, "replies"));
  replies.value = snapshot.docs.map((doc) => doc.data().text);
};

// 返信送信
const sendReply = async (text) => {
  await addDoc(collection(db, "replies"), {
    text,
    createdAt: new Date(),
  });
  loadReplies();
};

// 初期読み込み
loadMessages();
loadReplies();
</script>

<style>
.wrap {
  max-width: 500px;
  margin: 50px auto;
  text-align: center;
}

li {
  margin-top: 12px;
  padding: 12px;
  font-size: 24px;
  list-style: none;
}

button {
  margin: 10px;
  padding: 15px;
  font-size: 20px;
}
</style>
