import React from 'react'
import { Button, Calendar } from '@douyinfe/semi-ui'


const Home: React.FC<GlobalProps> = (props) => {
  return (
    <section>
      <Button onClick={props.toggleDarkMode}>Dark Mode</Button>
      <Button onClick={props.changeLocale}>Change Language</Button>
      <Calendar/>
    </section>
  )
}

export default Home
