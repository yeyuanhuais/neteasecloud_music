<script setup lang="ts">
import { RouterView } from "vue-router";
import { usePlayerInit } from "./stores/player";
usePlayerInit();
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
