import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Table,  { TableBody, TableCell, TableHead, TableRow }  from 'material-ui/Table'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'
import { isNotStartWith__ } from 'fp/index'


import ArrayWrapper from 'component/shared/display/ArrayWrapper/index'
import ObjectWrapper from 'component/shared/display/ObjectWrapper/index'
import ValueItem from 'component/shared/display/ValueItem/index'
import ImageElement from 'component/shared/display/ImageElement/index'

const { classes } = createStyleSheet( style )


export default class Tree extends Component {
    getArrayDataContent( data, key ) {
        return (
            <ArrayWrapper key={ key } >
                {
                    data && data.map(
                        ( item, index ) => 
                        this.getRenderContent( item, index )
                    )
                }
            </ArrayWrapper>
        )
    }
    getPlainObjectDataContent( data, key ) {

        const fields = Object.keys( data )

        return (
            <ObjectWrapper key={ key }>
                <Table>
                    <TableHead>
                      <TableRow>
                          {
                              fields
                              && fields
                              .filter( isNotStartWith__ )
                              .map(
                                ( field, index ) => 
                                <TableCell key={ index } className={`${classes.tableHeadRowCell} ${classes.tableCell}`} >
                                    { this.getRenderContent( field, index ) }
                                </TableCell>
                              )
                          }
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {
                                fields
                                && fields
                                .filter( isNotStartWith__ )
                                .map(
                                  ( field, index ) => 
                                  <TableCell key={ index } className={`${classes.tableBodyRowCell} ${classes.tableCell}`}>
                                      { this.getRenderContent( data[ field ], index ) }
                                  </TableCell>
                                )
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </ObjectWrapper>
        )
    }
    getRenderContent( data, key ) {
        if ( _.isString( data ) || _.isNumber( data ) || _.isBoolean( data ) ) {
            return <ValueItem key={ key } itemDecoratorComponent={ ImageElement } >{ data }</ValueItem>
        }

        if ( _.isArray( data )  ) {
            return this.getArrayDataContent( data, key )
        }

        if ( _.isPlainObject( data )  ) {
            return this.getPlainObjectDataContent( data, key )
        }

        return data
    }
    render() {
        return this.getRenderContent( this.props.data )
    }
}





Tree.propTypes = {
    data: PropTypes.any
}