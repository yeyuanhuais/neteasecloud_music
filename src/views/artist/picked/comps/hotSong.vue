<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import { PlayOne } from "@icon-park/vue-next";
import { onMounted, ref } from "vue";
import type { Song } from "@/models/song";
import { useArtistStore } from "@/stores/artist";
import IconPark from "@/components/iconPark.vue";

const props = defineProps<{ id: number }>();

const songList = ref<Song[]>([]);

const { pushPlayList, play } = usePlayerStore();
const { getArtistHotSongs } = useArtistStore();

const playAll = () => {
  pushPlayList(false, ...songList.value);
  play(songList.value.first().id);
};

const getData = async () => {
  try {
    const { songs } = await getArtistHotSongs(props.id);
    songList.value = songs;
  } catch (e) {}
};

onMounted(async () => {
  await getData();
});
</script>
<template>
  <Title title="热门歌曲" class="mt-2" />
  <div class="flex gap-x-2">
    <button class="w-28 button-outline button-sm" @click="playAll">
      <IconPark :icon="PlayOne" class="mr-1" size="14" />
      播放全部
    </button>
  </div>
  <div class="mt-2">
    <div class="flex text-xs text-gray-400 py-2">
      <div class="flex-auto">歌曲</div>
      <div class="w-1/3">专辑</div>
      <div class="w-20">时长</div>
    </div>
    <div class="text-sm">
      <template v-for="(song, index) in songList" :key="song.id">
        <song-list-item v-if="index < 10" :show-ar-name="false" show-al-name :song="song" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-banner {
  ::v-deep(.swiper-wrapper) {
    margin-bottom: 22px;
  }
  ::v-deep(.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal) {
    bottom: var(--swiper-pagination-bottom, 0px);
  }
}
.swiper {
  @apply -mx-2.5;
  .swiper-slide {
    @apply w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 px-2.5;
  }
}
.banner-image {
  @apply rounded-lg cursor-pointer transition-all object-cover;
  @apply hover:shadow hover:opacity-80;
}
</style>
