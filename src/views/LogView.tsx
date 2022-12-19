import React, { useState } from 'react'
import TitledList from '@components/TitledList/TitledList'
import LogItem from '@components/LogItem'
import { PrimaryButton, SearchBox, Stack } from '@fluentui/react'
import { useAppSelector } from '@hooks'
import { useNavigate } from 'react-router-dom'

const LogView = () => {
  const navigate = useNavigate()
  const logs = useAppSelector(state => state.log.logs)
  const [logName, setLogName] = useState<string>('')

  return (
    <section style={{ padding: '0 40px 40px 20px' }}>
      <Stack>
        <Stack.Item>
          <TitledList items={logs.filter(course => course.name.includes(logName))} render={LogItem} title="全部日志" subtitle="All Logs" actions={(
            <div style={{ display: 'flex' }}>
              <PrimaryButton text="新建日志" onClick={() => navigate('/log/create')} />
              <SearchBox value={logName} onChange={(ev, newVal) => setLogName(newVal as string)} placeholder="搜索全部日志" styles={{ root: { minWidth: '500px', marginLeft: '20px' } }} />
            </div>
          )} />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default LogView
