<script setup lang="ts">
import { useFormatDuring } from "@/plugins/utils";
import { usePlayerStore } from "@/stores/player";
import IconPark from "@/components/iconPark.vue";
import { TextMessage, MusicList } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";

const { currentTime, duration, playListCount, showPlayList } = storeToRefs(usePlayerStore());
console.log("%c currentTime", "font-size:13px; background:pink; color:#bf2c9f;", currentTime);
</script>
<template>
  <div class="flex justify-end items-center gap-x-2.5">
    <span class="text-xs"> {{ useFormatDuring(currentTime) }} / {{ useFormatDuring(duration) }} </span>
    <IconPark :icon="TextMessage" size="18" :stroke-width="3" class="hover-text" title="歌词" />
    <div class="flex items-center hover-text" @click="showPlayList = true">
      <IconPark :icon="MusicList" size="18" :stroke-width="3" class="hover-text" title="播放列表" />
      <span class="text-xs">{{ playListCount }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
