import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { generateDisplayComponent } from 'mixin/index'

const { classes } = createStyleSheet( style )


export default class Compact extends Component {
    render() {
        return generateDisplayComponent( {
            classes,
            reactState: {
                setting: {
                    number1: {
                        value: 0,
                        __all: [ -1, 0, 1, 2, 3 ],
                        __type: 'select',
                    },
                    number2: {
                        value: 1,
                        __all: [ -1, 0, 1, 2, 3 ],
                        __type: 'select',
                    },
                    bool: {
                        value: false,
                        __all: [ true, false ],
                        __type: 'select',
                    },
                    string1: {
                        value: 'apple',
                        __all: [ '', 'apple', 'carrot' ],
                        __type: 'select',
                    },
                    string2: {
                        value: 'lemon',
                        __all: [ '', 'lemon', 'banana' ],
                        __type: 'select',
                    },
                }
            },
            getDisplyData() {
                return _.compact(
                    [
                        this.state.setting.number1.value,
                        this.state.setting.number2.value,
                        this.state.setting.bool.value,
                        this.state.setting.string1.value,
                        this.state.setting.string2.value,
                    ]
                )
            },
            Formulas: [
                [
                    // `_.compact(`,

                    { __statePath: [ 'setting', 'number1' ] },

                    // `,`,

                    { __statePath: [ 'setting', 'number2' ] },

                    // `,`,

                    { __statePath: [ 'setting', 'bool' ] },

                    // `,`,

                    // { __statePath: [ 'setting', 'string1' ] },

                    // `,`,

                    // { __statePath: [ 'setting', 'string2' ] },

                    // `)`,
                    
                ]
            ]
        } )
    }
}

Compact.propTypes = {

}