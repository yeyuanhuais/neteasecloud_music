<script setup lang="ts">
import Title from "@/components/title.vue";
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/coverPlay.vue";
import { useMvStore } from "@/stores/mv";

const { mvProgram } = toRefs(useMvStore());
const { getMvProgram } = useMvStore();
const router = useRouter();
onMounted(() => {
  getMvProgram();
});
</script>
<template>
  <Title routeName="mv" title="推荐MV" class="mt-4" />
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-5">
    <template v-for="(item, index) in mvProgram" :key="item.id">
      <div v-if="index < 5" @click="router.push({ name: 'dj', query: { id: item.id } })">
        <CoverPlay :picUrl="item.picUrl" video :name="item.name" />
        <div class="truncate text-xs mt-2">{{ item.copywriter }}</div>
        <div class="truncate text-xs mt-2 text-gray-400 hover-text">{{ item.artistName }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
