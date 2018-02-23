import React, { Component } from 'react'
import PropTypes, { shape } from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { generateDisplayComponent } from 'mixin/index'
import { fruits } from 'store/initialState'

const { classes } = createStyleSheet( style )


export default class DifferenceWith extends Component {
    render() {
        const shared = {
            __all: fruits
        }

        return generateDisplayComponent( {
            classes,
            reactState: {
                setting: {
                    F1: {
                        array1: {
                            value: [ 'apple', 'banana' ],
                            __all: shared.__all,
                            __type: 'select'
                        },
                        array2: {
                            value: [ 'banana', 'watermelon' ],
                            __all: shared.__all,
                            __type: 'select'
                        },
                    },
                }
            },
            getDisplyData() {
                return _.differenceWith(
                    this.state.setting.F1.array1.value,
                    this.state.setting.F1.array2.value,
                    _.isEqual
                )
            },
            Formulas: [
                [
                    // `F1`,
                    // `=`,
                    `_.differenceWith(`,
                    { __statePath: [ 'setting', 'F1', 'array1' ] },
                    `,`,
                    { __statePath: [ 'setting', 'F1', 'array2' ] },
                    `,`,
                    `_.isEqual`,
                    `)`,
                ],
            ]
        } )
    }
}

DifferenceWith.propTypes = {

}