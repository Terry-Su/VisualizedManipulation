import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'

const { classes } = createStyleSheet( style )


export default class ValueItem extends Component {
    render() {
        let itemDecoratorComponentProps = { ...(this.props || {}) }
        delete itemDecoratorComponentProps.itemDecoratorComponent
        return (
            <span className={ classes.container }>
                 { 
                    this.props.itemDecoratorComponent 
                    ? <this.props.itemDecoratorComponent 
                            chilren={ this.props.children } 
                            { ...itemDecoratorComponentProps }
                        />
                    : this.props.children 
                }
            </span>
        )
    }
}

ValueItem.propTypes = {
    itemDecoratorComponent: PropTypes.any,
}