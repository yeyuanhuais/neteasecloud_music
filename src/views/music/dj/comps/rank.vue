<script setup lang="ts">
import Title from "@/components/title.vue";
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/coverPlay.vue";
import { useDjStore } from "@/stores/dj";
import { usePlayerStore } from "@/stores/player";
const subtitle = [
  { label: "热播", value: "hot" },
  { label: "飙升", value: "new" },
];
const { toplist } = toRefs(useDjStore());
const { getToplist, getDjProgram } = useDjStore();
const { play, pushPlayList } = usePlayerStore();
const router = useRouter();
const getProgramAll = async (id: number) => {
  const { programs } = await getDjProgram({ id, limit: 99999, page: 1 });
  const mainSongs = programs.map((item: { mainSong: any }) => item.mainSong);
  pushPlayList(true, ...mainSongs);
  play(mainSongs.first().id);
};
onMounted(() => {
  getToplist();
});
</script>
<template>
  <Title routeName="dj" title="电台排行榜" class="mt-4" :subtitle="subtitle" :onSubtitleClick="getToplist" />
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-6 gap-5">
    <template v-for="(item, index) in toplist" :key="item.id">
      <div v-if="index < 10" class="relative">
        <CoverPlay :picUrl="item.picUrl" :name="item.name" :playCount="item.playCount" showPlayCount @click="getProgramAll(item.id)" />
        <div class="truncate text-xs mt-2 hover-text" @click="router.push({ name: 'djProgram', query: { id: item.id } })">{{ item.name }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
