import React from 'react'
import styles from './ShowcaseGrid.module.scss'
import { createGlobalLocalClassnames } from '../../scripts/utils'
import classnames from 'classnames'
import * as R from 'ramda'
import ShowcaseItem from '../ShowcaseItem'

const globalLocalClassnames = R.partial(createGlobalLocalClassnames, [styles])

class ShowcaseGrid extends React.PureComponent {
    renderShowcaseItem = itemProps => {
        return (
            <ShowcaseItem
                { ...itemProps }
                key={ itemProps.id }
                onClick={ this.props.onShowcaseClick }
            />)
    }

    render() {
        const {
            showcases = []
        } = this.props

        const containerProps = {
            className: classnames(
                globalLocalClassnames('ShowcaseGrid')
            )
        }

        return (
            <div { ...containerProps }>
                <div className={ styles.showcases }>
                    { showcases.map(this.renderShowcaseItem) }
                </div>
            </div>
        )
    }
}

export default ShowcaseGrid
