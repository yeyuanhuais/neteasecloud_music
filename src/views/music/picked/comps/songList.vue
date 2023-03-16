<script setup lang="ts">
import Title from "@/components/title.vue";
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/coverPlay.vue";
import { useSongListStore } from "@/stores/songList";

const { songListProgram } = toRefs(useSongListStore());
const { getSongListProgram } = useSongListStore();
const router = useRouter();
onMounted(() => {
  getSongListProgram();
});
</script>
<template>
  <Title routeName="songList" title="推荐歌单" class="mt-4" />
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-5">
    <template v-for="(item, index) in songListProgram" :key="item.id">
      <div v-if="index < 5" @click="router.push({ name: 'fm', query: { id: item.id } })">
        <CoverPlay :picUrl="item.picUrl" :name="item.name" />
        <div class="truncate text-xs mt-2">{{ item.name }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
