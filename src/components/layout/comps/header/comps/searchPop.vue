<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Search } from "@icon-park/vue-next";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";
import { debounce } from "lodash";
import type { SearchHotDetail } from "@/models/search";
import _axios from "@/plugins/axios";
import SearchSuggest from "./SearchSuggest.vue";

const { showSearchView, searchKeyword, showHit } = storeToRefs(useSearchStore());
const { suggest } = useSearchStore();
const searchHot = ref<SearchHotDetail[]>([]); // 热门搜索
const searchInput = debounce(() => suggest(), 500, { maxWait: 1000 });
const hotClick = (text: string) => {
  searchKeyword.value = text;
  suggest();
  showSearchView.value = true;
};
onMounted(async () => {
  const { data } = await _axios.get<{ data: SearchHotDetail[] }>("/search/hot/detail");
  searchHot.value = data;
});
</script>
<template>
  <el-popover popper-style="max-width:auto;padding:0" :visible="showSearchView" width="250px" trigger="click">
    <template #reference>
      <el-input placeholder="搜索音乐、MV、歌单" :prefix-icon="Search" clearable @input="searchInput" v-model="searchKeyword" @focus="showSearchView = true" @focusout="showSearchView = false" />
    </template>
    <div class="h-96">
      <el-scrollbar>
        <div class="pb-2.5">
          <div v-if="showHit">
            <div class="pt-2 pb-1.5 px-2.5 border-gray-100 border-solid border-b">热门搜索</div>
            <div v-for="item in searchHot" :key="item.searchWord" class="py-2.5 px-2.5 hover-text cursor-pointer flex justify-between items-center text-xs" @click="hotClick(item.searchWord)">
              <div>
                <span class="mr-1" :title="item.content">{{ item.searchWord }}</span>
              </div>
              <div class="text-red-300 text-xs">
                {{ item.score.numberFormat() }}
              </div>
            </div>
          </div>
          <SearchSuggest v-else />
        </div>
      </el-scrollbar>
    </div>
  </el-popover>
</template>
