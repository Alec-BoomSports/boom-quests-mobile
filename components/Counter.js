import { Button, Text } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'

export class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
    this.handleIncrement = this.handleIncrement.bind(this)
  }

  handleIncrement () {
    this.setState({ count: this.state.count + 1 })
  }

  render () {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{this.state.count}</Text>
            <Button onPress={this.handleIncrement}>INCREMENT</Button>
        </View>
    )
  }
}

const styles = {
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 30, marginBottom: 16 }
}
