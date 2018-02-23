import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'

const { classes } = createStyleSheet( style )


export default class Space extends Component {
    render() {
        return (
            <span className={ classes.container }>&emsp;</span>
            // <span>&nbsp;</span>
        )
    }
}

Space.propTypes = {

}