import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'

const { classes } = createStyleSheet( style )


export default class ObjectWrapper extends Component {
    render() {
        
        return (
            <Paper className={ classes.container } children={this.props.children} />
        )
    }
}

ObjectWrapper.propTypes = {

}