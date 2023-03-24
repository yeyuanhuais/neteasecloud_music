<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/coverPlay.vue";
import { useNewMusicStore } from "@/stores/newMusic";
import type { ArtistToplist, RewardToplist, TopListDetail } from "@/models/newMusic";
import { usePlayerStore } from "@/stores/player";
import { usePlaylistStore } from "@/stores/playlist";

const topListDetailData = ref<TopListDetail[]>([]);
const artistToplist = ref<ArtistToplist>();
const rewardToplist = ref<RewardToplist>();
const { getTopListDetailData } = useNewMusicStore();
const { getPlaylistTrackAll } = usePlaylistStore();
const { pushPlayList, play } = usePlayerStore();
const router = useRouter();
onMounted(async () => {
  const res = await getTopListDetailData();
  topListDetailData.value = res.list;
  artistToplist.value = res.artistToplist;
  rewardToplist.value = res.rewardToplist;
});
const toPlaylist = (topListDetail: TopListDetail) => {
  router.push({ name: "playlist", query: { id: topListDetail.id } });
};
const getTrackAll = async (id: number) => {
  const res = await getPlaylistTrackAll(id);
  pushPlayList(true, ...res);
  play(res.first().id);
};
</script>
<template>
  <div class="text-xl pb-5 font-bold">官方榜</div>
  <div class="grid grid-flow-row grid-cols-3 2xl:grid-cols-4 gap-5">
    <div v-for="item in topListDetailData.slice(0, 4)" :key="item.id" class="flex bg-dc rounded-lg items-center cursor-pointer" @click="toPlaylist(item)">
      <CoverPlay :name="item.name" :pic-url="item.coverImgUrl" :play-count="item.playCount" class="w-36 flex-shrink-0" showPlayCount @click.stop="() => getTrackAll(item.id)" />
      <div class="px-5 flex-1 flex-shrink-0 flex flex-col">
        <div class="text-xl font-bold">{{ item.name }}</div>
        <div class="text-xs text-main mt-2">
          <div v-for="(track, index) in item.tracks" :key="index" class="mt-2">
            <div class="flex">
              <span class="mr-1">{{ index + 1 }}</span>
              <div class="flex-auto w-20 truncate hover-text">{{ track.first }} - {{ track.second }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="artistToplist" class="flex bg-dc rounded-lg items-center cursor-pointer">
      <CoverPlay :name="artistToplist.name" :pic-url="artistToplist.coverUrl" class="w-36 flex-shrink-0" />
      <div class="px-5 flex-1 flex-shrink-0 flex flex-col">
        <div class="text-xl font-bold">{{ artistToplist.name }}</div>
        <div class="text-xs text-main mt-2">
          <div v-for="(track, index) in artistToplist.artists" :key="index" class="mt-2">
            <div class="flex">
              <span class="mr-1">{{ index + 1 }}</span>
              <div class="flex-auto w-20 truncate hover-text">{{ track.first }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="rewardToplist" class="flex bg-dc rounded-lg items-center cursor-pointer">
      <CoverPlay :name="rewardToplist.name" :pic-url="rewardToplist.coverUrl" class="w-36 flex-shrink-0" />
      <div class="px-5 flex-1 flex-shrink-0 flex flex-col">
        <div class="text-xl font-bold">{{ rewardToplist.name }}</div>
        <div class="text-xs text-main mt-2">
          <div v-for="(track, index) in rewardToplist.songs" :key="index" class="mt-2">
            <div class="flex">
              <span class="mr-1">{{ index + 1 }}</span>
              <div class="flex-auto w-20 truncate hover-text">{{ track.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-xl py-5 font-bold">特色榜</div>
  <div class="grid grid-flow-row grid-cols-6 2xl:grid-cols-10 gap-5">
    <div v-for="item in topListDetailData.slice(4)" :key="item.id" @click="toPlaylist(item)">
      <CoverPlay :name="item.name" :pic-url="item.coverImgUrl" :play-count="item.playCount" showPlayCount @click.stop="() => getTrackAll(item.id)" />
      <div class="text-sm mt-2 hover-text">{{ item.name }}</div>
    </div>
  </div>
</template>

<style lang="scss"></style>
