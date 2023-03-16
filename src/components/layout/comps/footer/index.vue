<script setup lang="ts">
import PlayerSlider from "./comps/playerSlider.vue";
import PlayerSong from "./comps/playerSong.vue";
import PlayerController from "./comps/playerController.vue";
import PlayerAction from "./comps/playerAction.vue";
</script>
<template>
  <div class="flex flex-col items-stretch h-20">
    <PlayerSlider />
    <div class="flex grow px-5 items-center">
      <div class="flex-1">
        <PlayerSong />
      </div>
      <div class="flex-1">
        <PlayerController />
      </div>
      <div class="flex-1">
        <PlayerAction />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
