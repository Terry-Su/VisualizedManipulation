import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import _ from 'lodash'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import replaceKey from 'util/replaceKey'

import InputPanel from 'component/shared/InputPanel/index'
import Formula from 'component/shared/InputPanel/Formula/index'
import Tree from 'component/shared/display/Tree/index'
import ImageElement from 'component/shared/display/ImageElement/index'

const { classes } = createStyleSheet( style )


class Chunk extends Component {
    state = {
        setting: {
            array: {
                value: [ 'apple', 'carrot' ],
                all: [
                    'apple',
                    'carrot',
                    'lemon',
                    'cherry',
                    'pineapple',
                    'aubergine',
                    'banana',
                    'watermelon',
                    'orange',
                    'corn',
                ]
            },
            size: {
                value: 1,
                all: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            },
        },
    }
    updateArrayValue = value => {
       this.setState( {
           setting: {
                ...this.state.setting,
                array: {
                    ...this.state.setting.array,
                    value,
                }
            }
       } )
    }
    updateSizeValue = value => {
        this.setState( {
            setting: {
                 ...this.state.setting,
                 size: {
                     ...this.state.setting.size,
                     value,
                 }
             }
        } )
    }
    render() {
        const self = this

        return [
            <Tree 
                key={ 0 } 
                data={
                    getDisplyData(
                        this.state.setting.array.value,
                        this.state.setting.size.value
                    )
                }
            />,

            <InputPanel key={ 1 } >
                <Formula 
                    data={
                        [
                            `_.chunk(`,
                            {
                                value: this.state.setting.array.value,
                                __all: this.state.setting.array.all,
                                __type: 'select',
                                handleSelectChange( { value } ) {
                                    self.updateArrayValue( value )
                                }
                            },
                            `,`,
                            {
                                value: this.state.setting.size.value,
                                __all: this.state.setting.size.all,
                                __type: 'select',
                                handleSelectChange( { value } ) {
                                    self.updateSizeValue( value )
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

Chunk.propTypes = {

}

function getDisplyData( array, number ) {
    return _.chunk(array, number)
}



export default Chunk