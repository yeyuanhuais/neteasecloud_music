<script setup lang="ts">
import Title from "@/components/title.vue";
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDjStore } from "@/stores/dj";
import IconPark from "@/components/iconPark.vue";
import { Add, DownTwo, Like, MoreTwo, PlayOne } from "@icon-park/vue-next";
import { usePlayerStore } from "@/stores/player";

const { programRecommend } = toRefs(useDjStore());
const { getProgramRecommend } = useDjStore();
const { play } = usePlayerStore();
const router = useRouter();
onMounted(() => {
  getProgramRecommend();
});
</script>
<template>
  <Title title="推荐节目" class="mt-4" />
  <div class="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5">
    <template v-for="(item, index) in programRecommend" :key="item.id">
      <div v-if="index < 5" @click="router.push({ name: 'dj', query: { id: item.id } })" :title="item.description" class="flex items-center program-item flex-1">
        <IconPark class="text-stone-300 hover-text mr-2" :size="25" :icon="Like" />
        <img :src="item.coverUrl" class="w-20 rounded" />
        <div class="ml-4 text-sm truncate">
          <div class="truncate">{{ item.name }}</div>

          <div class="truncate text-xs mt-2 text-gray-400">
            <template v-for="(artist, artistIndex) in item.mainSong.artists" :key="artist.id">
              <span @click="router.push({ name: 'artistDetail', query: { id: artist.id } })" class="hover-text">
                {{ artist.name }}
              </span>
              <span v-if="artistIndex !== item.mainSong.artists.length - 1"> / </span>
            </template>
          </div>
        </div>
        <div class="hidden icon-action flex-shrink-0 w-1/4">
          <div class="flex items-center gap-x-1.5 text-gray-400 ml-2">
            <IconPark :icon="PlayOne" title="播放" size="25" class="hover-text" @click="play(item.mainSong.id)" />
            <IconPark :icon="Add" title="添加到" size="20" class="hover-text" />
            <IconPark :icon="DownTwo" title="下载" size="20" class="hover-text" />
            <IconPark :icon="MoreTwo" title="更多操作" size="20" class="hover-text" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.program-item {
  @apply py-2.5 pl-0.5;
  &:hover {
    .icon-action {
      @apply inline-block;
    }
  }
}
</style>
