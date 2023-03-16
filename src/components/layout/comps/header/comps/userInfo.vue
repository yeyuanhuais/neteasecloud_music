<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import Login from "../../login/index.vue";
import avatar from "@/assets/images/avatar.jpg";

const { profile, showLogin, isLogin } = storeToRefs(useUserStore());
const { checkLogin } = useUserStore();
onMounted(async () => {
  checkLogin();
});
</script>
<template>
  <div class="flex items-center cursor-pointer hover-text mr-1">
    <el-avatar :size="30" round class="bg-gray-200" :src="profile?.avatarUrl ?? avatar" />
    <span class="text-sm ml-1.5" v-if="isLogin">{{ profile.nickname }}</span>
    <span class="text-sm ml-1.5" v-else @click="showLogin = true">点击登录</span>
  </div>
  <Login v-if="showLogin" />
</template>
