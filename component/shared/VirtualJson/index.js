import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Table, { TableBody, TableRow, TableCell } from 'material-ui/Table'
import MuiSelect from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import Card from 'material-ui/Card'
import Paper from 'material-ui/Paper'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { DEAFULT_SPACES_COUNT } from 'constant/index'
import { isNotStartWith__ } from 'fp/index'
import { getNumerousSpaces } from 'mixin/index'
import { SMALLER_IMAGE_SIZE } from 'constant/index'

import ValueItem from 'component/shared/display/ValueItem'
import ImageElement from 'component/shared/display/ImageElement'

const { classes } = createStyleSheet( style )

export default class VirtualJson extends Component {
    constructor( props ) {
        super( props )

        this.topRows = []
        this.bottomRows = []
    }
    Char = ( { item } ) =>  {
        return item
    }
    Row = ( { line } ) => {
        return (
            <TableRow className={ classes.TableRow }>
                <TableCell  className={ classes.TableCell }>
                    {
                        line && line.map(
                            ( item, index ) =>
                            item
                        )
                    }
                </TableCell>
            </TableRow>
        )
    }
    resetRows() {
        _.remove( this.topRows )
        _.remove( this.bottomRows )
    }
    dispatchGetReactElement( { data, isAddComma, spacesLength = 0 } ) {
        const spaces = getNumerousSpaces( spacesLength )
        this.topRows.push( [ 
            spaces,
            <span key={ this.topRows.length }>
                { data }
                {/* { `,` } */}
            </span>,
        ] )
    }
    dispatchGetString( { data, isAddComma, spacesLength = 0 } ) {
        const spaces = getNumerousSpaces( spacesLength )
        this.topRows.push( [
            spaces,
            [ <ValueItem key={ this.topRows.length } itemDecoratorComponent={ ImageElement } size={ SMALLER_IMAGE_SIZE } >{ data }</ValueItem>, isAddComma && ',' ]
        ] )
    }
    dispatchGetArray( { data, isAddComma, spacesLength = 0, isDispatchFromObjectOrArray } ) {
        const spaces = getNumerousSpaces( spacesLength )
        const spacesLengthAdded = _.add( spacesLength, DEAFULT_SPACES_COUNT )
        const spacesAdded =  getNumerousSpaces( spacesLengthAdded )

        const dispatch = () => data.map(
            ( item, index ) =>
            {
                this.dispathGetCalculatedVisualData( { data: item , isAddComma: true, isDispatchFromObjectOrArray: true, spacesLength: spacesLengthAdded } )
            }
        ) 
        
        this.topRows.push( [ spaces, `[` ] )
        

        if ( ! isDispatchFromObjectOrArray ) {
            this.bottomRows.unshift( [ spaces, isAddComma ? `],` : `]` ] )

            dispatch()
        } 
        if ( isDispatchFromObjectOrArray ) {
            dispatch()

            this.topRows.push( [ spaces, isAddComma ? `],` : `]` ] )
        }
         
    }
    dispatchGetObject( { data, isAddComma, spacesLength, isDispatchFromObjectOrArray } ) {
        const spaces = getNumerousSpaces( spacesLength )
        const spacesLengthAdded = _.add( spacesLength, DEAFULT_SPACES_COUNT )
        const spacesAdded =  getNumerousSpaces( spacesLengthAdded )

        this.topRows.push( [ spaces, `{` ] )

        const dispatch = () => {
            const fields = Object.keys( data )
            fields 
            && fields
            .filter( isNotStartWith__ )
            .map(
                ( field, index ) => {
            
                    const harvest = data[ field ]
                    const currentField = data[ '__field' ] 
                    ? (
                        data[ '__field' ][ field ] 
                        || <ValueItem itemDecoratorComponent={ ImageElement } size={ SMALLER_IMAGE_SIZE } >{ field }</ValueItem> 
                    ) 
                    : <ValueItem itemDecoratorComponent={ ImageElement } size={ SMALLER_IMAGE_SIZE } >{ field }</ValueItem>

                    if ( _.isString( harvest ) || _.isNumber( harvest ) ) {
                        this.topRows.push(
                            [
                                spacesAdded,
                                <span key={ index }>{ currentField }</span>,
                                `:`,
                                getNumerousSpaces( 1 ),
                                <ValueItem key={ `${index}${index}` } itemDecoratorComponent={ ImageElement } size={ SMALLER_IMAGE_SIZE } >{ harvest }</ValueItem>,
                                `,`
                            ]
                        )
                    } 

                    if ( React.isValidElement( harvest ) ) {
                        this.topRows.push(
                            [
                                spacesAdded,
                                <span key={ index }>{ currentField }</span>,
                                `: `,
                                getNumerousSpaces( 1 ),
                                <span key={ `${index}${index}` }>{ harvest }</span>,
                                `,`,
                            ]
                        )
                    }


                    if( _.isArray( harvest ) || ( _.isPlainObject( harvest ) && ! React.isValidElement( harvest ) ) ) {
                        this.topRows.push( [ 
                            spacesAdded, 
                            <span key={ index }>{ currentField }</span>, 
                            `: ` ,
                            getNumerousSpaces( 1 ),
                        ] )
    
                        this.dispathGetCalculatedVisualData( { data: harvest, isAddComma: true, spacesLength: true, isDispatchFromObjectOrArray: true, spacesLength: spacesLengthAdded } )
                    }
                }
            )
        }

        if ( ! isDispatchFromObjectOrArray ) {
            this.bottomRows.unshift(
                [ spaces, isAddComma ? `},` : `}`  ]
            )

            dispatch()
        }

        if ( isDispatchFromObjectOrArray ) {
            dispatch()

            this.topRows.push(
                [ spaces, isAddComma ? `},` : `}`  ]
            )
        }
        
    }
    dispathGetCalculatedVisualData( { data, isAddComma, spacesLength = 0, isDispatchFromObjectOrArray } ) {
        /**
         * string, number
         */
        if ( _.isString( data ) || _.isNumber( data ) ) {
            this.dispatchGetString( { data, isAddComma, spacesLength, isDispatchFromObjectOrArray } )
        }

        /**
         *  react element
         */
        if ( React.isValidElement( data ) ) {
            this.dispatchGetReactElement( { data, isAddComma, spacesLength, isDispatchFromObjectOrArray } )
        }


        /**
         * array
         */
        if ( _.isArray( data ) ) {
            this.dispatchGetArray( { data, isAddComma, spacesLength, isDispatchFromObjectOrArray } )
        }

        /**
         * object, not react element
         */
        if ( _.isPlainObject( data ) && ! React.isValidElement( data ) ) {
            this.dispatchGetObject( { data, isAddComma, spacesLength, isDispatchFromObjectOrArray: true } )
        }


        return [ ...this.topRows, ...this.bottomRows ]
    }
    render() {

        /**
         * static string
         */
        // const data = 'sample string'

        /**
         * static image string
         */
        // const data = 'apple'

        /**
         * static array
         */
        // const data = [
        //     'apple',
        //     'lemon',
        // ]

        /**
         * object
         */
        // const data = {
        //     dog: 'apple',
        //     cat: 'lemon',
        //     array: [ 'apple', 'lemon' ],
        //     test: {
        //         a: 1,
        //         b: 2
        //     },
        //     __field: { dog: <b>dog</b> }
        // }

        this.resetRows()
        const visualData = this.dispathGetCalculatedVisualData( { data: this.props.data } )

        return (
            <Table className={ classes.container }>
                <TableBody>
                    {
                        visualData && visualData.map(
                            ( line, index ) => 
                            <this.Row key={ index } line={ line } />   
                        )
                    }
                </TableBody>
            </Table>
        )
    }
}

VirtualJson.propTypes = {
    data: PropTypes.any
}
