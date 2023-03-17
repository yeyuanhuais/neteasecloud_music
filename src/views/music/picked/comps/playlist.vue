<script setup lang="ts">
import Title from "@/components/title.vue";
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/coverPlay.vue";
import { usePlaylistStore } from "@/stores/playlist";
import { usePlayerStore } from "@/stores/player";

const { playlistProgram } = toRefs(usePlaylistStore());
const { getPlaylistProgram, getPlaylistTrackAll } = usePlaylistStore();
const { pushPlayList, play } = usePlayerStore();
const router = useRouter();
onMounted(() => {
  getPlaylistProgram();
});
const getTrackAll = async (id: number) => {
  const res = await getPlaylistTrackAll(id);
  pushPlayList(true, ...res);
  play(res.first().id);
};
</script>
<template>
  <Title routeName="category" title="推荐歌单" class="mt-4" />
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-5">
    <template v-for="(item, index) in playlistProgram" :key="item.id">
      <div v-if="index < 5" class="relative">
        <CoverPlay :picUrl="item.picUrl" :name="item.name" @click="() => getTrackAll(item.id)" :playCount="item.playCount" showPlayCount />
        <div class="truncate text-sm mt-2 hover-text" @click="router.push({ name: 'playlist', query: { id: item.id } })">{{ item.name }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
