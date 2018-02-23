import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import _ from 'lodash'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'

import FormulaItem from './FormulaItem/index'

const { classes } = createStyleSheet( style )
    
const devSelfMode = false

class Formula extends Component {
    render() {
        const data = devSelfMode ? getDevData() : this.props.data

        return (
            <div className={ classes.container } >   
                <div className={ classes.tableLayout } >
                    {
                        data && data.map(
                            ( item, index ) =>
                            <FormulaItem key={ index } data={ item } />
                        )
                    }
                </div>
            </div>
        )
    }
}

const propDataStructure = [
    // element: static string
    'String',

    // component
    <span>Component</span>,

    // element: static json - array
    [ 'apple', 'lemon' ],

    // element:static json - object 
    {
        dog: 'apple',
    },

    // element:interactive string 
    {
        value: 'apple',
        __all: [ 'apple', 'corn' ],
        __type: 'select',
        handleSelectChange( { value } ) {
            // 'apple' / 'corn'
        },
    },

    // element:interactive json - array
    {
        value: [ 'apple', 'carrot' ],
        __all: [ 'apple', 'carrot', 'orange'],
        __type: 'select',
        handleSelectChange( { value } ) {
            // example: [ 'apple', 'carrot', 'orange' ]
        },
    },

    // element:interactive json - object
    {
        value: {
            dog: [ 'apple', 'carrot' ],
            cat: [ 'lemon', 'watermelon' ],
        },
        __all: {
            __fields: [
                'dog',       
                'cat',       
                'fish',       
            ],
            __fields2: {
                dog: [ 'dog', 'cat', 'fish' ],
                cat: [ 'cat', 'dog', 'fish' ],
                fish: [ 'fish', 'dog', 'cat' ],
            },
            dog: [ 'apple', 'carrot', 'orange'],
            cat: [ 'lemon', 'watermelon', 'corn' ],
        },
        __type: 'select',
        handleSelectChange( { type, value, field, uniqueSymbol } ) {
            // example: { dog: [ 'apple' ] }
        },
    },

    // composed elements:interactive json -  composed string, array and object
    [
        'apple',
        {
            value: [ 'apple', 'carrot' ],
            __all: [ 'apple', 'carrot', 'orange'],
            __type: 'select',
        },
        {
            value: {
                dog: 'apple'
            },
            __all: {
                __fields: [ 'dog', 'cat' ],
                dog: [ 'apple', 'lemon' ],
            },
            __type: 'select'
        },
        {
            bird: {
                value: [ 'apple', 'carrot' ],
                __all: [ 'apple', 'carrot', 'orange'],
                __type: 'select',
            },
            bull: {
                value: {
                    dog: 'apple',
                    crab: {
                        value: {
                            dog: 'apple',
                        },
                        __all: {
                            __fields: [ 'dog', 'cat' ],
                            dog: [ 'apple', 'lemon' ],
                        },
                        __type: 'select'
                    },
                },
                __all: {
                    __fields: [ 'dog', 'cat' ],
                    dog: [ 'apple', 'lemon' ],
                },
                __type: 'select'
            },
        }
    ]

]

Formula.propTypes = {
    data: PropTypes.array.isRequired
}

function mapStateToProps() {
    return {
    }
}

function getDevData() {
    return propDataStructure
}

export default connect( mapStateToProps )( Formula )

