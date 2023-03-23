<script setup lang="ts">
import { PlayOne, Like, More } from "@icon-park/vue-next";

import MoreText from "@/components/moreText.vue";
import IconPark from "@/components/iconPark.vue";
import type { PlaylistDetail } from "@/models/playlist";
defineProps<{
  playlist: PlaylistDetail;
  playAll?:() => void;
}>();
</script>
<template>
  <div class="flex items-stretch">
    <img :src="playlist.coverImgUrl" alt="" class="w-44 h-44 object-cover rounded-xl flex-shrink-0" />
    <div class="pl-5 flex flex-col justify-between py-1 flex-1">
      <div>
        <div class="text-2xl font-bold">{{ playlist.name }}</div>
        <div class="flex items-center text-xs text-dc pb-2 pt-3">
          <el-avatar :src="playlist.creator.avatarUrl" size="small" round />
          <span class="ml-2">{{ playlist.creator.nickname }}</span>
          <div class="ml-5 flex text-dc">
            <el-tag v-for="tag in playlist.tags" :key="tag" class="mx-1 hover-text" effect="light" round type="info" size="small">
              {{ tag }}
            </el-tag>
          </div>
        </div>
        <div class="text-xs text-gray-400 leading-normal">
          <MoreText :text="playlist.description" :end="90" />
        </div>
      </div>
      <div class="justify-self-stretch mt-5 gap-x-2 flex items-center">
        <button class="w-32 button" @click="playAll">
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
