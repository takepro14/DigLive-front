import Home from '../pages/Home.vue'

describe('pages/Home.vue', () => {
  it('Home.data.menu', () => {
    const defaultData = Home.data()
    expect(defaultData.menu).toBe('postsMenu')
  })
})