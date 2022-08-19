export default async ({ store, $axios }) => {
  if (!store.state.tag.list.length) {
    await $axios.$get('/api/v1/tags')
      .then(tags => store.dispatch('getTagList', tags))
  }
}
