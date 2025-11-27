<template>
  <UModal title="Modal with title">
    <UButton
      :label="$t('newBudget')"
      :class="'bg-primary dark:bg-primary-dark'"
    />

    <template #body>
      teste
    </template>
  </UModal>
</template>

<script setup lang="ts">
</script>
