import { colors } from './colors'

export const lightTheme = {
  dark: false,
  colors: {
    primary: colors.purple,
    background: colors.offWhite,
    card: colors.white,
    text: colors.offBlack,
    border: colors.gray,
    notification: colors.tomato
  }
}

export const darkTheme = {
  dark: true,
  colors: {
    primary: colors.blue,
    background: colors.deepPurple,
    card: colors.deepPurple,
    text: colors.white,
    border: colors.black,
    notification: colors.tomato
  }
}
