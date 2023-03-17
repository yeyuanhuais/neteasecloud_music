<script setup lang="ts">
import Banner from "./comps/banner.vue";
import Exclusive from "./comps/exclusive.vue";
import FM from "./comps/fm.vue";
import Mv from "./comps/mv.vue";
import Playlist from "./comps/playlist.vue";
import NewMusic from "./comps/newMusic.vue";
</script>
<template>
  <div>
    <Banner />
    <Playlist />
    <FM />
    <Exclusive />
    <Mv />
    <NewMusic />
  </div>
</template>

<style lang="scss" scoped></style>
