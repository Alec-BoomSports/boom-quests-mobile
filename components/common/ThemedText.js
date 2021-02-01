import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Text } from 'react-native'

export const ThemedText = (props) => {
  const theme = useTheme()

  return (
        <Text style={{ color: theme.colors.text }}>
            {props.children}
        </Text>
  )
}
