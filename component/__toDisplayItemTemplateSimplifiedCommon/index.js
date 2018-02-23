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
                    number: {
                        value: 1,
                        __all: [ 0, 1, 2, 3, 4, 5, 6, 7 ],
                        __type: 'select',
                    },
                    string: {
                        value: 'a',
                        __all: [ 'a', 'b', 'c', 'd', 'e', ],
                        __type: 'select',
                    },
                    array: {
                        value: [ 'apple' ],
                        __all: [ 'apple', 'lemon', 'carrot' ],
                        __type: 'select',
                    },
                    map: {
                        value: {
                            dog: [ 'apple' ],
                            cat: 'lemon',
                        },
                        __all: {
                            __fields: [
                                'dog',
                                'cat',
                                'bird',
                                'fox',
                            ],
                            dog: [ 'apple', 'banana', 'carrot', 'lemon' ],
                        },
                        __type: 'select',
                    },
                }
            },
            getDisplyData() {
                return {
                    number: this.state.setting.number.value,
                    // array: this.state.setting.array.value,                    
                    map: this.state.setting.map.value,
                }
            },
            Formulas: [
                [
                    {
                        __statePath: [ 'setting', 'number' ]
                    },

                    {
                        __statePath: [ 'setting', 'string' ]
                    },

                    {
                        __statePath: [ 'setting', 'array' ]
                    },

                    {
                        __statePath: [ 'setting', 'map' ]
                    },

                    `apple`,
                    123456,
                    [
                        'static arr',
                        'apple',
                        'lemon'
                    ],
                    {
                        staticObject: 'staticObject',
                        dog: 'apple',
                        cat: 'lemon',
                    },
                ]
            ]
        } )
    }
}

Compact.propTypes = {

}