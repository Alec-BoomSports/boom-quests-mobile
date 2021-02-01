import 'react-native-gesture-handler'
import React, { useState, useCallback, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { AvailableQuests } from './components/AvailableQuests'
import { ActiveQuests } from './components/ActiveQuests'
import { CompleteQuests } from './components/CompleteQuests'
import { darkTheme, lightTheme } from './core/theme'
import { ThemeChange } from './components/ThemeChange'
import { ThemeContext } from './context/ThemeContext'
import { StatusBar } from 'expo-status-bar'
import { ApplicationProvider, Icon, IconRegistry } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import evaThemeValues from './core/evaTheme.json'
import { LoadingOverlay } from './components/common/LoadingOverlay'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Counter } from './components/Counter'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

const queryClient = new QueryClient()

const BottomTabs = createBottomTabNavigator()
const QuestStack = createStackNavigator()
const ActiveStack = createStackNavigator()
const CompleteStack = createStackNavigator()
const CounterStack = createStackNavigator()

const CounterScreens = () => {
  return (
    <CounterStack.Navigator>
      <CounterStack.Screen name='Counter' component={Counter} options={{ headerTitle: 'Counter' }} />
    </CounterStack.Navigator>
  )
}

const QuestScreens = () => {
  return (
    <QuestStack.Navigator screenOptions={{ headerRight: ThemeChange }}>
      <QuestStack.Screen name='AvailableQuests' component={AvailableQuests} options={{ headerTitle: 'Available Quests' }} />
    </QuestStack.Navigator>
  )
}

const ActiveScreens = () => {
  return (
    <ActiveStack.Navigator screenOptions={{ headerRight: ThemeChange }}>
      <ActiveStack.Screen name='ActiveQuests' component={ActiveQuests} options={{ headerTitle: 'Active Quests' }} />
    </ActiveStack.Navigator>
  )
}

const CompleteScreens = () => {
  return (
    <CompleteStack.Navigator screenOptions={{ headerRight: ThemeChange }}>
      <CompleteStack.Screen name='CompleteQuests' component={CompleteQuests} options={{ headerTitle: 'Complete Quests' }} />
    </CompleteStack.Navigator>
  )
}

const SHOW_COUNTER_DEMO = false

export default function App () {
  const [theme, setTheme] = useState(lightTheme)

  const isDark = useMemo(() => {
    return theme === darkTheme
  }, [theme])

  const evaTheme = useMemo(() => {
    return { ...(isDark ? eva.dark : eva.light), ...evaThemeValues }
  }, [isDark])

  const handleToggleTheme = useCallback(() => {
    setTheme(isDark ? lightTheme : darkTheme)
  }, [isDark])

  return (
      <NavigationContainer theme={theme}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <IconRegistry icons={EvaIconsPack} />
        <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={{ theme, toggleTheme: handleToggleTheme }}>
          <ApplicationProvider {...eva} theme={evaTheme}>
            <LoadingOverlay>
              {SHOW_COUNTER_DEMO
                ? (<CounterScreens />)
                : (<BottomTabs.Navigator initialRouteName='Quests'>
                <BottomTabs.Screen name='Quests' component={QuestScreens} options={{ tabBarIcon: questTabBarIcon }} />
                <BottomTabs.Screen name='Active' component={ActiveScreens} options={{ tabBarIcon: activeTabBarIcon }} />
                <BottomTabs.Screen name='Complete' component={CompleteScreens} options={{ tabBarIcon: completeTabBarIcon }} />
              </BottomTabs.Navigator>)}
            </LoadingOverlay>
          </ApplicationProvider>
        </ThemeContext.Provider>
        </QueryClientProvider>
      </NavigationContainer>
  )
}

function questTabBarIcon ({ color, size }) {
  return <Icon fill={color} style={{ width: size, height: size }} name='home-outline' />
}

function activeTabBarIcon ({ color, size }) {
  return <Icon fill={color} style={{ width: size, height: size }} name='person-outline' />
}

function completeTabBarIcon ({ color, size }) {
  return <Icon fill={color} style={{ width: size, height: size }} name='person-done-outline' />
}
