/// <reference types="react-scripts" />
type GlobalProps = {
  toggleDarkMode?: () => void
  darkMode?: boolean,
  changeLocale?: () => void,
  locale?: 'zh_CN' | 'en_US'
}
