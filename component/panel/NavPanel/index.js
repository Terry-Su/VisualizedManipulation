import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'

import ItemList from './ItemList/index'

const { classes } = createStyleSheet( style )

class NavPanel extends Component {
    render() {
        const {
            itemList
        } = this.props

        return (
            <div className={ classes.container }>
                <ItemList itemList={ itemList }/>
            </div>
        )
    }
}

NavPanel.propTypes = {
    itemList: PropTypes.array
}


function mapStateToProps({ itemList }) {
    return {
        itemList,
    }
}

export default connect( mapStateToProps )( NavPanel )