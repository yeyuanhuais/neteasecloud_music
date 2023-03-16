<script setup lang="ts">
import Banner from "./comps/banner.vue";
import Exclusive from "./comps/exclusive.vue";
import FM from "./comps/fm.vue";
import Mv from "./comps/mv.vue";
import SongList from "./comps/songList.vue";
import NewMusic from "./comps/newMusic.vue";
</script>
<template>
  <div>
    <Banner />
    <SongList />
    <FM />
    <Exclusive />
    <Mv />
    <NewMusic />
  </div>
</template>

<style lang="scss" scoped></style>
