<script setup lang="ts">
import Title from "@/components/title.vue";
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/coverPlay.vue";
import { useDjStore } from "@/stores/dj";
import { usePlayerStore } from "@/stores/player";

const { djRadio } = toRefs(useDjStore());
const { getDjRadio, getDjProgram } = useDjStore();
const { play, pushPlayList } = usePlayerStore();
const router = useRouter();
onMounted(() => {
  getDjRadio();
});
const getProgramAll = async (id: number) => {
  const { programs } = await getDjProgram({ id, limit: 99999 });
  const mainSongs = programs.map((item: { mainSong: any }) => item.mainSong);
  pushPlayList(true, ...mainSongs);
  play(mainSongs.first().id);
};
</script>
<template>
  <Title routeName="dj" title="推荐有声电台" class="mt-4" />
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-6 gap-5">
    <template v-for="(item, index) in djRadio" :key="item.id">
      <div v-if="index < 6">
        <CoverPlay :picUrl="item.picUrl" :name="item.name" @click="getProgramAll(item.id)" :playCount="item.playCount" showPlayCount />
        <div class="truncate text-xs mt-2 hover-text" @click="router.push({ name: 'djProgram', query: { id: item.id } })">{{ item.name }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
