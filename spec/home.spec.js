import Home from '../pages/home.vue'

describe('pages/home.vue', () => {
  it('Home.data.menu', () => {
    const defaultData = Home.data()
    expect(defaultData.menu).toBe('postsMenu')
  })
})