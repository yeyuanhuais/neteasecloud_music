<script setup lang="ts">
import { Like, More, PlayOne } from "@icon-park/vue-next";
import IconPark from "@/components/iconPark.vue";
import type { DjDetail } from "@/models/dj";
import { useDjStore } from "@/stores/dj";
import { usePlayerStore } from "@/stores/player";

const props = defineProps<{
  djDetail: DjDetail;
}>();
const { getDjProgram } = useDjStore();
const { play, pushPlayList } = usePlayerStore();
const getProgramAll = async () => {
  const { programs } = await getDjProgram({ id: props.djDetail.id, limit: 99999, page: 1 });
  const mainSongs = programs.map((item: { mainSong: any }) => item.mainSong);
  pushPlayList(true, ...mainSongs);
  play(mainSongs.first().id);
};
</script>
<template>
  <div class="flex items-stretch">
    <div class="relative">
      <img :src="djDetail.picUrl" alt="" class="w-44 h-44 object-cover rounded-xl flex-shrink-0" />
      <span v-if="djDetail.icon" class="absolute top-3 left-1 rounded-xl px-2 py-0.5 text-xs text-white" :style="{ backgroundColor: djDetail.icon.color }">{{ djDetail.icon.value }}</span>
    </div>
    <div class="pl-5 flex flex-col justify-between py-1 flex-1">
      <div class="flex flex-col justify-between flex-1">
        <div class="text-2xl font-bold">{{ djDetail.name }}</div>
        <div class="flex items-center text-xs text-gray-600">
          <img :src="djDetail.dj.avatarUrl" alt="" class="w-5 h-5 object-cover rounded-full flex-shrink-0 mr-1" />
          <span class="">{{ djDetail?.dj?.nickname }}</span>
        </div>
        <div class="text-xs text-gray-400 leading-normal">
          {{ djDetail.rcmdText }}
        </div>
        <div class="text-xs text-gray-400 leading-normal">
          {{ djDetail.lastProgramCreateTime.toDate() }}
        </div>
      </div>
      <div class="justify-self-stretch mt-5 gap-x-2 flex items-center">
        <button class="w-32 button" @click="getProgramAll">
          <IconPark :icon="PlayOne" size="22" class="mr-1" />
          <span>播放全部</span>
        </button>
        <button class="w-32 button-outline">
          <IconPark :icon="Like" size="18" class="mr-1" />
          <span>收藏</span>
        </button>
        <button class="button-outline w-8">
          <IconPark :icon="More" />
        </button>
      </div>
    </div>
  </div>
</template>
