<script setup lang="ts">
import type { Song } from "@/models/song";
import { usePlayerStore } from "@/stores/player";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import IconPark from "./iconPark.vue";
import { Add, DownTwo, Like, MoreTwo, PlayOne, PlayTwo } from "@icon-park/vue-next";
import { useFormatDuring } from "@/plugins/utils";

defineProps<{
  song: Song;
  showArName: boolean;
  showAlName: boolean;
}>();
const router = useRouter();
const { play } = usePlayerStore();
const { id } = storeToRefs(usePlayerStore());
</script>
<template>
  <div class="flex song-item items-center w-full hover-bg-main" :class="{ playing: id === song.id }" @dblclick="play(song.id)">
    <div class="flex-shrink-0 flex-1 flex items-center justify-between pr-5">
      <div class="items-center flex flex-1 w-10 flex-shrink-0">
        <IconPark :icon="Like" size="16" class="text-gray-500 mr-1 cursor-pointer hover:text-red-400" />
        <div class="truncate" style="max-width: 75%">
          <small>{{ song.name }}</small>
        </div>

        <IconPark :icon="PlayTwo" size="16" class="ml-2 text-orange-400 cursor-pointer" v-if="song.mv > 0" @click="router.push({ name: 'mvDetail', query: { id: song.mv } })" />
      </div>
      <div class="hidden icon-action flex-shrink-0">
        <div class="flex items-center gap-x-1.5 text-gray-400 ml-2">
          <IconPark :icon="PlayOne" title="播放" size="20" class="hover-text" @click="play(song.id)" />
          <IconPark :icon="Add" title="添加到" size="16" class="hover-text" />
          <IconPark :icon="DownTwo" title="下载" size="16" class="hover-text" />
          <IconPark :icon="MoreTwo" title="更多操作" size="16" class="hover-text" />
        </div>
      </div>
    </div>
    <div class="flex-shrink-0" :class="{ 'w-1/4': showAlName, 'w-1/3': !showAlName }" v-if="showArName">
      <div class="w-9/12 truncate">
        <small class="truncate max-w-full hover-text" @click="router.push({ name: 'artistDetail', query: { id: song.ar.first().id } })">{{ song.ar.first().name }}</small>
      </div>
    </div>
    <div class="flex-shrink-0" :class="{ 'w-1/4': showArName, 'w-1/3': !showArName }" v-if="showAlName">
      <div class="w-9/12 truncate">
        <small class="truncate max-w-full hover-text" @click="router.push({ name: 'album', query: { id: song.al.id } })">{{ song.al.name }}</small>
      </div>
    </div>
    <div class="w-20 flex-shrink-0">
      <div class="w-20 truncate">
        <small>{{ useFormatDuring(song.dt / 1000) }}</small>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.song-item {
  @apply py-2.5 pl-0.5;
  &:hover {
    .icon-action {
      @apply inline-block;
    }
  }
}

.playing {
  @apply bg-emerald-50 dark:bg-stone-800;
}
</style>
