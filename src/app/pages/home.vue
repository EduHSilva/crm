<template>
  <h1>
    {{ useUser().value?.username }}
  </h1>
</template>

<script setup lang="ts">
import { useUser } from '~/plugins/userService'
</script>
