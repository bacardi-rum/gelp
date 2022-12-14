import { NeutralColors, Persona, PersonaSize } from '@fluentui/react'

const CommentItem = (item?: CommentItem, index?: number) => {
  const decode = function (str: string) {
    if (str.startsWith('\n')) str = str.substring(1)
    return str.replaceAll(/\n/g, '<br>')
  }

  const decodedContent = decode(item?.content as string)

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '16px',
      // marginTop: '8px'
      borderBottom: `1px solid #edebe9`
    }}>
      <div style={{ display: 'flex' }}>
        <Persona hidePersonaDetails text="沈聪" size={PersonaSize.size40}/>
        <div style={{
          flex: 1,
          marginLeft: '10px'
        }} dangerouslySetInnerHTML={{ __html: decodedContent }}/>
        {/*{item?.content as string}*/}
      </div>
      <div style={{ textAlign: 'end', marginTop: '8px', color: NeutralColors.gray120 }}>{item?.date.toString()}</div>
    </div>
  )
}

export default CommentItem
