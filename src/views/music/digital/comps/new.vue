<script setup lang="ts">
import Title from "@/components/title.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/coverPlay.vue";
import { useDigitalStore } from "@/stores/digital";
import type { Products } from "@/models/digital";
const { getNewAlbum } = useDigitalStore();
const router = useRouter();
const products = ref<Products[]>([]);
const getData = async () => {
  try {
    const { products: data } = await getNewAlbum(12, 0);
    products.value = data;
  } catch (e) {}
};

onMounted(async () => {
  await getData();
});
</script>
<template>
  <Title title="最新上架" class="mt-2" />
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-6 gap-5">
    <div v-for="item in products" :key="item.albumId" class="relative" @click="router.push({ name: 'album', query: { id: item.albumId } })">
      <CoverPlay :picUrl="item.coverUrl" :name="item.albumName" />
      <div class="truncate text-sm mt-2 hover-text">{{ item.albumName }}</div>
      <div class="truncate text-xs mt-1 hover-text text-gray-400">{{ item.artistName }}</div>
      <div class="truncate text-xs mt-1 text-gray-400">￥ {{ item.price }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
