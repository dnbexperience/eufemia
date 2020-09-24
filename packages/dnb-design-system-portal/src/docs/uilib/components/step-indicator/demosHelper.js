/**
 * UI lib Component Example
 *
 */

import { createBrowserHistory } from 'history'

class HistoryHelper {
  constructor() {
    if (typeof window !== 'undefined') {
      this.history = createBrowserHistory()
      this.active_url = this.history.location.search
      this.unlisten = this.history.listen(({ search }) => {
        this.active_url = search
      })
    }
  }
  unbind() {
    if (this.unlisten) this.unlisten()
  }
  onChangeHandler = (e) => {
    try {
      e.event.preventDefault()
      this.history.push(e.item.url)
    } catch (e) {
      //
    }
  }
}

export { HistoryHelper }
