import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { generateDisplayComponent } from 'mixin/index'
import { fruits, numbers, animals, booleans, } from 'store/initialState'

const { classes } = createStyleSheet( style )


export default class DropRightWhile extends Component {
    render() {
        const shared = {
            fruits,
            numbers,
            animals,
            booleans,
        }

        shared.item1 = {
            value: {
                dog: 'apple',
                active: true
            },
            __all: {
                __fields: [ ...shared.animals ],
                dog: [ ...shared.fruits ],
                active: [ ...shared.booleans ],
            },
            __type: 'select',
        }
        shared.item2 = {
            value: {
                cat: 'banana',
                active: false,
            },
            __all: {
                __fields: [ ...shared.animals ],
                cat: [ ...shared.fruits ],
                active: [ ...shared.booleans ],
            },
            __type: 'select',
        }
        shared.item3 = {
            value: {
                fox: 'carrot',
                active: false,
            },
            __all: {
                __fields: [ ...shared.animals ],
                fox: [ ...shared.fruits ],
                active: [ ...shared.booleans ],
            },
            __type: 'select',
        }
        return generateDisplayComponent( {
            classes,
            reactState: {
                setting: {
                    F1: {
                        item1: { ...shared.item1 },
                        item2: { ...shared.item2 },
                        item3: { ...shared.item3 },
                        predicate( { active } ) {
                             return !active
                        }
                    },

                    F2: {
                        item1: { ...shared.item1 },
                        item2: { ...shared.item2 },
                        item3: { ...shared.item3 },
                        predicate: {
                            value: {
                                fox: 'carrot',
                                active: false,
                            },
                            __all: {
                                __fields: [ ...shared.animals ],
                                fox: [ ...shared.fruits ],
                                active: [ ...shared.booleans ],
                            },
                            __type: 'select',
                        }
                    },

                    F3: {
                        item1: { ...shared.item1 },
                        item2: { ...shared.item2 },
                        item3: { ...shared.item3 },
                        predicateItem: {
                            value: false,
                            __all: shared.booleans,
                            __type: 'select',
                        }
                    },

                    F4: {
                        item1: {
                            value: {
                                dog: 'apple',
                                active: true
                            },
                            __all: {
                                __fields: [ ...shared.animals ],
                                dog: [ ...shared.fruits ],
                                active: [ ...shared.booleans ],
                            },
                            __type: 'select',
                        },
                        item2: {
                            value: {
                                cat: 'banana',
                                active: false,
                            },
                            __all: {
                                __fields: [ ...shared.animals ],
                                cat: [ ...shared.fruits ],
                                active: [ ...shared.booleans ],
                            },
                            __type: 'select',
                        },
                        item3: {
                            value: {
                                fox: 'carrot',
                                active: true,
                            },
                            __all: {
                                __fields: [ ...shared.animals ],
                                fox: [ ...shared.fruits ],
                                active: [ ...shared.booleans ],
                            },
                            __type: 'select',
                        },
                        predicate: {
                            value: 'active',
                            __all: [ 'active', '' ],
                            __type: 'select',
                        },
                    },
                    
                },
            },
            getDisplyData() {
                return {
                   F1: _.dropRightWhile(
                       [
                            this.state.setting.F1.item1.value,
                            this.state.setting.F1.item2.value,
                            this.state.setting.F1.item3.value,
                       ],
                       this.state.setting.F1.predicate
                   ),
                   F2: _.dropRightWhile(
                       [
                            this.state.setting.F2.item1.value,
                            this.state.setting.F2.item2.value,
                            this.state.setting.F2.item3.value,
                       ],
                       this.state.setting.F2.predicate.value
                   ),
                   F3: _.dropRightWhile(
                       [
                            this.state.setting.F3.item1.value,
                            this.state.setting.F3.item2.value,
                            this.state.setting.F3.item3.value,
                       ],
                       [
                           'active',
                           this.state.setting.F3.predicateItem.value
                       ]
                   ),
                   F4: _.dropRightWhile(
                       [
                            this.state.setting.F4.item1.value,
                            this.state.setting.F4.item2.value,
                            this.state.setting.F4.item3.value,
                       ],
                       this.state.setting.F4.predicate.value
                   ),
                }
            },
            Formulas: [
                [
                    `F1`,
                    `=`,
                    `_.dropRightWhile(`,
                    [
                        { __statePath: [ 'setting', 'F1', 'item1' ] },
                        { __statePath: [ 'setting', 'F1', 'item2' ] },
                        { __statePath: [ 'setting', 'F1', 'item3' ] },
                    ],
                    `,`,
                    `( { active } ) => !active`,
                    `)`,
                ],
                [
                    `F2`,
                    `=`,
                    `_.dropRightWhile(`,
                    [
                        { __statePath: [ 'setting', 'F2', 'item1' ] },
                        { __statePath: [ 'setting', 'F2', 'item2' ] },
                        { __statePath: [ 'setting', 'F2', 'item3' ] },
                    ],
                    `,`,
                    { __statePath: [ 'setting', 'F2', 'predicate' ] },
                    `)`,
                ],
                [
                    `F3`,
                    `=`,
                    `_.dropRightWhile(`,
                    [
                        { __statePath: [ 'setting', 'F3', 'item1' ] },
                        { __statePath: [ 'setting', 'F3', 'item2' ] },
                        { __statePath: [ 'setting', 'F3', 'item3' ] },
                    ],
                    `,`,
                    [
                        'active',
                        { __statePath: [ 'setting', 'F3', 'predicateItem' ] }
                    ],
                    `)`,
                ],
                [
                    `F4`,
                    `=`,
                    `_.dropRightWhile(`,
                    [
                        { __statePath: [ 'setting', 'F4', 'item1' ] },
                        { __statePath: [ 'setting', 'F4', 'item2' ] },
                        { __statePath: [ 'setting', 'F4', 'item3' ] },
                    ],
                    `,`,
                    { __statePath: [ 'setting', 'F4', 'predicate' ] },
                    `)`,
                ],

            ]
        } )
    }
}

DropRightWhile.propTypes = {

}