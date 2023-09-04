<template>
  <div>test match</div>
  <!-- <span>{{ messageStore.message }}</span> -->
  <button type="button" @click="changeMsg">click</button>
  <Bar1child>
    <template v-slot="{ text, count }">
      <span>{{ text }}</span>
      <span>{{ count }}</span>
    </template>
  </Bar1child>
</template>

<script lang="ts">
import { useNoticeStore } from '@/stores'
import Bar1child from './bar1child.vue'
export default {
  components: { Bar1child },
  setup() {
    const messageStore = useNoticeStore()
    console.log(messageStore.message)
    const changeMsg = (e: Event): void => {
      messageStore.message = 'change from bar1'
      console.log(e.currentTarget)
    }
    return {
      messageStore,
      changeMsg,
    }
  },
}
</script>

<style lang="scss" scoped></style>
