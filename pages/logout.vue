<script>
export default {
  async middleware ({ $auth, redirect, store }) {
    await $auth.logout()
      .then(() => {
        return redirect('/')
      })
  }
}
</script>
