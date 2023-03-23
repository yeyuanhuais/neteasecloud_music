<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import IconPark from "./iconPark.vue";
import { Add, DownTwo, Like, MoreTwo, PlayOne } from "@icon-park/vue-next";
import { useFormatDuring } from "@/plugins/utils";
import type { DjProgramRecommend } from "@/models/dj";

defineProps<{
  dj: DjProgramRecommend;
}>();
const router = useRouter();
const { play } = usePlayerStore();
const { id } = storeToRefs(usePlayerStore());
</script>
<template>
  <div class="flex song-item items-center w-full hover-bg-main" :class="{ playing: id === dj.id }" @dblclick="play(dj.id)">
    <div class="flex-shrink-0 flex-1 flex items-center justify-between pr-5">
      <div class="items-center flex flex-1 w-10 flex-shrink-0">
        <IconPark :icon="Like" size="16" class="text-gray-400 mr-1 cursor-pointer hover:text-red-400" />
        <div class="truncate" style="max-width: 75%">
          <small>{{ dj.name }}</small>
        </div>
      </div>
      <div class="hidden icon-action flex-shrink-0">
        <div class="flex items-center gap-x-1.5 text-gray-400 ml-2">
          <IconPark :icon="PlayOne" title="播放" size="20" class="hover-text" @click="play(dj.mainSong.id)" />
          <IconPark :icon="Add" title="添加到" size="16" class="hover-text" />
          <IconPark :icon="DownTwo" title="下载" size="16" class="hover-text" />
          <IconPark :icon="MoreTwo" title="更多操作" size="16" class="hover-text" />
        </div>
      </div>
    </div>
    <div class="flex-shrink-0 w-1/4">
      <div class="w-9/12 truncate">
        <template v-for="item in dj.mainSong.artists" :key="item.id">
          <small class="truncate max-w-full hover-text" @click="router.push({ name: 'artistDetail', query: { id: item.id } })">{{ item.name }}</small>
        </template>
      </div>
    </div>
    <div class="flex-shrink-0 w-40">
      <div class="w-9/12 truncate">
        <small class="truncate max-w-full hover-text">{{ dj.createTime.toDate() }}</small>
      </div>
    </div>
    <div class="w-20 flex-shrink-0">
      <div class="w-20 truncate">
        <small>{{ useFormatDuring(dj.duration / 1000) }}</small>
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
