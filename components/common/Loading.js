import { Spinner } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'

export const Loading = (props) => {
  return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner />
        </View>
  )
}
