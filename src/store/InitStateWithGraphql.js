import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { actions } from './index'
import { pluckEdgeNodes } from '../scripts/utils'
import * as R from 'ramda'

const mapGraphqlAsset = (asset, label) => ({
    src: R.prop('publicURL', asset),
    label
})

const mapData = R.pipe(
    // Pluck the edge nodes of each property in data.
    // This eliminates the deep nesting of the data we want (data[prop].edges[i].node[dataWeWant] => data[prop][dataWeWant])
    R.mapObjIndexed(pluckEdgeNodes),
    // I think we'll only ever need 1 item for aboutMe, so only get the first item
    R.evolve({
        aboutMe: R.head,
        showcases: R.map(showcase => ({
            ...showcase,
            image: mapGraphqlAsset(showcase.image, showcase.title)
        })),
        skills: R.map(skill => ({
            ...skill,
            logo: mapGraphqlAsset(skill.logo, skill.name)
        }))
    })
)

/**
 * WARNING: This is a hacky way of initiating the provider state with graphql data.
 * This will have to do until I stumble upon a cleaner way to do this
 */
class InitStateWithGraphql extends React.PureComponent {
    constructor(props) {
        super(props)

        const mappedData = mapData(props.data)

        actions.initStateWithGraphqlData({ ...mappedData })
    }

    render() {
        return null
    }
}

const InitStateWithGraphqlContainer = () => {
    return <StaticQuery
        query={ graphql`
            query InitStateQuery {
                ...AboutMeFragment
                ...ExperienceFragment
                ...SkillsFragment
                ...ShowcasesFragment
            }
        ` }
        render={ data => <InitStateWithGraphql data={ data } /> }
    />
}

export default InitStateWithGraphqlContainer