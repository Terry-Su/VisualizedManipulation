import jss from 'jss'
import preset from 'jss-preset-default'

export default function createStyleSheet(styles) {
    jss.setup(preset())
    const sheet = jss.createStyleSheet(styles, {
        link: true
    }).attach()
    return sheet
}