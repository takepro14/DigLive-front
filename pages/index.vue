<template>
  <div>
    <NotLoggedInHeader />
    <NotLoggedInHomeTop />
    <NotLoggedInFooter />
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
