import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import _ from 'lodash'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { handleItemSelectChange } from 'mixin/index'

import InputPanel from 'component/shared/InputPanel/index'
import Formula from 'component/shared/InputPanel/Formula/index'
import Tree from 'component/shared/display/Tree/index'
import ImageElement from 'component/shared/display/ImageElement/index'

const { classes } = createStyleSheet( style )


class Assign extends Component {
    constructor( props ) {
        super( props )

        this.basicObjectValue = {
            dog: 'apple',
        }

        this.formula1Param1 = {
            dog: 'banana',
        }

        this.formula2Param1 = {
            cat: 'banana',
        }

        this.formula2Param2 = {
            bird: 'carrot',
        }


        this.state = {
            setting: {
                formula1: {
                    basicObject: {
                        value: {
                            dog: 'apple',
                        },
                        __all: {
                            __fields: [
                                'dog',
                                'cat',
                                'bird',
                            ],
                            dog: [ 'apple', 'banana', 'carrot', 'lemon' ]
                        },
                        __type: 'select',
                    },
                    param1: {
                        value: {
                            dog: 'banana',
                        },
                        __all: {
                            __fields: [
                                'dog',
                                'cat',
                                'bird',
                            ],
                            dog: [ 'apple', 'banana', 'carrot', 'lemon' ]
                        },
                        __type: 'select',
                    },
                },
                // formula2: {
                //     basicObject: { ...this.basicObject },
                //     param1: this.formula2Param1,
                //     param2: this.formula2Param2,
                // },
            },
        }
    }
    updateFormula1BaiscObject( value ) {
        this.setState( {
            setting: {
                ...this.state.setting,
                formula1: {
                    ...this.state.setting.formula1,
                    basicObject: value
                }
            }
        } )
    }
    updateFormula1Param1( value ) {
        this.setState( {
            setting: {
                ...this.state.setting,
                formula1: {
                    ...this.state.setting.formula1,
                    param1: value
                }
            }
        } )
    }
    getDisplyData() {
        return {
            Formula1: _.assign(
                { ...this.state.setting.formula1.basicObject.value },
                this.state.setting.formula1.param1.value,
            ),
        }
    }
    render() {
        const self = this

        return [
            <Tree 
                key={ 0 } 
                data={ this.getDisplyData() }
            />,

            <InputPanel key={ 1 } >
                { /*  Formula1 */ }
                <Formula 
                    data={
                        [
                            `Formula1`,

                            `=`,

                            `Object.assign(`,

                            {
                                ...this.state.setting.formula1.basicObject,
                                handleSelectChange( { type, value, field } ) {
                                    handleItemSelectChange( {
                                        state: self.state.setting.formula1.basicObject,
                                        type, 
                                        value, 
                                        field, 
                                        updateFn( value ) {
                                            self.updateFormula1BaiscObject( value )
                                        }
                                    } )
                                }
                            },

                            `,`,
                            
                            {
                                ...this.state.setting.formula1.param1,
                                handleSelectChange( { type, value, field } ) {
                                    handleItemSelectChange( {
                                        state: self.state.setting.formula1.param1,
                                        type, 
                                        value, 
                                        field, 
                                        updateFn( value ) {
                                            self.updateFormula1Param1( value )
                                        }
                                    } )
                                }
                            },
                            
                            `)`,
                        ]
                    }
                />
            </InputPanel>
        ]
    }
}

Assign.propTypes = {

}



export default Assign