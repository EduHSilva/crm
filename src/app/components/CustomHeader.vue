<template>
  <UHeader class="bg-light dark:bg-dark">
    <template #left>
      <NuxtLink to="/">
        <img
          src="/images/logo.png"
          alt="logo"
          class="w-40 dark:invert-100 dark:grayscale"
        >
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />

      <UButton
        to="/login"
        class="bg-primary dark:bg-primary-dark"
      >
        Login
      </UButton>
      <UButton
        to="/login"
        variant="outline"
      >
        Registrar
      </UButton>
    </template>
  </UHeader>
</template>
