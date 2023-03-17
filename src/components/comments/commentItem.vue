<script setup lang="ts">
import type { Comments } from "@/models/comment";
import dayjs from "dayjs";
import IconPark from "../iconPark.vue";
import { GoodTwo } from "@icon-park/vue-next";
import { useNumberFormat } from "@/plugins/utils";

defineProps<{ comment: Comments }>();
</script>
<template>
  <div class="flex w-full">
    <el-avatar :src="comment.user.avatarUrl" class="w-1/12" />
    <div class="ml-5 w-11/12 pb-2">
      <div class="text-gray-500">{{ comment.user.nickname }}</div>
      <div>
        <div class="text-gray-500">
          <span>{{ dayjs(comment.time).format("YYYY 年 MM 月 DD 日 hh:mm") }}</span>
          <span class="ml-3" v-if="comment.ipLocation.location">来自{{ comment.ipLocation.location }}</span>
        </div>
        <div class="mt-2">{{ comment.content }}</div>
        <div class="text-gray-500 flex my-2">
          <div class="flex items-center">
            <icon-park :icon="GoodTwo" />
            <span class="ml-1">{{ useNumberFormat(comment.likedCount) }}</span>
          </div>
          <el-button class="ml-3 hover-text" link>回复</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
