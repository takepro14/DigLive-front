<script>
export default {
  async middleware ({ $auth, redirect }) {
    await $auth.logout()
      .then(() => {
        return redirect('/')
      })
  }
}
</script>
