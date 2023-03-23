<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Info from "./comps/information.vue";
import { useRoute } from "vue-router";
import DjListItem from "@/components/djListItem.vue";
import { useNumberFormat } from "@/plugins/utils";
import Comments from "@/components/comments/index.vue";
import { useDjStore } from "@/stores/dj";
import type { DjDetail, DjProgramRecommend } from "@/models/dj";

const djDetail = ref<DjDetail>();
const programList = ref<DjProgramRecommend[]>([]);
const programTotal = ref<number>(0);
const tab = ref("songs");
const route = useRoute();
const { getDjDetail, getDjProgram } = useDjStore();
const id = Number(route.query.id);

const pageData = reactive({
  init: false,
  loading: false,
  limit: 20,
  before: 0,
  more: false,
  page: 1,
});

const getProgramData = async () => {
  pageData.loading = true;
  try {
    const { programs, count, more } = await getDjProgram({
      id,
      limit: pageData.limit,
      page: pageData.page,
    });
    if (pageData.page === 1) {
      programList.value = programs;
    } else {
      programList.value?.push(...programs);
    }
    programTotal.value = count;
    pageData.init = true;
    pageData.loading = false;

    pageData.before = programs.last().createTime;
    pageData.more = more;
  } catch (e) {
    pageData.page--;
  }
};

const loadMore = () => {
  pageData.page++;
  getProgramData();
};
onMounted(async () => {
  djDetail.value = await getDjDetail(id);
  getProgramData();
});
</script>
<template>
  <div class="p-5" v-if="djDetail">
    <Info :djDetail="djDetail" />

    <el-tabs class="mt-3" v-model="tab">
      <el-tab-pane lazy :label="`声音 ${programTotal}`" name="songs">
        <div class="flex text-xs text-gray-400 py-2">
          <div class="flex-auto">声音</div>
          <div class="w-1/4">歌手</div>
          <div class="w-40">时间</div>
          <div class="w-20">时长</div>
        </div>
        <template v-for="program in programList" :key="program.id">
          <DjListItem :dj="program" />
        </template>
        <div class="py-10" v-if="pageData.more">
          <el-button link class="text-center w-full" @click="loadMore" :loading="pageData.loading">加载更多</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane lazy label="详情" name="desc">
        <div class="text-sm text-slate-500 leading-7" style="white-space: pre-wrap" v-html="djDetail?.desc"></div>
      </el-tab-pane>
      <el-tab-pane lazy :label="`评论 ${useNumberFormat(djDetail.commentCount)}`" name="comments">
        <Comments :id="Number(route.query.id)" :type="7" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss"></style>
