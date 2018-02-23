import _ from 'lodash'

export default {
    namespace: 'root',
    state: {
        displayComponentName: 'ArrayCompact'
    },
    reducers: {
        updateDisplay( state, { title, itemName } ) {
              const displayComponentName = `${ title }${ _.upperFirst( itemName ) }`
              return {
                  ...state,
                  displayComponentName,
              }
        }
    },
}