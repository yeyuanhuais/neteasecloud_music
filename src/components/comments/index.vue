<script setup lang="ts">
import _axios from "@/plugins/axios";
import { onMounted, reactive, ref } from "vue";
import type { Comments, CommentsData } from "@/models/comment";
import { listToTree, treeTransList } from "@/plugins/utils";
import CommentItem from "./commentItem.vue";

const props = defineProps<{ id: number; type: number }>(); // type  0: 歌曲,1: mv,2: 歌单,3: 专辑,4: 电台节目,5: 视频,6: 动态,7: 电台
const commentList = ref<Comments[]>([]);
const pageData = reactive({
  pageNo: 1,
  pageSize: 20,
  sortType: 3,
  cursor: "",
  total: 0,
  hasMore: false,
});
/* ======== 歌单评论 ======== */
const getComments = async () => {
  const { data, code }: CommentsData = await _axios.get("/comment/new", { params: { id: props.id, type: props.type, ...pageData } });
  if (code === 200) {
    const tree = listToTree(treeTransList(data.comments, "children"), "commentId", "parentCommentId");
    commentList.value.push(...tree);
    pageData.hasMore = data.hasMore;
    pageData.cursor = data.cursor;
    pageData.total = data.totalCount;
  }
};
const loadMore = () => {
  pageData.pageNo++;
  getComments();
};
onMounted(async () => {
  getComments();
});
</script>
<template>
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
    <div class="flex justify-center pt-5" v-if="pageData.hasMore">
      <el-button link class="text-center w-full" @click="loadMore">加载更多</el-button>
    </div>
  </div>
</template>
