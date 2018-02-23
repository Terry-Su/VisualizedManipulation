import React, { Component } from 'react'
import PropTypes, { shape } from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { generateDisplayComponent } from 'mixin/index'
import { fruits } from 'store/initialState'

const { classes } = createStyleSheet( style )


export default class DifferenceBy extends Component {
    render() {
        const shared = {
            __all1: [ 1.1, 2.1, 3.1 ],
            __all2: [ 1.2, 2.2, 3.2 ],
        }

        return generateDisplayComponent( {
            classes,
            reactState: {
                setting: {
                    array1: {
                        value: [ 1.1, 2.1 ],
                        __all: shared.__all1,
                        __type: 'select'
                    },
                    array2: {
                        value: [ 2.2, 3.2 ],
                        __all: shared.__all2,
                        __type: 'select'
                    },
                }
            },
            getDisplyData() {
                return _.differenceBy(
                    this.state.setting.array1.value,
                    this.state.setting.array2.value,
                    Math.floor
                )
            },
            Formulas: [
                [
                    `_.differenceBy`,
                    `(`,
                    { __statePath: [ 'setting', 'array1' ] },
                    `,`,
                    { __statePath: [ 'setting', 'array2' ] },
                    `,`,
                    `Math.floor`,                    
                    `)`,
                ],
            ]
        } )
    }
}

DifferenceBy.propTypes = {

}