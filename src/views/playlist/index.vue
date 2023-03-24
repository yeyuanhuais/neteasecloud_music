<script setup lang="ts">
import type { PlaylistDetail } from "@/models/playlist";
import type { Song } from "@/models/song";
import _axios from "@/plugins/axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePlayerStore } from "@/stores/player";
import { usePlaylistStore } from "@/stores/playlist";
import Info from "./comps/information.vue";
import SongList from "./comps/songList.vue";
import Comments from "@/components/comments/index.vue";
import { useNumberFormat } from "@/plugins/utils";

const { pushPlayList, play } = usePlayerStore();
const { getPlaylistTrackAll } = usePlaylistStore();
const playlist = ref<PlaylistDetail>();
const songs = ref<Song[]>([]);
const tabValue = ref<string>("tracks");
const route = useRoute();
const playAll = () => {
  pushPlayList(true, ...songs.value);
  play(songs.value.first().id);
};

onMounted(async () => {
  const id: number = Number(route.query.id);
  const {
    playlist: dataPlay,
  }: {
    playlist: PlaylistDetail;
    relatedVideos: any;
    resEntrance: any;
    sharedPrivilege: any;
    songFromUsers: any;
    urls: any;
    privileges: any;
    code: number;
    fromUserCount: number;
    fromUsers: any;
  } = await _axios.get("/playlist/detail", { params: { id, s: 8 } });
  playlist.value = dataPlay;
  const dataSong = await getPlaylistTrackAll(id);
  songs.value = dataSong;
});
</script>
<template>
  <div class="playlist">
    <div class="p-5" v-if="playlist">
      <Info :playlist="playlist" :play-all="() => playAll()" />
      <el-tabs class="mt-3" v-model="tabValue">
        <el-tab-pane lazy :label="`歌曲 ${useNumberFormat(playlist.trackCount)}`" name="tracks"><SongList :songs="songs || []" /></el-tab-pane>
        <el-tab-pane lazy :label="`评论 ${useNumberFormat(playlist.commentCount)}`" name="comments">
          <Comments :id="Number(route.query.id)" :type="2" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss">
.playlist {
  .el-tabs__nav-wrap::after {
    height: 0;
  }

  .el-tabs__header {
    @apply m-0;
  }
}
</style>
