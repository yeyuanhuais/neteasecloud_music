<script setup lang="ts">
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFmStore } from "@/stores/fm";

const { fmCatelist } = toRefs(useFmStore());
const { getFmCatelist } = useFmStore();
onMounted(() => {
  getFmCatelist();
});
const router = useRouter();
</script>
<template>
  <div class="grid grid-flow-row grid-cols-4 lg:grid-cols-7 gap-3">
    <template v-for="item in fmCatelist" :key="item.id">
      <div @click="router.push({ name: 'fm', query: { id: item.id } })" class="bg-stone-300 bg-opacity-20 flex flex-col justify-center items-center p-6 hover:text-emerald-400 cursor-pointer">
        <img :src="item.pic56x56Url" :alt="item.name" class="w-14 h-14 filter hue-rotate-180" />
        <div class="truncate text-xs mt-2">{{ item.name }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
