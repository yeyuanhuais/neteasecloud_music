<script setup lang="ts">
import IconPark from "@/components/iconPark.vue";
import { useUserStore } from "@/stores/user";
import { HamburgerButton } from "@icon-park/vue-next";
const { onLogout } = useUserStore();
</script>
<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <IconPark :icon="HamburgerButton" size="22" :strokeWidth="2" class="icon-button" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item divided @click="onLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style lang="scss" scoped>
.icon-button {
  @apply p-2 cursor-pointer;
  @apply hover:text-emerald-400;
}
</style>
