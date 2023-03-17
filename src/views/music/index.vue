<script setup lang="ts">
import { useMusicMenu } from "./musicMenu";
const { menus, currentMenu, onTabClick } = useMusicMenu();
</script>
<template>
  <div class="pl-5 pr-5 music">
    <h1 class="text-3xl font-bold pt-8 pb-4">音乐馆</h1>
    <el-affix :offset="56">
      <div class="bg-view">
        <el-tabs v-model="currentMenu" @tabClick="onTabClick">
          <el-tab-pane v-for="menu in menus" :key="menu.name" :label="menu.label" :name="menu.name" class="text-main" />
        </el-tabs>
      </div>
    </el-affix>
    <div class="mt-5">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.music {
  ::v-deep(.el-tabs__nav-warp::after) {
    height: 0;
  }
  .el-tabs__header {
    @apply m-0;
  }
}
</style>
