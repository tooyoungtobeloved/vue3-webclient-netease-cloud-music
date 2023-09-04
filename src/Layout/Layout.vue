<template>
  <div>
    <GLobalHeader />
    <router-view />
    <GlobalFooter />
    <Player />
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
import Player from '@/components/Player/index.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { GLobalHeader: Header, GlobalFooter: Footer, Player },
  setup() {
    return {}
  },
})
</script>

<style scoped>
ul {
  list-style: none;
}
.active {
  background-color: red;
}
</style>
