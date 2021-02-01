import React, { useState, useEffect, useCallback, useContext } from 'react'
import { questService } from '../services/questService'
import { Loading } from './common/Loading'
import { Button, Divider, List, ListItem, Text } from '@ui-kitten/components'
import { LoadingOverlayContext } from './common/LoadingOverlay'
import { useQueryClient } from 'react-query'
import { constants } from '../core/constants'

export const ActiveQuests = props => {
  const { toggleOverlay } = useContext(LoadingOverlayContext)
  const [list, setList] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const queryClient = useQueryClient()

  const fetchQuests = useCallback(async () => {
    const quests = await questService.getActiveQuests()
    setList(quests.list)
  }, [])

  async function completeQuest (questId) {
    const quests = await questService.completeQuest(questId)
    setList(quests.activeList)
    queryClient.invalidateQueries(constants.complete)
  }

  function handleRefresh () {
    setIsRefreshing(true)
  }

  function renderRightButton (questId) {
    return () => (
      <Button onPress={async () => {
        toggleOverlay()
        completeQuest(questId)
          .catch(() => fetchQuests())
          .finally(toggleOverlay)
      }} size='tiny'>COMPLETE</Button>
    )
  }

  function renderItem ({ item }) {
    return (
      <ListItem
        title={evaProps => <Text {...evaProps}>{item.title}</Text>}
        description={evaProps => <Text {...evaProps}>{item.description}</Text>}
        accessoryRight={renderRightButton(item.id)}
      />
    )
  }

  useEffect(() => {
    if (isRefreshing) {
      fetchQuests()
        .finally(() => setIsRefreshing(false))
    }
  }, [fetchQuests, isRefreshing])

  useEffect(() => {
    fetchQuests()
  }, [fetchQuests])

  if (!list.length) {
    return <Loading />
  }
  return (
    <List
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      data={list}
      ItemSeparatorComponent={Divider}
    />
  )
}
