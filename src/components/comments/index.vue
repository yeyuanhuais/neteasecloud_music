<script setup lang="ts">
import _axios from "@/plugins/axios";
import { computed, onMounted, ref } from "vue";
import type { Comments } from "@/models/comment";
import { listToTree } from "@/plugins/utils";
import CommentItem from "./commentItem.vue";

const props = defineProps<{ id: number; type: string }>();
const commentList = ref<Comments[]>([]);
const limit = ref<number>(20);
const page = ref<number>(1);
const total = ref<number>(0);
const hotCommentList = ref<Comments[]>([]);
/* ======== 歌单评论 ======== */
const getPlaylistComment = async (before?: number | undefined) => {
  const {
    comments,
    hotComments,
    total: tot,
  } = await _axios.get<
    {
      code: number;
      cnum: number;
      commentBanner: any;
      comments: Comments[];
      hotComments: Comments[];
      isMusician: boolean;
      more: boolean;
      moreHot: boolean;
      topComments: any;
      total: number;
      userId: number;
    },
    any
  >("/comment/playlist", { params: { id: props.id, limit: limit.value, offset: (page.value - 1) * limit.value, before } });
  console.log("%c comments", "font-size:13px; background:pink; color:#bf2c9f;", comments);
  const tree = listToTree(comments, "commentId", "parentCommentId");
  console.log("%c comments", "font-size:13px; background:pink; color:#bf2c9f;", comments);
  commentList.value.push(...tree);
  if (hotComments) {
    hotCommentList.value = listToTree(hotComments, "commentId", "parentCommentId");
  }
  total.value = tot;
};
const loadMore = () => {
  page.value = page.value + 1;
  getPlaylistComment(commentList.value.last().time);
};
const noMore = computed(() => {
  return page.value - total.value / limit.value >= 0;
});
onMounted(async () => {
  switch (props.type) {
    case "playlist":
      getPlaylistComment();
      break;
    default:
      break;
  }
});
</script>
<template>
  <div class="pr-5">
    <p class="text pt-8 pb-4">精彩评论</p>
    <div v-for="item in hotCommentList" :key="item.commentId" class="mb-3 divide-y divide-y-reverse flex flex-col justify-start">
      <CommentItem :comment="item" />
      <div class="pb-2 ml-14">
        <el-button link v-if="item.children.length > 0" @click="item.show = !item.show">{{ item.show ? "收起回复" : `查看 ${item.children.length} 条回复` }}</el-button>
        <div v-if="item.show" class="mt-3 rounded-md py-3 bg-neutral-300 bg-opacity-40 px-4">
          <div v-for="child in item.children" :key="child.commentId" class="flex mb-3 divide-y divide-y-reverse divide-white">
            <CommentItem :comment="child" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pr-5">
    <p class="text pt-8 pb-4">全部评论</p>
    <div v-for="item in commentList" :key="item.commentId" class="mb-3 divide-y divide-y-reverse flex flex-col justify-start">
      <CommentItem :comment="item" />
      <div class="pb-2 ml-14">
        <el-button link v-if="item.children.length > 0" @click="item.show = !item.show">{{ item.show ? "收起回复" : `查看 ${item.children.length} 条回复` }}</el-button>
        <div v-if="item.show" class="mt-3 rounded-md py-3 bg-neutral-300 bg-opacity-40 px-4">
          <div v-for="child in item.children" :key="child.commentId" class="flex mb-3 divide-y divide-y-reverse divide-white">
            <CommentItem :comment="child" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center pt-5" v-if="total > limit && !noMore">
      <el-button link class="text-center w-full" @click="loadMore">加载更多</el-button>
    </div>
  </div>
</template>
