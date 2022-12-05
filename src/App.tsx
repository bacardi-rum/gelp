import React, { useCallback, useEffect, useState } from 'react'
import './App.scss'
import Routes from '@routes'
import { LocaleProvider } from '@douyinfe/semi-ui'
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN'
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US'
import { BrowserRouter } from 'react-router-dom'


const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [locale, setLocale] = useState<'zh_CN' | 'en_US'>('zh_CN')

  useEffect(() => {
    const localLocale = localStorage.getItem('gelp-locale') as 'zh_CN' | 'en_US' | null
    if (localLocale === 'en_US') { setLocale(localLocale) }
    if (localLocale === null) {
      localStorage.setItem('gelp-locale', 'zh_CN')
    }
  }, [])

  useEffect(() => {
    const isDarkMode = window?.matchMedia('(prefers-color-scheme: dark)')?.matches
    if (isDarkMode) {
      document.body.setAttribute('theme-mode', 'dark')
      setDarkMode(isDarkMode)
    }
  }, [])

  const changeLocale = useCallback(() => {
    if (locale === 'zh_CN') { setLocale('en_US') }
    if (locale === 'en_US') { setLocale('zh_CN') }
  }, [locale])

  const toggleDarkMode = useCallback(() => {
    const body = document.body
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode')
    } else {
      body.setAttribute('theme-mode', 'dark')
    }
    setDarkMode(!darkMode)
  }, [darkMode])

  return (
    <LocaleProvider locale={locale === 'zh_CN' ? zh_CN : en_US}>
      <BrowserRouter>
        <Routes toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
                changeLocale={changeLocale}
                locale={locale}/>
      </BrowserRouter>
    </LocaleProvider>
  )
}

export default App
