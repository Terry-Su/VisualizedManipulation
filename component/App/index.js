import React, { Component } from 'react'

import createStyleSheet from 'util/createStyleSheet'
import style from './style'

import NavPanel from 'component/panel/NavPanel/index'
import DisplayPanel from 'component/panel/DisplayPanel/index'



const { classes } = createStyleSheet(style)

export default class App extends Component {

    render() {
        const isUnitComponentTest = true
        return (
            <div className={ classes.container }>
                <NavPanel />
                <DisplayPanel />
            </div>
        )
    }
}