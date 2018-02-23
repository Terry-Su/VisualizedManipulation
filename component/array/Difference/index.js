import React, { Component } from 'react'
import PropTypes, { shape } from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { generateDisplayComponent } from 'mixin/index'
import { fruits } from 'store/initialState'

const { classes } = createStyleSheet( style )


export default class Difference extends Component {
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
                    F2: {
                        array1: {
                            value: [ 'apple', 'banana', 'orange' ],
                            __all: shared.__all,
                            __type: 'select'
                        },
                        array2: {
                            value: [ 'banana', 'watermelon' ],
                            __all: shared.__all,
                            __type: 'select'
                        },
                        array3: {
                            value: [ 'orange', 'cherry' ],
                            __all: shared.__all,
                            __type: 'select'
                        },

                    },
                }
            },
            getDisplyData() {
                return {
                    F1: _.difference(
                        this.state.setting.F1.array1.value,
                        this.state.setting.F1.array2.value,
                    ),
                    F2: _.difference(
                        this.state.setting.F2.array1.value,
                        this.state.setting.F2.array2.value,
                        this.state.setting.F2.array3.value,
                    ),
                }
            },
            Formulas: [
                [
                    `F1`,
                    `=`,
                    `_.difference(`,
                    { __statePath: [ 'setting', 'F1', 'array1' ] },
                    `,`,
                    { __statePath: [ 'setting', 'F1', 'array2' ] },
                    `)`,
                ],

                [
                    `F2`,
                    `=`,
                    `_.difference(`,
                    { __statePath: [ 'setting', 'F2', 'array1' ] },
                    `,`,
                    { __statePath: [ 'setting', 'F2', 'array2' ] },
                    `,`,
                    { __statePath: [ 'setting', 'F2', 'array3' ] },
                    `)`,
                ],
            ]
        } )
    }
}

Difference.propTypes = {

}