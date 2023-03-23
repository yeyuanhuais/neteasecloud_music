<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";
import type { MvUrl, SimiMv } from "@/models/mv";
import { usePlayerStore } from "@/stores/player";
import { useMvStore } from "@/stores/mv";
import Comments from "@/components/comments/index.vue";
import { useNumberFormat } from "@/plugins/utils";

const route = useRoute();

const id = Number(route.query.id);
const { getMvUrl, getSimiMv } = useMvStore();

const { setPlay, setPause } = usePlayerStore();

const mvUrl = ref<MvUrl>();
const simiMv = ref<SimiMv[]>([]);

onMounted(async () => {
  mvUrl.value = await getMvUrl(id);
  simiMv.value = await getSimiMv(id);

  setPause();
});

onUnmounted(() => {
  setTimeout(() => {
    setPlay();
  }, 1000);
});
</script>
<template>
  <div class="p-5" v-if="mvUrl">
    <div class="flex gap-x-5 h-500px">
      <div class="flex-1">
        <video class="aspect-video w-full" :src="mvUrl?.url" autoplay="false" controls />
      </div>
      <div class="hidden w-1/3 flex-shrink-0 xl:block">
        <el-scrollbar>
          <div>相关推荐</div>
          <div v-for="item in simiMv" :key="item.id" class="flex items-center mt-2">
            <div class="relative h-20 w-36">
              <img :src="item.cover" alt="" class="w-full h-full" />
              <span class="absolute top-1 right-1 text-xs text-white">{{ useNumberFormat(item.playCount) }}</span>
            </div>
            <div class="px-2 text-sm">
              <div class="">{{ item.name }}</div>
              <div class="text-gray-400 text-xs mt-2">{{ item.artistName }}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div>
      <Comments :id="Number(route.query.id)" :type="1" />
    </div>
  </div>
</template>

<style lang="scss"></style>
