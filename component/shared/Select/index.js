import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import MuiSelect from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { SMALLER_IMAGE_SIZE } from 'constant/index'

import ValueItem from 'component/shared/display/ValueItem/index'
import ImageElement from 'component/shared/display/ImageElement/index'

import Space from 'component/shared/Space/index'


const { classes } = createStyleSheet( style )

const theme = createMuiTheme( {
    overrides: {
        MuiSelect: style.MuiSelect
    }
} )

function shouldShowAfterComma( {
    arrayLength,
    index
} ) {
    return index < arrayLength - 1
} 
class Select extends Component {
    getResizedImageElement() {
        return function ( props ) {
            return <ImageElement size={ SMALLER_IMAGE_SIZE } { ...props } />
        }
    }
    getPossiblelyDecoratedValue( value, key ) {
        return <ValueItem key={ key } itemDecoratorComponent={ this.itemDecoratorComponent || this.getResizedImageElement() } children={ value } />
    }
    handleMuiSelectChange = ( { target } ) => {
        const { value } = target

        this.props.updateValue( value )
    }
    renderValue = ( value ) => {
        if ( this.props.multiple  ) {
            return (
                value.map(
                    ( name, index ) => 
                    <span key={ index } >
                        { this.getPossiblelyDecoratedValue( name ) }
                        { 
                            shouldShowAfterComma( { 
                                arrayLength: value.length,
                                index
                            } ) && 
                            <span>
                                ,
                                <Space />
                            </span>
                        }
                    </span>
                )
            )
        }

        return this.getPossiblelyDecoratedValue( value )
    }
    render() {
        return (
            <MuiThemeProvider theme={ theme }>
                <MuiSelect 
                    className={ classes.MuiSelectClass }
                    multiple={ this.props.multiple } 
                    value={ this.props.value } 
                    onChange={ this.handleMuiSelectChange }
                    renderValue={ this.renderValue }
                    autoWidth={ true }
                >
                    {
                       ( this.props.allValues ).map( ( value, index ) => 
                        <MenuItem key={ index } value={ value }>{ 
                            this.getPossiblelyDecoratedValue( value )
                         }</MenuItem> )
                    }
                </MuiSelect>
            </MuiThemeProvider>
        )
    }
}

Select.propTypes = {
    allValues: PropTypes.any.isRequired,
    updateValue: PropTypes.func.isRequired,
    value: PropTypes.any,    
    multiple: PropTypes.bool,        
    itemDecoratorComponent: PropTypes.func,
}


export default Select