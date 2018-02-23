import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import dynamic from 'dva/dynamic'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'

import * as itemComponentList from 'store/itemComponentList'

const { classes } = createStyleSheet(style)


class DisplayPanel extends Component {
    getRenderComponent() {
        const { displayComponentName } = this.props
        const shouldNotDisplay = ! displayComponentName

        if ( shouldNotDisplay ) {
            return null
        }

        const ItemComponent = itemComponentList[ displayComponentName ] || null

        return <ItemComponent className={ classes.ItemComponent }  />
    }
    render() {
        return (
            <div id="displayPanel" className={ classes.container }>
                { this.getRenderComponent() }
            </div>
        )
    }
}

DisplayPanel.propTypes = {
    displayComponentName: PropTypes.string
}


function mapStateToProps( { root } ) {
    return {
        displayComponentName: root.displayComponentName
    }
}

export default connect( mapStateToProps )( DisplayPanel )