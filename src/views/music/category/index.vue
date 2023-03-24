<script setup lang="ts">
import PlaylistHot from "./comps/playlistHot.vue";
import { onMounted, reactive, ref } from "vue";
import type { PlaylistDetail } from "@/models/playlist";
import CoverPlay from "@/components/coverPlay.vue";
import { useRouter } from "vue-router";
import _axios from "@/plugins/axios";
import { usePlayerStore } from "@/stores/player";
import { usePlaylistStore } from "@/stores/playlist";

const list = ref<PlaylistDetail[]>();

const { getPlaylistTrackAll } = usePlaylistStore();
const { pushPlayList, play } = usePlayerStore();
const router = useRouter();

const pageData = reactive({
  init: false,
  loading: false,
  limit: 35,
  before: "",
  more: false,
  cat: "全部",
});

const catChange = (cat: string) => {
  pageData.cat = cat;
  pageData.before = "";
  pageData.more = false;

  getData();
};

const getData = async () => {
  pageData.loading = true;
  try {
    const {
      playlists,
      lasttime,
      more,
    }: {
      playlists: PlaylistDetail[];
      more: boolean;
      lasttime: string;
    } = await _axios.get("/top/playlist", { params: { limit: pageData.limit, before: pageData.before, cat: pageData.cat } });
    if (!pageData.before) {
      list.value = playlists;
    } else {
      list.value?.push(...playlists);
    }
    pageData.init = true;
    pageData.loading = false;

    pageData.before = lasttime;
    pageData.more = more;
  } catch (e) {}
};

const loadMore = () => {
  getData();
};

const getTrackAll = async (id: number) => {
  const res = await getPlaylistTrackAll(id);
  pushPlayList(true, ...res);
  play(res.first().id);
};
onMounted(getData);
</script>
<template>
  <PlaylistHot @cat-change="catChange" />
  <div class="py-5 text-xl">{{ pageData.cat }} 歌单</div>

  <div class="gap-5 grid grid-flow-row grid-cols-3 lg:grid-cols-6 2xl:grid-cols-7">
    <div v-for="(item, index) in list" :key="index" :class="{ 'item-1': index === 0 }">
      <CoverPlay :name="item.name" :picUrl="item.coverImgUrl" :playCount="item.playCount" showPlayCount @click="() => getTrackAll(item.id)" />
      <div class="mt-2 text-sm text-main leading-5 hover-text" @click="router.push({ name: 'playlist', query: { id: item.id } })">{{ item.name }}</div>
      <div class="mt-2 text-xs text-main truncate text-dc hover-text">{{ item.creator.nickname }}</div>
    </div>
  </div>
  <div class="py-10" v-if="pageData.more">
    <el-button link class="text-center w-full" @click="loadMore" :loading="pageData.loading">加载更多</el-button>
  </div>
</template>

<style lang="scss"></style>
