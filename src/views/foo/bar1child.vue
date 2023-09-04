<template>
  <div>
    <div>{{ store.message }}</div>
    <div>{{ message }}</div>
    <span>{{ randomMessages.join('-') }}</span>
    <button type="button" @click="resetMessage">resetMsg</button>
    <slot text="text" :count="123"> </slot>
  </div>
</template>

<script lang="ts">
import { useNoticeStore } from '@/stores'
import { useMessageStore } from '@/stores'
import { storeToRefs } from 'pinia'
export default {
  setup() {
    const store = useNoticeStore()
    const messageStore = useMessageStore()
    const { randomMessages } = storeToRefs(store)
    const resetMessage = () => {
      // store.message = 'reset from child component'
      store.$patch({
        message: '$patch change',
        randomMessages: ['$1', '$2', '$3'],
      })
      store.asyncSetMessage().then((res) => {
        console.log(res)
      })
      // store.$reset()
    }
    store.$subscribe((mutation, state) => {
      console.log(mutation)
      console.log(state)
    })
    return {
      store,
      randomMessages,
      resetMessage,
      ...storeToRefs(messageStore),
    }
  },
}
</script>

<style lang="scss" scoped></style>
