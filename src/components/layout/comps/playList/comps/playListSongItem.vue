<script setup lang="ts">
import IconPark from "@/components/iconPark.vue";
import type { MainSong } from "@/models/dj";
import type { Song } from "@/models/song";
import { useFormatDuring } from "@/plugins/utils";
import { Youtube } from "@icon-park/vue-next";
import { useRouter } from "vue-router";

const router = useRouter();
defineProps<{ song:(Song & MainSong) | any; active: boolean }>();
</script>
<template>
  <div class="flex p-2.5 border-b border-b-slate-50 dark:border-b-stone-800 hover-bg-view" :class="{ active: active }">
    <el-image lazy :src="song.al?.picUrl || song.album?.picUrl + '?param=80y80'" class="aspect-square w-10 flex-shrink-0" />
    <div class="ml-2 text-xs h-10 flex flex-1 w-1">
      <div class="flex flex-1 flex-col justify-between truncate">
        <div class="flex">
          <div class="truncate">{{ song.name }}</div>
          <IconPark v-if="song.mv" @click="router.push({ name: 'mvDetail', query: { id: song.mv } })" class="ml-2 text-orange-400 cursor-pointer" size="16" :icon="Youtube" />
        </div>
        <div class="truncate" v-if="song.ar">{{ song.ar.first().name }}</div>
      </div>
      <div class="flex-shrink-0 ml-5 flex items-center justify-end">
        <div class="truncate">
          <small v-if="song.dt">{{ useFormatDuring(song.dt / 1000) }}</small>
          <small v-else>{{ useFormatDuring(song.duration / 1000) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.active {
  @apply border-l-2 border-l-emerald-400 text-emerald-400;
}
</style>
