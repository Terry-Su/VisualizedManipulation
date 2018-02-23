import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import * as color from 'material-ui/colors'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'

const sheet = createStyleSheet( style )
const { classes } = sheet


class ArrayWrapper extends Component {
    render() {
        return (
            <Paper className={ classes.container } {...this.props}>
                { this.props.children }
            </Paper>
        )
    }
}

ArrayWrapper.propTypes = {
}


export default ArrayWrapper