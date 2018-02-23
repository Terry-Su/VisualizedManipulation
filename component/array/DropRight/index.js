import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { generateDisplayComponent } from 'mixin/index'
import { fruits, numbers } from 'store/initialState'

const { classes } = createStyleSheet( style )


export default class DropRight extends Component {
    render() {
        const shared = {
            fruits,
            numbers,
        }

        return generateDisplayComponent( {
            classes,
            reactState: {
                setting: {
                    F1: {
                        array: {
                            value: [ 'apple', 'banana' ],
                            __all: [ ...shared.fruits ],
                            __type: 'select',
                        },
                       
                    },

                    F2: {
                        array: {
                            value: [ 'apple', 'banana', 'lemon', 'orange' ],
                            __all: [ ...shared.fruits ],
                            __type: 'select',
                        },
                        count: {
                            value: 2,
                            __all: [ ...shared.numbers ],
                            __type: 'select',
                        }                        
                    }
                },
            },
            getDisplyData() {
                return {
                   F1: _.drop( this.state.setting.F1.array.value ),
                   F2: _.drop( this.state.setting.F2.array.value,  this.state.setting.F2.count.value),
                }
            },
            Formulas: [
                [
                    `F1`,
                    `=`,
                    `_.drop(`,
                    { __statePath: [ 'setting', 'F1', 'array' ] },
                    `)`,
                ],

                [
                    `F2`,
                    `=`,
                    `_.drop(`,
                    { __statePath: [ 'setting', 'F2', 'array' ] },
                    `,`,
                    { __statePath: [ 'setting', 'F2', 'count' ] },
                    `)`,
                ]
            ]
        } )
    }
}

DropRight.propTypes = {

}