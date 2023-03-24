<script setup lang="ts">
import HotSong from "./comps/hotSong.vue";
import SimiArtist from "./comps/simiArtist.vue";
defineProps<{ id: number }>();
</script>
<template>
  <div>
    <HotSong :id="id" />
    <SimiArtist :id="id" />
  </div>
</template>

<style lang="scss" scoped></style>
