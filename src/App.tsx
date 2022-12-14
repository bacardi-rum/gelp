import React, { Suspense, useMemo } from 'react'
import '@/App.scss'
import Routes from '@routes'
import { useNavigate } from 'react-router-dom'
import {
  FontSizes,
  getTheme,
  Icon,
  INavStyles,
  IStackItemStyles,
  IStackStyles,
  MotionAnimations,
  NeutralColors,
  Persona,
  PersonaSize,
  SearchBox,
  Stack
} from '@fluentui/react'
import navLinkGroup from '@config/nav'
import NavBar from '@components/common/NavBar'
import NavBarItem from '@components/common/NavBarItem'

const theme = getTheme()

const App = () => {
  const navigate = useNavigate()
  const navStyles = useMemo<Partial<INavStyles>>(() => {
    return {
      root: {
        marginBottom: '-4px',
        marginLeft: '2em',
      },
      groupContent: {
        margin: 0
      },
      navItem: {
        display: 'inline-block'
      }
    }
  }, [])

  const stackStyles = useMemo<Partial<IStackStyles>>(() => {
    return {
      root: {
        padding: '6px 40px',
        background: NeutralColors.white,
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

  return (
    <section>
      <header>
        <Stack horizontal horizontalAlign="space-between" styles={stackStyles}>
          <Stack.Item styles={stackItemStyles}>
            <Icon iconName="CodeEdit" styles={{ root: { fontSize: FontSizes.size42, marginTop: '-4px' } }}/>
            <strong style={{
              fontSize: FontSizes.size32,
              color: NeutralColors.gray180
            }}>GELP</strong>
            <NavBar style={{ marginLeft: '2em' }}>
              {navLinkGroup.map(navLink => (
                <NavBarItem to={navLink.url} key={navLink.key}>
                  {navLink.name}
                </NavBarItem>
              ))}
            </NavBar>
          </Stack.Item>
          <Stack.Item styles={stackItemStyles}>
            <SearchBox placeholder="搜索课程" styles={{ root: { minWidth: '300px', marginRight: '1em' } }}/>
            <Persona hidePersonaDetails text="Hello" size={PersonaSize.size32}/>
          </Stack.Item>
        </Stack>
      </header>
      <main>
        <Suspense>
          <Routes/>
        </Suspense>
      </main>
      <footer></footer>
    </section>
  )
}

export default App
