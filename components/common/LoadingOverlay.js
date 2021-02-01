/* eslint-disable react/prop-types */
import { Spinner } from '@ui-kitten/components'
import React, { Fragment, useCallback, useState } from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'

export const LoadingOverlayContext = React.createContext()

export const LoadingOverlay = (props) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggleOverlay = useCallback(() => {
    setIsVisible(isVisible => !isVisible)
  }, [])

  return (
    <Fragment>
        <LoadingOverlayContext.Provider value={{ isVisible, toggleOverlay: handleToggleOverlay }}>
        {props.children}
        <Modal isVisible={isVisible} animationIn='fadeIn' animationOut='fadeOut'>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Spinner />
            </View>
        </Modal>
        </LoadingOverlayContext.Provider>
    </Fragment>
  )
}
