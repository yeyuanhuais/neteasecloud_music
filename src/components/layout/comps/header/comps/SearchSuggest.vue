<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const { showSearchView, suggestData } = storeToRefs(useSearchStore());
const router = useRouter();
const { play } = usePlayerStore();
const getTitle = (name: string) => {
  switch (name) {
    case "songs":
      return "单曲";
    case "albums":
      return "专辑";
    case "artists":
      return "歌手";
    case "playlists":
      return "歌单";
    default:
      return name;
  }
};
const routerPush = (name: string, id: number) => {
  router.push({ name, query: { id } }).then(() => {
    showSearchView.value = false;
  });
};
</script>
<template>
  <template v-if="suggestData">
    <div v-for="(order, index) in suggestData.order" :key="index">
      <div class="pt-2 pb-1.5 px-2.5">
        {{ getTitle(order) }}
      </div>
      <template v-if="order === 'songs'">
        <div v-for="item in suggestData.songs" :key="item.id" @click="play(item.id)" class="py-1.5 px-2.5 hover-bg-main text-xs cursor-pointer">
          <span class="text-emerald-500">{{ item.name }}</span>
          <span class="pl-1"> - {{ item.artists.first()?.name }}</span>
        </div>
      </template>
      <template v-if="order === 'albums'">
        <div v-for="item in suggestData.albums" :key="item.id" @click="routerPush('album', item.id)" class="py-1.5 px-2.5 hover-bg-main text-xs cursor-pointer">
          <span class="text-emerald-500">{{ item.name }}</span>
          <span class="pl-1">{{ item.artist.name }}</span>
        </div>
      </template>
      <template v-if="order === 'artists'">
        <div v-for="item in suggestData.artists" :key="item.id" @click="routerPush('artistDetail', item.id)" class="py-1.5 px-2.5 hover-bg-main text-xs cursor-pointer flex items-center">
          <el-avatar size="small" :src="item.img1v1Url" />
          <span class="text-emerald-500 ml-2">{{ item.name }}</span>
        </div>
      </template>
      <template v-if="order === 'playlists'">
        <div v-for="item in suggestData.playlists" :key="item.id" @click="routerPush('playlist', item.id)" class="py-1.5 px-2.5 hover-bg-main text-xs cursor-pointer flex items-center">
          <el-avatar size="small" :src="item.coverImgUrl" />
          <span class="text-emerald-500 ml-2 truncate flex-1 w-1">{{ item.name }}</span>
        </div>
      </template>
    </div>
  </template>
</template>
