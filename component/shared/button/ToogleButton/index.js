import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'

const { classes } = createStyleSheet( style )


export default class ToogleButton extends Component {
    handleButtonClick = ( ) => {
        this.props.updateActive( ! this.props.active )
    }
    render() {
        const { active } = this.props

        return (
            <Button 
                raised
                color={ active ? 'primary' : 'default' }
                onClick={ this.handleButtonClick }
            >
                { 
                    active ?  this.props.activeText : this.props.inactiveText   
                }
            </Button>
        )
    }
}

ToogleButton.propTypes = {
    active: PropTypes.bool.isRequired,
    activeText: PropTypes.string.isRequired,
    inactiveText: PropTypes.string.isRequired,
    updateActive: PropTypes.func.isRequired,
}