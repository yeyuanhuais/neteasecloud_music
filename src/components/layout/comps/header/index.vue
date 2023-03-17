<script setup lang="ts">
import IconPark from "@/components/iconPark.vue";
import { Left, Mail, Right } from "@icon-park/vue-next";
import { useRouter } from "vue-router";
import SearchPop from "./comps/searchPop.vue";
import UserInfo from "./comps/userInfo.vue";
import More from "./comps/more.vue";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useDark } from "@vueuse/core";
const router = useRouter();
const isDark = useDark();
</script>
<template>
  <div class="flex items-center justify-between drag h-14">
    <div class="flex items-center pl-5">
      <IconPark :icon="Left" size="22" :strokeWidth="2" class="icon-button" @click="router.back()" />
      <IconPark :icon="Right" size="22" :strokeWidth="2" class="icon-button" @click="router.forward()" />
      <div class="search ml-2">
        <SearchPop />
      </div>
    </div>
    <div class="flex items-center mr-5">
      <UserInfo />
      <IconPark :icon="Mail" size="22" :strokeWidth="2" class="icon-button" />

      <el-switch v-model="isDark" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" class="icon-button" />

      <More />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  @apply text-xs;
  ::v-deep(.el-input__wrapper) {
    @apply rounded-full text-xs bg-slate-100 dark:bg-stone-900;
  }
}

.icon-button {
  @apply p-2 cursor-pointer;
  @apply hover:text-emerald-400;
}
</style>
