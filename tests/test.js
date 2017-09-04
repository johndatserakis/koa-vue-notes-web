//Testing is put on pause for now because I've had a lot of issues
//with vue-test-utils - it's just getting started though so we'll check back
//in on this. I'm sure it'll work itself out. Right now the test below fails because the spread operator is
//not understood.

import { shallow } from 'vue-test-utils'
import Home from '../src/components/layouts/Home.vue'

describe('Component testing', () => {
  it('Home.vue test', () => {
    const wrapper = shallow(Home, {})
    expect(wrapper).toBeTruthy()
  })
})