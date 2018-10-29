/**
 * Navigation Store
 *
 */

import { observable } from 'mobx'

class Navigation {
  id = Math.random()
  @observable
  title = ''
  @observable
  finished = false
}

export default Navigation
