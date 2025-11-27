<script setup lang="ts">
const props = defineProps({
  extraClass: {
    type: String
  }
})
</script>

<template>
  <UModal title="Modal with title">
    <UButton
      :label="$t('newClient')"
      class="bg-primary dark:bg-primary-dark"
      :class="props.extraClass"
    />

    <template #body>
      teste
    </template>
  </UModal>
</template>
