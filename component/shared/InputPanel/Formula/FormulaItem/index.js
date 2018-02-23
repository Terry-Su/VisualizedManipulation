import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Select from 'component/shared/Select/index'


import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { DEAFULT_SPACES_COUNT } from 'constant/index'
import { isNotStartWith__ } from 'fp/index'
import { getNumerousSpaces } from 'mixin/index'

import VirtualJson from 'component/shared/VirtualJson'
import ValueItem from 'component/shared/display/ValueItem/index'
import ImageElement from 'component/shared/display/ImageElement/index'


const { classes } = createStyleSheet( style )



export default class FormulaItem extends Component {
    constructor( props ) {
        super( props )

        this.uniqueKey = 0
    }
    getUniqueKey() {
        this.uniqueKey = this.uniqueKey + 1 
        return this.uniqueKey
    }
    resetUniqueKey() {
        this.uniqueKey = 0
    }
    getSelectNormal( { value, __all, handleSelectChange } ) {
        return (
            <Select 
                value= { value }
                allValues={ __all }
                updateValue={ ( value ) => {
                    handleSelectChange( { value } )
                } }
            />
        )
    }
    getSelecArray( { value, __all, handleSelectChange } ) {
        return (
            <span className={ classes.selectArray }>
                <span>[</span>
                { getNumerousSpaces( DEAFULT_SPACES_COUNT ) }
                <Select 
                    multiple
                    value= { value }
                    allValues={ __all }
                    updateValue={ ( value ) => {
                        handleSelectChange( { value } )
                    } }
                />
                { getNumerousSpaces( DEAFULT_SPACES_COUNT ) }
                <span>]</span>
            </span>
        )
    }
    getSelectPlainObject( { value, __all, handleSelectChange } ) {
        let output = {}
        const fields = Object.keys( value )
         
        const { __fields } = __all

        fields
            .filter( isNotStartWith__ )
            .map(
            field => {
                const currentValue = this.getContent( value[ field ] )
                const fieldsExceptCurrentField = fields.filter(
                    tmpField => 
                    tmpField !== field
                )
                
                /* field */
                // mode1: __fields is an array which includes field
                const isMode1 =  _.isArray( __fields ) && __fields.includes( field )
                
                // mode2: __fields is object whose __defaultAll includes field
                const isMode2 = _.isPlainObject( __fields ) 
                    && (
                        _.isArray( __fields.__defaultAll )
                        && __fields.__defaultAll.includes( field ) 
                    )
                
                // mode3: __fields is object whose keys inclues field
                const isMode3 = _.isPlainObject( __fields ) 
                && Object.keys( __fields ).includes( field )

                
                
                if ( isMode1 || isMode2 ) {
                    let current__Fields
                    current__Fields = isMode1 ? __fields : []
                    current__Fields = isMode2 ? __fields.__defaultAll : current__Fields

                    const filtered__Fields = _.difference( current__Fields, fieldsExceptCurrentField )

                    const currentField = (
                        <Select 
                            value= { field }
                            allValues={ filtered__Fields }
                            updateValue={
                                ( value ) => {
                                    const newField = value
                                    const originalField = field

                                    handleSelectChange( { 
                                        type: 'field',                                     
                                        value, 
                                        field,  
                                    } )
                                }
                            }
                        />
                    )

                    output[ '__field' ] = {
                        ...( output[ '__field' ] || {} ),
                        [ field ]: currentField
                    }
                }

                if ( isMode3 ) {
                    const filtered__Fields = _.difference( __fields[ field ], fieldsExceptCurrentField )
                    const currentField = (
                        <Select 
                            value= { field }
                            allValues={ filtered__Fields }
                            updateValue={
                                ( value ) => {
                                    const newField = value
                                    const originalField = field

                                    handleSelectChange( { 
                                        type: 'field',                                     
                                        value, 
                                        field, 
                                        mode__all__fields: 1 
                                    } )
                                }
                            }
                        />
                    )

                    output[ '__field' ] = {
                        ...( output[ '__field' ] || {} ),
                        [ field ]: currentField
                    }
                }
                

                /* harvest */

                const shouldHarvestSelect = __all[ field ] !== undefined
                
                if ( !shouldHarvestSelect ) {
                    output[ field ] =  currentValue
                }
                
                if ( shouldHarvestSelect ) {
                    const allValues = __all[ field ]                

                    const currentHarvest = (
                        <Select 
                            multiple={ isMultiple(currentValue) }
                            value= { currentValue }
                            allValues={ allValues }
                            updateValue={ ( value ) => {
                                handleSelectChange( {
                                    type: 'harvest',
                                    value,
                                    field,
                                } )
                            } }
                        />
                    )

                    output[ field ] =  currentHarvest
                }
            }
        ) 

        return output
    }
    getSelectContent( { value, __all, handleSelectChange } ) {
        /**
         * string or number
         */
        if ( _.isString( value ) || _.isNumber( value ) || _.isBoolean( value ) ) {
            return this.getSelectNormal( { value, __all, handleSelectChange } )
        }

        /**
         * array
         */
        if ( _.isArray( value ) ) {
            return this.getSelecArray( { value, __all, handleSelectChange } )
        }

        /**
         * object
         */
        if ( _.isPlainObject( value ) ) {
            return this.getSelectPlainObject( { value, __all, handleSelectChange } )
        }

    }
    getNormaArrayContent( data ) {
        return (
            data && data.map(
                ( item, index ) =>
                this.getContent( item )
            )
        )
    }
    getNormaObjectContent( data ) {
        const fields = Object.keys( data )
        fields && fields.map(
            ( field, index ) =>
            data[ field ] = this.getContent( data[ field ] )
        )
        return data
    }
    getNormalContent( data ) {
         if (
             _.isString( data ) 
             || _.isNumber( data ) 
             || _.isBoolean( data ) 
             || React.isValidElement( data )
        ) {
            return data
        }

        if ( _.isArray( data ) ) {
           return this.getNormaArrayContent( data )
        }

        if ( _.isPlainObject( data ) ) {
           return this.getNormaObjectContent( data )
        }
    }
    getContent( data ) {
        if ( isSelect( data ) ) {
            return this.getSelectContent( data )
        }

        if ( !isSelect( data ) ) {
            return this.getNormalContent( data )
        }
    }
    render() {
        this.resetUniqueKey()
        
        return [
            <VirtualJson key={ this.getUniqueKey() } data={ this.getContent( this.props.data ) } />,
            getNumerousSpaces( DEAFULT_SPACES_COUNT )
        ]
    }
}

FormulaItem.propTypes = {
    data: PropTypes.any.isRequired
}

function isSelect( data ) {
    return _.isPlainObject( data ) && ! React.isValidElement( data ) && data['__type'] === 'select'
}

function isMultiple( value ) {
    return _.isArray( value )
}


