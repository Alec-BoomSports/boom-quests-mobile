import React, { useCallback } from 'react'
import { questService } from '../services/questService'
import { Loading } from './common/Loading'
import { Divider, List, ListItem, Text } from '@ui-kitten/components'
import { useQuery } from 'react-query'
import { constants } from '../core/constants'

export const CompleteQuests = props => {
  const { isLoading, data, isFetching, refetch } = useQuery(constants.complete, () => {
    return questService.getCompleteQuests()
  }, [])

  const renderItem = useCallback(({ item }) => {
    return (
      <ListItem
        title={evaProps => <Text {...evaProps}>{item.title}</Text>}
        description={evaProps => <Text {...evaProps}>{item.description}</Text>}
      />
    )
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <List
      refreshing={isFetching}
      onRefresh={refetch}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      data={data.list}
      ItemSeparatorComponent={Divider}
    />
  )
}
