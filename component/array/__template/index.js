import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { generateDisplayComponent } from 'mixin/index'

const { classes } = createStyleSheet( style )


export default class __template extends Component {
    render() {
        return generateDisplayComponent( {
            classes,
            reactState: {
                setting: {
                    
                }
            },
            getDisplyData() {
                return {
                   
                }
            },
            Formulas: [
                [
                    
                ]
            ]
        } )
    }
}

__template.propTypes = {

}