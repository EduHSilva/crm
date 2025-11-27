<template>
  <UModal title="Modal with title">
    <UButton
      :label="$t('newService')"
      :class="props.variant ? '' : 'bg-primary dark:bg-primary-dark'"
      :variant="props.variant ?? 'solid'"
    />

    <template #body>
      teste
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: String
})
</script>
