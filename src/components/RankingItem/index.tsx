import { FontWeights, NeutralColors, Persona, PersonaSize, Text } from '@fluentui/react'
import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'

const className = 'gelp-ranking-item'
const RankingItem = (item: UserInfo, index: number, key?: string) => {
  return (
    <NavLink to={`/profile/${item._id}`} style={{ textDecoration: 'none' }}>
      <div className={styles[className]} key={key ?? item._id}>
        <Text variant="xxLarge"
          style={{
            width: '1em',
            color: NeutralColors.gray140,
            fontWeight: FontWeights.regular,
            textAlign: 'center'
          }}>{index! + 1}</Text>
        <Persona styles={{
          root: { marginLeft: '10px', flex: 1 }
        }} text={item?.name} secondaryText={item?.email} size={PersonaSize.size40} />
        <Text variant="xLarge"
          style={{ color: NeutralColors.gray120, fontWeight: FontWeights.regular }}>{item?.score}</Text>
      </div>
    </NavLink>
  )
}

export default RankingItem
