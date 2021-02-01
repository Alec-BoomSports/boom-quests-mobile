import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../hooks/useTheme'
import { useToggleTheme } from '../hooks/useToggleTheme'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const ThemeChange = (props) => {
  const theme = useTheme()
  const toggleTheme = useToggleTheme()

  return (
    <TouchableOpacity onPress={toggleTheme}>
        <Ionicons name={theme.dark ? 'ios-moon' : 'ios-moon-outline' } size={24} color={theme.colors.text} style={styles.icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: { marginHorizontal: 16 }
})
