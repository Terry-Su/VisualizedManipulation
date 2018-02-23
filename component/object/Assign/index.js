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

const { classes } = createStyleSheet( style )


class Assign extends Component {
    constructor( props ) {
        super( props )


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

                formula2: {
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
                            cat: 'banana',
                        },
                        __all: {
                            __fields: [
                                'dog',
                                'cat',
                                'bird',
                            ],
                            cat: [ 'apple', 'banana', 'carrot', 'lemon' ]
                        },
                        __type: 'select',
                    },
                    param2: {
                        value: {
                            bird: 'carrot',
                        },
                        __all: {
                            __fields: [
                                'dog',
                                'cat',
                                'bird',
                            ],
                            bird: [ 'apple', 'banana', 'carrot', 'lemon' ]
                        },
                        __type: 'select',
                    },
                },
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
    updateFormula2BaiscObject( value ) {
        this.setState( {
            setting: {
                ...this.state.setting,
                formula2: {
                    ...this.state.setting.formula2,
                    basicObject: value
                }
            }
        } )
    }
    updateFormula2Param1( value ) {
        this.setState( {
            setting: {
                ...this.state.setting,
                formula2: {
                    ...this.state.setting.formula2,
                    param1: value
                }
            }
        } )
    }
    updateFormula2Param2( value ) {
        this.setState( {
            setting: {
                ...this.state.setting,
                formula2: {
                    ...this.state.setting.formula2,
                    param2: value
                }
            }
        } )
    }
    getDisplyData() {
        return {
            F1: _.assign(
                { ...this.state.setting.formula1.basicObject.value },
                this.state.setting.formula1.param1.value,
            ),
            F2: _.assign(
                { ...this.state.setting.formula2.basicObject.value },
                this.state.setting.formula2.param1.value,
                this.state.setting.formula2.param2.value
            )
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
                            `F1`,

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
                />,

                <Formula 
                    data={
                        [
                            `F2`,

                            `=`,

                            `Object.assign(`,

                            {
                                ...this.state.setting.formula2.basicObject,
                                handleSelectChange( { type, value, field } ) {
                                    handleItemSelectChange( {
                                        state: self.state.setting.formula2.basicObject,
                                        type, 
                                        value, 
                                        field, 
                                        updateFn( value ) {
                                            self.updateFormula2BaiscObject( value )
                                        }
                                    } )
                                }
                            },

                            `,`,
                            
                            {
                                ...this.state.setting.formula2.param1,
                                handleSelectChange( { type, value, field } ) {
                                    handleItemSelectChange( {
                                        state: self.state.setting.formula2.param1,
                                        type, 
                                        value, 
                                        field, 
                                        updateFn( value ) {
                                            self.updateFormula2Param1( value )
                                        }
                                    } )
                                }
                            },

                            `,`,
                            
                            {
                                ...this.state.setting.formula2.param2,
                                handleSelectChange( { type, value, field } ) {
                                    handleItemSelectChange( {
                                        state: self.state.setting.formula2.param2,
                                        type, 
                                        value, 
                                        field, 
                                        updateFn( value ) {
                                            self.updateFormula2Param2( value )
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