<script setup lang="ts">
import { Plus, Fm, More } from "@icon-park/vue-next";

import IconPark from "@/components/iconPark.vue";
import type { ArtistDetail } from "@/models/artist";
import MoreText from "@/components/moreText.vue";

defineProps<{
  artistDetail: ArtistDetail;
}>();
</script>
<template>
  <div class="flex items-stretch">
    <img :src="artistDetail.artist.cover" alt="" class="w-44 h-44 object-cover rounded-full flex-shrink-0" />
    <div class="pl-5 flex flex-col justify-between py-1 flex-1">
      <div class="flex flex-col justify-between flex-1">
        <div class="text-2xl font-bold">{{ artistDetail.artist.name }}</div>
        <div class="text-xs text-gray-500 leading-normal mt-2">
          <MoreText :text="artistDetail.artist.briefDesc" :end="90" />
        </div>
        <div class="flex text-xs gap-x-5 text-slate-500 mt-2">
          <div>
            单曲数：<span>{{ artistDetail.artist.musicSize }}</span>
          </div>
          <div>
            专辑数：<span>{{ artistDetail.artist.albumSize }}</span>
          </div>
          <div>
            MV数：<span>{{ artistDetail.artist.mvSize }}</span>
          </div>
        </div>
      </div>
      <div class="justify-self-stretch mt-5 gap-x-2 flex items-center">
        <button class="w-32 button">
          <IconPark :icon="Plus" size="18" class="mr-1" />
          <span>关注</span>
        </button>
        <button class="w-32 button-outline">
          <IconPark :icon="Fm" size="18" class="mr-1" />
          <span>歌手电台</span>
        </button>
        <button class="button-outline w-8">
          <IconPark :icon="More" />
        </button>
      </div>
    </div>
  </div>
</template>
