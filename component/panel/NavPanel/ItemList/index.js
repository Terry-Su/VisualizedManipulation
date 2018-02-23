import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'

import SubItemList from '../SubItemList/index'

const { classes } = createStyleSheet(style)


class ItemList extends Component {
    onTitleClick = ( titleIndex ) => {
        this.props.dispatch( { 
            type: 'itemList/toogleTitle', 
            titleIndex,
        } )
    }
    render() {
        const { itemList } = this.props

        return (
            <div className={ classes.container }>
                {
                    itemList.map(
                        ( { name, isExpand, list }, index ) =>
                            <div key={ index } className={ classes.subItemListContainer }>
                                <div className={ classes.title } onClick={ () => this.onTitleClick(index) }>
                                    { name }
                                </div>
                                {
                                    isExpand && <SubItemList list={ list } listIndex={ index } />
                                }
                            </div>
                    )
                }
            </div>
        )
    }
}

ItemList.propTypes = {
    itemList: PropTypes.array
}




export default connect(() => ({}))(ItemList)