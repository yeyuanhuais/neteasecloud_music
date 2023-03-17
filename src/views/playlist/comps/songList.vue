<script setup lang="ts">
import SongListItem from "@/components/songListItem.vue";
import type { Song } from "@/models/song";
import { computed, ref } from "vue";
const props = defineProps<{
  songs: Song[];
  playAll?:() => void;
}>();

const pageSize = ref(10);
const page = ref(1);
const noMore = computed(() => {
  return page.value - props.songs.length / pageSize.value >= 0;
});
const loadMore = () => {
  page.value = page.value + 1;
};
</script>
<template>
  <div class="mt-2">
    <div class="flex text-xs text-gray-400 py-2">
      <div class="flex-auto">歌曲</div>
      <div class="w-1/4">歌手</div>
      <div class="w-1/4">专辑</div>
      <div class="w-20">时长</div>
    </div>
    <div class="text-sm">
      <template v-for="song in songs.slice(0, page * pageSize)" :key="song.id">
        <SongListItem :song="song" showAlName showArName />
      </template>
    </div>
    <div class="flex justify-center pt-5" v-if="songs.length > pageSize && !noMore">
      <el-button link class="text-center w-full" @click="loadMore">加载更多</el-button>
    </div>
  </div>
</template>
