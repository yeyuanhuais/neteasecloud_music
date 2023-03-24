<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ArtistDesc } from "@/models/artist";
import { useArtistStore } from "@/stores/artist";

const props = defineProps<{ id: number }>();
const { getArtistDesc } = useArtistStore();

const artistDesc = ref<ArtistDesc>();

onMounted(async () => {
  artistDesc.value = await getArtistDesc(props.id);
});
</script>
<template>
  <div v-loading="!artistDesc" style="min-height: 200px">

    <template v-if="artistDesc && artistDesc?.introduction?.length > 0">
      <div v-for="(item, index) in artistDesc?.introduction" :key="index">
        <div class="py-5 font-bold text-sm">{{ item.ti }}</div>
        <div class="text-xs text-slate-500 leading-7" style="white-space: pre-wrap" v-html="item.txt" />
      </div>
    </template>
    <el-empty description="暂无数据" v-else />
  </div>
</template>

<style lang="scss"></style>
