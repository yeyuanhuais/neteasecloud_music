<script setup lang="ts">
import { RouterView } from "vue-router";
import { userPlayerInit } from "./stores/player";
userPlayerInit();
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
