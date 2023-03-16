<script setup lang="ts">
import Title from "@/components/title.vue";
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/coverPlay.vue";
import { useNewMusicStore } from "@/stores/newMusic";

const { newMusicProgram } = toRefs(useNewMusicStore());
const { getNewMusicProgram } = useNewMusicStore();
const router = useRouter();
onMounted(() => {
  getNewMusicProgram();
});
</script>
<template>
  <Title routeName="newMusic" title="推荐新音乐" class="mt-4" />
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-5">
    <template v-for="(item, index) in newMusicProgram" :key="item.id">
      <div v-if="index < 5" @click="router.push({ name: 'fm', query: { id: item.id } })">
        <CoverPlay :picUrl="item.picUrl" :name="item.name" />
        <div class="truncate text-xs mt-2">{{ item.name }}</div>
        <div class="truncate text-xs mt-2 text-gray-400 hover:text-emerald-500">{{ item.song.artists.first().name }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
