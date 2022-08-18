<template>
  <div>
    <not-logged-in-header />
    <not-logged-in-home-top />
    <not-logged-in-footer />
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  }),
  middleware: ['logged-in-redirect']
}
</script>
