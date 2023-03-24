<script setup lang="ts">
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDjStore } from "@/stores/dj";

const { djCateList } = toRefs(useDjStore());
const { getDjCatelist } = useDjStore();
onMounted(() => {
  getDjCatelist();
});
const router = useRouter();
</script>
<template>
  <div class="grid grid-flow-row grid-cols-7 lg:grid-cols-10 gap-3">
    <template v-for="item in djCateList" :key="item.id">
      <div @click="router.push({ name: 'catelist', query: { id: item.id, name: item.name } })" class="bg-stone-300 bg-opacity-20 flex flex-col justify-center items-center p-6 hover-text c">
        <img :src="item.pic56x56Url" :alt="item.name" class="w-14 h-14 filter hue-rotate-180" />
        <div class="truncate text-xs mt-2">{{ item.name }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
