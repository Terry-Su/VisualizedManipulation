import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { handleItemSelectChange } from 'mixin/index'

import InputPanel from 'component/shared/InputPanel/index'
import Formula from 'component/shared/InputPanel/Formula/index'
import Tree from 'component/shared/display/Tree/index'


export default function ( {
    reactState,
    getDisplyData,
    Formulas,
    classes,
} ) {

    class DisplayComponent extends Component {
        constructor( props ) {
            super( props )
            this.state = {
                ...( reactState || {} ),
            }

        }
        getFormulas() {
            return Formulas && Formulas.map(
                ( FormulaBasicData, index ) => {
                    return <Formula key={ index } data={ this.complementFormulaData( FormulaBasicData ) } />
                }
            )
        }
        complementFormulaData( FormulaBasicData ) {
            function handleFormulaItem( item, index ) {
                const self = this
                
                // select object
                if ( _.isPlainObject( item ) && item[ '__statePath' ] !== undefined ) {

                    const statePath = item[ '__statePath' ]
                    const state = self.getStateValueByPath( statePath )

                    // object
                    if ( _.isPlainObject( state ) && state[ '__type' ] === 'select'  ) {
                        return {
                            ...state,
                            handleSelectChange( { type, value, mode__all__fields, field } ) {
                                handleItemSelectChange( {
                                    state,
                                    type, 
                                    value, 
                                    field, 
                                    mode__all__fields,
                                    updateFn( value ) {
                                        self.updateStateByPath( statePath, value )
                                    }
                                } )
                            }
                        }
                    }

                    // function 
                    if ( _.isFunction( state ) ) {
                        return state.toString()
                    }
                    // other
                    return state
                }   
                // array
                if ( _.isArray( item ) ) {
                    return item.map(
                        data =>
                        handleFormulaItem.bind(self)( data )
                    )
                }

                // plain object but not select object
                if ( _.isPlainObject( item ) && item[ '__statePath' ] === undefined ) {
                    const fields = Object.keys( item )
                    let cloneItem = { ...item }
                    fields.map(
                        field => {
                            cloneItem[ field ] = handleFormulaItem.bind(self)( cloneItem[ field ] )
                        }
                    )
                    return cloneItem
                }
                
                return item
            }

            return FormulaBasicData && FormulaBasicData.map( handleFormulaItem.bind(this) )
        }
        getStateValueByPath( path ) {
            let result = this.state
            path.map(
                field => 
                result = result[ field ]
            )
            return result
        }
        updateStateByPath( path, value ) {
            let rawState = { ...this.state }
            let setter

            function handleField( value ) {
                return ( field, index ) => {
                    const isLastField = index === path.length - 1
                    
                    if ( ! setter ) {
                        if ( ! isLastField ) {
                            setter = rawState[ field ]
                        }

                        if ( isLastField ) {
                            setter = rawState
                            setter[ field ] = value
                        }

                        return 
                    }

                    if ( ! isLastField ) {
                        setter = setter[ field ]
                    }

                    if ( isLastField ) {
                        setter[ field ] = value
                    }
                }
            }

            path.map( handleField( value ) )

            this.setState( rawState )
        }
        render() {
            const self = this

            return [
                <Tree 
                    key={ 0 } 
                    data={ getDisplyData && getDisplyData.bind( this )() }
                />,

                <InputPanel key={ 1 } >
                    { this.getFormulas() }
                </InputPanel>
            ]
        }
    }

    DisplayComponent.propTypes = {

    }

    return <DisplayComponent />
}