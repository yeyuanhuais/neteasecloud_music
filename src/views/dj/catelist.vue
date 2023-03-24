<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDjStore } from "@/stores/dj";
import type { Radio } from "@/models/dj";
import { usePlayerStore } from "@/stores/player";

const route = useRoute();
const djList = ref<Radio[]>([]);
const { getDjTypeList } = useDjStore();
const id = Number(route.query.id);
const cateName = route.query.name;
const router = useRouter();
const { getDjProgram } = useDjStore();
const { play, pushPlayList } = usePlayerStore();

const pageData = reactive({
  init: false,
  loading: false,
  limit: 30,
  before: "",
  hasMore: false,
  page: 1,
});

const getData = async () => {
  pageData.loading = true;
  try {
    const { djRadios, hasMore } = await getDjTypeList({
      type: id,
      limit: pageData.limit,
      page: pageData.page,
      before: pageData.before,
    });
    if (pageData.page === 1) {
      djList.value = djRadios;
    } else {
      djList.value?.push(...djRadios);
    }
    pageData.init = true;
    pageData.loading = false;

    pageData.before = djRadios.last().createTime;
    pageData.hasMore = hasMore;
  } catch (e) {
    pageData.page--;
  }
};

const loadMore = () => {
  getData();
};
const getProgramAll = async (id: number) => {
  const { programs } = await getDjProgram({ id, limit: 99999, page: 1 });
  const mainSongs = programs.map((item: { mainSong: any }) => item.mainSong);
  pushPlayList(true, ...mainSongs);
  play(mainSongs.first().id);
};
onMounted(async () => {
  getData();
});
</script>
<template>
  <div class="p-5">
    <h1 class="text-3xl font-bold pt-8 pb-4">{{ cateName }}</h1>
    <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-6 gap-5">
      <template v-for="item in djList" :key="item.id">
        <div>
          <CoverPlay :picUrl="item.picUrl" :name="item.name" @click="getProgramAll(item.id)" :playCount="item.playCount" showPlayCount />
          <div class="truncate text-xs mt-2 hover-text" @click="router.push({ name: 'djProgram', query: { id: item.id } })">{{ item.name }}</div>
        </div>
      </template>
    </div>
    <div class="flex justify-center pt-5" v-if="pageData.hasMore">
      <el-button link class="text-center w-full" @click="loadMore">加载更多</el-button>
    </div>
  </div>
</template>
<style lang="scss"></style>
