<script setup lang="ts">
import Menu from "./comps/menu/index.vue";
import Header from "./comps/header/index.vue";
import Footer from "./comps/footer/index.vue";
import PlayList from "./comps/playList/index.vue";
</script>
<template>
  <div class="w-screen h-screen flex items-stretch overflow-hidden">
    <div class="w-56 h-screen flex-shrink-0"><Menu /></div>
    <div class="flex-1 flex flex-col">
      <div class="h-14">
        <Header />
      </div>
      <div class="flex-1 overflow-hidden">
        <el-scrollbar>
          <div class="container mx-auto">
            <RouterView />
          </div>
        </el-scrollbar>
      </div>
      <div class="h-20">
        <Footer />
      </div>
    </div>
    <PlayList />
  </div>
</template>

<style lang="scss" scoped></style>
