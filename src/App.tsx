import React, { Suspense, useMemo } from 'react'
import '@/App.scss'
import Routes from '@routes'
import {
  FontSizes,
  getTheme,
  Icon,
  IStackItemStyles,
  IStackStyles,
  mergeStyles,
  mergeStyleSets,
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
import { useAppSelector, useInit } from '@hooks'
import { useNavigate } from 'react-router-dom'

const theme = getTheme()

const App = () => {
  useInit()
  const userInfo = useAppSelector(state => state.user)
  const navigate = useNavigate()

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
      padding: '6px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: NeutralColors.gray20
      }
    }
  })

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
              {navLinkGroup.map(navLink => {
                if (userInfo.identity === 0) {
                  return (
                    <NavBarItem to={navLink.url} key={navLink.key}>
                      {navLink.name}
                    </NavBarItem>
                  )
                } else return (<></>)
              })}
            </NavBar>
          </Stack.Item>
          <Stack.Item styles={stackItemStyles}>
            <SearchBox placeholder="搜索课程" styles={{ root: { minWidth: '300px', marginRight: '1em' } }} />
            <Persona text={userInfo.name} size={PersonaSize.size32} onClick={() => navigate('/profile')} className={mergedStyleSet.persona} />
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
