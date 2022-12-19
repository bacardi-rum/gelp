import { FontWeights, NeutralColors, Persona, PersonaSize, Text } from '@fluentui/react'

const RankingItem = (item: UserInfo, index: number, key?: string) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderBottom: '1px solid #edebe9'
    }} key={key ?? item._id}>
      <Text variant="xxLarge"
            style={{
              width: '1em',
              color: NeutralColors.gray140,
              fontWeight: FontWeights.regular,
              textAlign: 'center'
            }}>{index! + 1}</Text>
      <Persona styles={{
        root: { marginLeft: '10px', flex: 1 }
      }} text={item?.name} secondaryText={item?.email} size={PersonaSize.size40}/>
      <Text variant="xLarge"
            style={{ color: NeutralColors.gray120, fontWeight: FontWeights.regular }}>{item?.score}</Text>
    </div>
  )
}

export default RankingItem
