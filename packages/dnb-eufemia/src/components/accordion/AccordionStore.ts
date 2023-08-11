import { warn } from '../../shared/component-helper'

type AccordionStoreInstance = {
  _id: string
  close: () => void
}
export class AccordionStore {
  _instances: Array<AccordionStoreInstance>
  _id: string
  constructor(id: string) {
    this._id = id
    this._instances = []
  }
  onChange({ id }: { id: string }) {
    this._instances.forEach((inst) => {
      if (inst._id !== id) {
        inst.close()
      }
    })
  }
  addInstance(instance: AccordionStoreInstance) {
    this._instances.push(instance)
  }
  removeInstance(instance) {
    this._instances = this._instances.filter((inst) => inst !== instance)
  }
}

export type StoreDataReturn = {
  id: string
  expanded: boolean
}
export type StoreOptions = {
  force?: boolean
}

type StoreProps = {
  id?: string
  group?: string
}

export class Store {
  id?: string
  group?: string

  constructor({ id, group }: StoreProps) {
    this.id = id
    this.group = group
    return this
  }

  storeId(id = this.id) {
    if (this.group) {
      // Skip using the random ID
      if (this.group[0] === '#') {
        return null
      }
      id = this.group
    }
    return `dnb-accordion-${id}`
  }

  saveState(expanded: boolean, id = this.id, opts: StoreOptions = {}) {
    if (id) {
      try {
        const store = this.getData() || ({} as StoreDataReturn)

        if (this.group) {
          if (expanded) {
            store.id = id
          } else if (opts && opts.force) {
            store.id = null
          }
        } else {
          store.expanded = expanded
        }

        const storeId = this.storeId(id)
        if (storeId) {
          window.localStorage.setItem(storeId, JSON.stringify(store))
        }
      } catch (e) {
        //
      }
    } else {
      rememberWarning()
    }
  }

  getData(id = this.id): StoreDataReturn {
    const storeId = this.storeId(id)

    if (storeId) {
      try {
        if (
          Object.prototype.hasOwnProperty.call(
            window.localStorage,
            storeId
          )
        ) {
          return JSON.parse(window.localStorage.getItem(storeId))
        }
      } catch (e) {
        //
      }
    }

    return null
  }

  getState(id = this.id) {
    let state = null

    const store = this.getData(id)

    if (store) {
      if (typeof store.id !== 'undefined') {
        state = id === store.id
      } else if (typeof store.expanded !== 'undefined') {
        state = store.expanded
      }
    }

    return state
  }

  flush(id = this.id) {
    if (id) {
      try {
        const storeId = this.storeId(id)
        if (storeId) {
          window.localStorage.setItem(storeId, null)
        }
      } catch (e) {
        //
      }
    }
  }
}

export function rememberWarning(type = 'accordion') {
  warn(`Missing "id" prop the ${type}! "remember_state" is enabled.`)
}
