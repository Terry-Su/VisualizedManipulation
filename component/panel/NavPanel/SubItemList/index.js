import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'

const { classes } = createStyleSheet( style )


class SubItemList extends Component {
    onItemClick( itemIndex ) {
        const { name: title, list } = this.props.itemList[ this.props.listIndex ]
        const itemName = list[ itemIndex ]

        this.props.dispatch( {
            type: 'root/updateDisplay',
            title,
            itemName
        } )

    }
    render() {
        const { list, dispatch } = this.props

        return (
            <div>
                {
                    list.map(
                        ( name, index ) => 
                        <div className={ classes.item }  key={ index } onClick={ () => this.onItemClick( index ) }>
                            { name }
                        </div>
                    )
                }
            </div>
        )
    }
}

SubItemList.propTypes = {
    list: PropTypes.array,
    itemList: PropTypes.array,
}

function mapStateToProps( { itemList } ) {
    return {
        itemList
    }
}

export default connect(mapStateToProps)( SubItemList )