import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'

const { classes } = createStyleSheet( style )


export default class Create extends Component {
    render() {
        return (
            <div>
                Create
            </div>
        )
    }
}

Create.propTypes = {

}