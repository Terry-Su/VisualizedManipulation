import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import _ from 'lodash'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import replaceKey from 'util/replaceKey'

import InputPanel from 'component/shared/InputPanel/index'
import Formula from 'component/shared/InputPanel/Formula/index'
import Select from 'component/shared/Select/index'
import Tree from 'component/shared/display/Tree/index'
import ImageElement from 'component/shared/display/ImageElement/index'

const { classes } = createStyleSheet( style )


class Chunk extends Component {
    state = {
        interactiveStringValue: 'apple',
        interactiveJsonArray: [ 'apple', 'carrot' ],
        interactiveJsonObject: {
            dog: [ 'apple', 'carrot' ],
            cat: [ 'lemon', 'watermelon' ],
            koala: [ 'apple' ],
        },
        interactiveCustom1: {
            dog: [ 'apple', 'carrot' ],
            cat: [ 'lemon', 'watermelon' ],
            // koala: [ 'apple' ],
        },
        interactiveCustom2: {
            // dog: [ 'apple', 'carrot' ],
            cat: [ 'lemon', 'watermelon' ],
            // koala: [ 'apple' ],
        },
    }

    render() {
        const self = this

        return [
            <InputPanel key={ 1 } >
                <Formula
                    data={
                        [
                            // element: static string
                            // this.state.tmpState || 'String',
                        
                            // component
                            // <b>Component</b>,
                        
                            // element: static json - array
                            // [ 'apple', 'lemon' ],
                        
                            // element:static json - object 
                            // {
                            //     dog: 'apple',
                            // },
                        
                            // element:interactive string 
                            // {
                            //     value: self.state.interactiveStringValue,
                            //     __all: [ 'apple', 'corn' ],
                            //     __type: 'select',
                            //     handleSelectChange( { type, value } ) {
                            //         // 'apple' / 'corn'
                            //         self.setState( {
                            //             interactiveStringValue: value
                            //         } )
                            //     },
                            // },
                        
                            // element:interactive json - array
                            // {
                            //     value: this.state.interactiveJsonArray,
                            //     __all: [ 'apple', 'carrot', 'orange'],
                            //     __type: 'select',
                            //     handleSelectChange( { type, value } ) {
                            //         // example: [ 'apple', 'carrot', 'orange' ]
                            //         self.setState( {
                            //             interactiveJsonArray: value
                            //         } )
                            //     },
                            // },
                        
                            // element:interactive json - object
                            // {
                            //     value: this.state.interactiveJsonObject,
                            //     __all: {
                            //         __fields: [
                            //             'dog',       
                            //             'cat',       
                            //             'fish', 
                            //             'elephant',      
                            //         ],
                            //         dog: [ 'apple', 'carrot', 'orange' ],
                            //         cat: [ 'lemon', 'watermelon', 'corn' ],
                            //     },
                            //     __type: 'select',
                            //     handleSelectChange( { type, value, field } ) {
                            //         // example: { dog: [ 'apple' ] }
                            //         if ( type === 'field' ) {

                            //             let rawObject = { ...self.state.interactiveJsonObject }                                        
                            //             const newField = value
                            //             const oldField = field

                            //             rawObject = replaceKey( rawObject, oldField, newField )

                            //             self.setState( {
                            //                 interactiveJsonObject: rawObject
                            //             } )
                            //         }

                            //         if ( type === 'harvest' ) {
                            //             self.setState( {
                            //                 interactiveJsonObject: {
                            //                     ...self.state.interactiveJsonObject,
                            //                     [ field ]: value
                            //                 }
                            //             } )
                            //         }

                            //     },
                            // },
                        
                            // composed elements:interactive json -  composed string, array and object
                            // [
                            //     'apple',
                            //     {
                            //         value: [ 'apple', 'carrot' ],
                            //         __all: [ 'apple', 'carrot', 'orange'],
                            //         __type: 'select',
                            //     },
                            //     {
                            //         value: {
                            //             dog: 'apple'
                            //         },
                            //         __all: {
                            //             __fields: [ 'dog', 'cat' ],
                            //             dog: [ 'apple', 'lemon' ],
                            //         },
                            //         __type: 'select'
                            //     },
                            //     {
                            //         bird: {
                            //             value: [ 'apple', 'carrot' ],
                            //             __all: [ 'apple', 'carrot', 'orange'],
                            //             __type: 'select',
                            //         },
                            //         bull: {
                            //             value: {
                            //                 dog: 'apple',
                            //                 crab: {
                            //                     value: {
                            //                         dog: 'apple',
                            //                     },
                            //                     __all: {
                            //                         __fields: [ 'dog', 'cat' ],
                            //                         dog: [ 'apple', 'lemon' ],
                            //                     },
                            //                     __type: 'select'
                            //                 },
                            //             },
                            //             __all: {
                            //                 __fields: [ 'dog', 'cat' ],
                            //                 dog: [ 'apple', 'lemon' ],
                            //             },
                            //             __type: 'select'
                            //         },
                            //     }
                            // ]
                        
                            /*  interactive custom */
                            [
                                {
                                    value: this.state.interactiveCustom1,
                                    __all: {
                                        __fields: [
                                            'dog',       
                                            'cat',       
                                            'fish', 
                                            'elephant',      
                                        ],
                                        dog: [ 'apple', 'carrot', 'orange' ],
                                        // cat: [ 'lemon', 'watermelon', 'corn' ],
                                    },
                                    __type: 'select',
                                    handleSelectChange( { type, value, field, uniqueSymbol } ) {
                                        // example: { dog: [ 'apple' ] }
                                        if ( type === 'field' ) {
    
                                            let rawObject = { ...self.state.interactiveCustom1 }                                        
                                            const newField = value
                                            const oldField = field
    
                                            rawObject = replaceKey( rawObject, oldField, newField )

                                            rawObject[ '__uniqueSymbol' ] = uniqueSymbol
    
                                            self.setState( {
                                                interactiveCustom1: rawObject
                                            } )
                                        }
    
                                        if ( type === 'harvest' ) {
                                            self.setState( {
                                                interactiveCustom1: {
                                                    ...self.state.interactiveCustom1,
                                                    [ field ]: value
                                                }
                                            } )
                                        }
    
                                    },
                                },
                                {
                                    value: this.state.interactiveCustom2,
                                    __all: {
                                        __fields: [
                                            'dog',       
                                            'cat',       
                                            'fish', 
                                            'elephant',      
                                        ],
                                        // dog: [ 'apple', 'carrot', 'orange' ],
                                        cat: [ 'lemon', 'watermelon', 'corn' ],
                                    },
                                    __type: 'select',
                                    handleSelectChange( { type, value, field, uniqueSymbol } ) {
                                        // example: { dog: [ 'apple' ] }
                                        if ( type === 'field' ) {
    
                                            let rawObject = { ...self.state.interactiveCustom2 }                                        
                                            const newField = value
                                            const oldField = field
    
                                            rawObject = replaceKey( rawObject, oldField, newField )

                                            rawObject[ '__uniqueSymbol' ] = uniqueSymbol
    
                                            self.setState( {
                                                interactiveCustom2: rawObject
                                            } )
                                        }
    
                                        if ( type === 'harvest' ) {
                                            self.setState( {
                                                interactiveCustom2: {
                                                    ...self.state.interactiveCustom2,
                                                    [ field ]: value
                                                }
                                            } )
                                        }
    
                                    },
                                },
                            ]
                        ]
                    }
                />

            </InputPanel>
        ]
    }
}

Chunk.propTypes = {
    // settingArray: PropTypes.object,
}



export default Chunk