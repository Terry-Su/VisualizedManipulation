import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { generateDisplayComponent } from 'mixin/index'

const { classes } = createStyleSheet( style )


export default class Concat extends Component {
    render() {
        const shared = {
            __all: [ 'apple', 'banana', 'carrot', 'lemon', 'cherry', 'pineapple', 'aubergine', 'watermelon', 'orange', 'corn' ]
        }

        return generateDisplayComponent( {
            classes,
            reactState: {
                setting: {
                    array: {
                        value: [ 'apple', 'banana' ],
                        __all: shared.__all,
                        __type: 'select' 
                    },
                    paramString: {
                        value: 'lemon',
                        __all: shared.__all,
                        __type: 'select',
                    },
                    paramArray: {
                        value: [ 'cherry', 'pineapple' ],
                        __all: shared.__all,
                        __type: 'select',
                    },
                    paramArrayNestedAtArray: {
                        value: [ 'aubergine', 'watermelon' ],
                        __all: shared.__all,
                        __type: 'select',
                    },

                }
            },
            getDisplyData() {
                return _.concat(
                    this.state.setting.array.value,
                    this.state.setting.paramString.value,
                    this.state.setting.paramArray.value,
                    [
                        this.state.setting.paramArrayNestedAtArray.value
                    ],
                )
            },
            Formulas: [
                // _.concat( array, paramString, paramArray, paramArrayNestedAtArray )
                [
                    `_.concat(`, 
                    { __statePath: [ 'setting', 'array' ] },
                    `,` ,
                    { __statePath: [ 'setting', 'paramString' ] },
                    `,` ,
                    { __statePath: [ 'setting', 'paramArray' ] },
                    `,` ,
                    [
                        { __statePath: [ 'setting', 'paramArrayNestedAtArray' ] },
                    ],
                    `)`,
                ]
            ]
        } )
    }
}

Concat.propTypes = {

}