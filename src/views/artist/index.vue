<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ArtistDetail } from "@/models/artist";
import Info from "./Info.vue";
import Desc from "./Desc.vue";
import Songs from "./Songs.vue";
import Album from "./Album.vue";
import Video from "./Video.vue";
import Picked from "./picked/index.vue";
import { useArtistStore } from "@/stores/artist";

const route = useRoute();
const router = useRouter();
const id = Number(route.query.id);
const artistDetail = ref<ArtistDetail>();
const { getArtistDetail } = useArtistStore();
const tab = ref("music");
onMounted(async () => {
  artistDetail.value = await getArtistDetail(id);
});
watch(route, () => {
  router.go(0);
});
</script>
<template>
  <div class="artist-detail p-5" v-if="artistDetail">
    <Info :artist-detail="artistDetail" />

    <el-tabs class="mt-3" v-model="tab">
      <el-tab-pane lazy label="精选" name="picked">
        <Picked :id="id" />
      </el-tab-pane>
      <el-tab-pane lazy :label="`歌曲 ${artistDetail.artist.musicSize}`" name="music">
        <Songs :id="id" />
      </el-tab-pane>
      <el-tab-pane lazy :label="`专辑 ${artistDetail.artist.albumSize}`" name="album">
        <Album :id="id" />
      </el-tab-pane>
      <el-tab-pane lazy :label="`视频 ${artistDetail.artist.mvSize}`" name="mv">
        <Video :id="id" />
      </el-tab-pane>
      <el-tab-pane lazy label="详情" name="desc">
        <Desc :id="id" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss">
.artist-detail {
  .el-tabs__nav-wrap::after {
    height: 0;
  }

  .el-tabs__header {
    @apply m-0;
  }
}
</style>
