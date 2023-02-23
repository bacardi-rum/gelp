import React, { KeyboardEventHandler, Suspense, useCallback, useMemo, useState } from 'react'
import '@/App.scss'
import Routes from '@routes'
import {
  DefaultButton,
  FontSizes,
  getTheme,
  Icon,
  IStackItemStyles,
  IStackStyles,
  mergeStyleSets,
  MessageBarType,
  MotionAnimations,
  NeutralColors,
  Persona,
  PersonaSize,
  SearchBox,
  Stack
} from '@fluentui/react'
import navLinkGroup from '@config/nav'
import NavBar from '@components/NavBar'
import NavBarItem from '@components/NavBarItem'
import { useAppDispatch, useAppSelector, useInit } from '@hooks'
import { useNavigate } from 'react-router-dom'
import { logout } from '@redux/slices/userSlice'
import Message from '@components/Message'

const App = () => {
  useInit()
  const userInfo = useAppSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [courseName, setCourseName] = useState('')

  const stackStyles = useMemo<Partial<IStackStyles>>(() => {
    return {
      root: {
        padding: '6px 40px',
        animation: MotionAnimations.slideDownIn,
        // borderTop: `4px solid ${theme.palette.themePrimary}`
      }
    }
  }, [])

  const stackItemStyles = useMemo<Partial<IStackItemStyles>>(() => {
    return {
      root: {
        display: 'flex',
        alignItems: 'center',
        animation: MotionAnimations.slideDownIn
      }
    }
  }, [])

  const mergedStyleSet = mergeStyleSets({
    'persona': {
      margin: '0 10px',
      padding: '6px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: NeutralColors.gray20
      }
    }
  })

  const handleSearch = useCallback<KeyboardEventHandler<HTMLInputElement>>((ev) => {
    if (ev.key.toLowerCase() === 'enter') {
      navigate(`/course/search/${courseName}`)
    }
  }, [courseName])

  const handleLogOut = useCallback(() => {
    dispatch(logout())
    Message.show(MessageBarType.success, '退出成功。')
      .then(() => {
        window.location.reload()
      })
  }, [])

  return (
    <section>
      <header style={{ backgroundColor: '#fff' }}>
        <Stack horizontal horizontalAlign="space-between" styles={stackStyles}>
          <Stack.Item styles={stackItemStyles}>
            <Icon iconName="CodeEdit" styles={{ root: { fontSize: FontSizes.size42, marginTop: '-4px' } }} />
            <strong style={{
              fontSize: FontSizes.size32,
              color: NeutralColors.gray180
            }}>GELP</strong>
            <NavBar style={{ marginLeft: '2em' }}>
              {navLinkGroup.filter(nav => nav.identity === 2 || nav.identity === userInfo.identity).map(navLink => (
                <NavBarItem to={navLink.url} key={navLink.key}>
                  {navLink.name}
                </NavBarItem>
              ))}
            </NavBar>
          </Stack.Item>
          <Stack.Item styles={stackItemStyles}>
            {userInfo.identity === 0 && (
              <SearchBox placeholder="搜索课程" styles={{ root: { minWidth: '300px' } }} onKeyUp={handleSearch} value={courseName} onChange={(ev, newVal) => setCourseName(newVal as string)} />
            )}
            <Persona text={userInfo.name} size={PersonaSize.size32} onClick={() => navigate('/profile')} className={mergedStyleSet.persona} />
            <DefaultButton onClick={handleLogOut}>退出登录</DefaultButton>
          </Stack.Item>
        </Stack>
      </header>
      <main>
        <Suspense>
          <Routes />
        </Suspense>
      </main>
      <footer></footer>
    </section>
  )
}

export default App
