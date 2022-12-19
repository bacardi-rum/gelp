import { useOutletContext } from 'react-router-dom'
import { Dispatch, SetStateAction } from 'react'

const Uploader = () => {
  const [value, setValue] = useOutletContext<[AttachmentItem[], Dispatch<SetStateAction<AttachmentItem[]>>]>()
  console.log(value)

  return (
    <div>
      Uploader
    </div>
  )
}

export default Uploader
