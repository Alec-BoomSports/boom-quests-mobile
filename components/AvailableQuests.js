import React from 'react'
import { questService } from '../services/questService'
import { Loading } from './common/Loading'
import { Button, Divider, List, ListItem, Text } from '@ui-kitten/components'
import { LoadingOverlayContext } from './common/LoadingOverlay'

export class AvailableQuests extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      isRefreshing: false
    }
    this.renderItem = this.renderItem.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  componentDidMount () {
    this.fetchQuests()
  }

  async fetchQuests () {
    const quests = await questService.getAvailableQuests()
    this.setState({ list: quests.list, isRefreshing: false })
  }

  async takeQuest (questId) {
    const quests = await questService.takeQuest(questId)
    this.setState({ list: quests.availableList })
  }

  handleRefresh () {
    this.setState({ isRefreshing: true }, () => {
      this.fetchQuests()
    })
  }

  renderItem ({ item }) {
    return (
      <ListItem
        title={evaProps => <Text {...evaProps}>{item.title}</Text>}
        description={evaProps => <Text {...evaProps}>{item.description}</Text>}
        accessoryRight={() => (
          <LoadingOverlayContext.Consumer>
            {({ toggleOverlay }) => (
              <Button onPress={async () => {
                toggleOverlay()
                this.takeQuest(item.id)
                  .catch(() => this.fetchQuests())
                  .finally(toggleOverlay)
              }} size='tiny'>TAKE</Button>
            )}
        </LoadingOverlayContext.Consumer>
        )}
      />
    )
  }

  render () {
    if (!this.state.list.length) {
      return <Loading />
    }
    return (
      <List
        refreshing={this.state.isRefreshing}
        onRefresh={this.handleRefresh}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        data={this.state.list}
        ItemSeparatorComponent={Divider}
      />
    )
  }
}
