<template>
  <div id="app">
    <a-config-provider :theme="{ token: { colorPrimary: '#1890ff' } }">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}
</style>
