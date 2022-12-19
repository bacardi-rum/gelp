import { NeutralColors, Persona, PersonaSize, VerticalDivider } from '@fluentui/react'

const CommentItem = (item: CommentItem & { user: UserInfo }, index: number, key?: string) => {
  const decode = function (str: string) {
    if (str.startsWith('\n')) str = str.substring(1)
    return str.replaceAll(/\n/g, '<br>')
  }

  const decodedContent = decode(item?.content as string)

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '16px',
      borderBottom: `1px solid #edebe9`
    }} key={key ?? item._id}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }} dangerouslySetInnerHTML={{ __html: decodedContent }} />
        <Persona text={item.user.name} secondaryText={item.date} size={PersonaSize.size40} />
        {/*{item?.content as string}*/}
      </div>
    </div>
  )
}

export default CommentItem
