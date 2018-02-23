import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'



const { classes } = createStyleSheet( style )


export default class InputPanel extends Component {
    render() {
        return (
            <div className={ classes.container }>
                { this.props.children }
            </div>
        )
    }
}

InputPanel.propTypes = {

}