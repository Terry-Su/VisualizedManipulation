import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import * as imageList from 'store/imageList'

const sheet = createStyleSheet( style )
const { classes } = sheet


function ImageItem( { src, size } ) {
    if ( ! src ) {
        return null
    }

    const inlineStyle= {
        width: size || 30,
        height: size || 30,
    }

    return <img className={ classes.image } src={ src } style={ inlineStyle } />
}

export default class ImageElement extends Component {
    handleValue( value ) {
        if ( _.isString( value ) ) {
            return value
        }   

        if ( _.isNumber( value ) ) {
            const inlineStyle= {
                fontSize: `${this.props.size || 30}px`,
            }
            return <span className={ classes.number } style={ inlineStyle }>{ value }</span>
        }
        
        if ( _.isBoolean( value ) ) {
            return value ? 'booleanTrue' : 'booleanFalse'
        }

        return value
    }

    getRenderComponent() {
        const { chilren, size } = this.props
        const notExistContent = chilren === undefined

        if ( notExistContent ) {
            return null
        }

        const handledChildren = this.handleValue( chilren )


        return (
            imageList[ handledChildren ]
            ? <ImageItem className={ classes.container } src={ imageList[ handledChildren ] } { ...this.props } /> 
            : handledChildren
        )
    }
    render() {
        return this.getRenderComponent()
    }
}


ImageElement.propTypes = {
    size: PropTypes.number,
}