<script setup lang="ts">
import Title from "@/components/title.vue";
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFmStore } from "@/stores/fm";
import IconPark from "@/components/iconPark.vue";
import { Like } from "@icon-park/vue-next";

const { programRecommend } = toRefs(useFmStore());
const { getProgramRecommend } = useFmStore();
const router = useRouter();
onMounted(() => {
  getProgramRecommend();
});
</script>
<template>
  <Title title="推荐节目" class="mt-4" />
  <div class="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5">
    <template v-for="(item, index) in programRecommend" :key="item.id">
      <div v-if="index < 5" @click="router.push({ name: 'fm', query: { id: item.id } })" :title="item.description" class="flex items-center">
        <img :src="item.coverUrl" class="w-20 rounded" />
        <div class="ml-4 text-sm">
          <div class="truncate">{{ item.name }}</div>
          <div class="truncate mt-2 text-gray-400 hover:text-emerald-500">{{ item.mainSong.artists.first().name }}</div>
        </div>
        <IconPark class="justify-self-end text-stone-300 hover:text-emerald-400 ml-auto" :size="20" :icon="Like" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
