<script setup lang="ts">
import Title from "@/components/title.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/coverPlay.vue";
import { useDigitalStore } from "@/stores/digital";
import type { Products } from "@/models/digital";
const { getAlbumStyle } = useDigitalStore();
const router = useRouter();
const products = ref<Products[]>([]);
const pageData = reactive({
  area: "Z_H",
  limit: 20,
  page: 1,
  loading: false,
  noMore: false,
});
const offset = computed(() => {
  if (pageData.page === 1) return 0;
  return products.value.length + pageData.limit;
});
const getData = async () => {
  try {
    const { albumProducts: data } = await getAlbumStyle(pageData.limit, offset.value, pageData.area);
    if (pageData.page === 1) {
      products.value = data;
    } else {
      products.value.push(...data);
    }
    if (data.length < pageData.limit) pageData.noMore = true;
  } catch (e) {
    pageData.page--;
  }
  pageData.loading = false;
};

const loadMore = () => {
  pageData.page++;
  getData();
};
const setOrder = (o: "Z_H" | "E_A" | "KR" | "JP") => {
  pageData.page = 1;
  pageData.area = o;
  getData();
};
onMounted(async () => {
  await getData();
});
</script>
<template>
  <Title title="语种风格馆" class="mt-4" />
  <div class="gap-x-5 flex mr-10 text-sm mb-3 w-full justify-end">
    <div class="hover-text" :class="{ 'text-emerald-400': pageData.area === 'Z_H' }" @click="setOrder('Z_H')">华语</div>
    <div class="hover-text" :class="{ 'text-emerald-400': pageData.area === 'E_A' }" @click="setOrder('E_A')">欧美</div>
    <div class="hover-text" :class="{ 'text-emerald-400': pageData.area === 'KR' }" @click="setOrder('KR')">韩国</div>
    <div class="hover-text" :class="{ 'text-emerald-400': pageData.area === 'JP' }" @click="setOrder('JP')">日本</div>
  </div>
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-6 gap-5">
    <div v-for="item in products" :key="item.albumId" class="relative" @click="router.push({ name: 'album', query: { id: item.albumId } })">
      <CoverPlay :picUrl="item.coverUrl" :name="item.albumName" />
      <div class="truncate text-sm mt-2 hover-text">{{ item.albumName }}</div>
      <div class="truncate text-xs mt-1 hover-text text-gray-400">{{ item.artistName }}</div>
      <div class="truncate text-xs mt-1 text-gray-400">￥ {{ item.price }}</div>
    </div>
  </div>
  <div class="flex justify-center py-5" v-if="products.length > 0 && !pageData.noMore">
    <el-button :loading="pageData.loading" link class="text-center w-full" @click="loadMore">加载更多</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
