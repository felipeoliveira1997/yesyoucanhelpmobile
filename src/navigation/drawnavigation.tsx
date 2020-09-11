import React, { useEffect } from 'react';
import { View, Text, StatusBar, CheckBox, TextBase } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  useNavigation
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Button
} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { toString } from 'lodash';
import { AuthProvider } from '../context/auth'
import Icon from 'react-native-vector-icons/FontAwesome';

// import { ChangeDataDarkTheme } from '../data/asyncstorage'

//import navigation bottom
import BottomNavigator from './bottomnavigation';

//import screens
import { Routes } from '../routes'
import LoginScreen from '../pages/loginscreen';
import RegisterUserScreen from '../pages/registerscreen'
import ProfileScreen from '../pages/profilescreen'
import MapsScreen from '../pages/mapsscreen'

//components
import { DrawContent } from './drawcontent';

const Drawer = createDrawerNavigator();


class DrawNavigation extends React.Component {

  idDarkTheme = 'idDarkTheme';

  state = {
    darkTheme: false
  }


  //#region ABOUT THEME APPLICATION

  CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#fafafa',
      text: '#000000',
      accent: '#D2D2D2',
      primary: '#ff6f00',
      surface: '#0D64FF',
      onSurface: '#0DFF94'
    }
  }

  CustomDarkTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      ...NavigationDefaultTheme.colors,
      background: '#212121',
      text: '#fafafa',
      accent: '#757575',
      primary: '#c43e00',
      surface: '#124BB3',
      onSurface: '#12B36B'
    }
  }

  //#endregion

  //#region CHANGES OF THE DARKTHEME

  getInicialDarkThemeValue = async () => {

    try {

      const retornoDataTheme = await AsyncStorage.getItem(this.idDarkTheme)

      if (retornoDataTheme !== null) {

        if (retornoDataTheme === 'true') {

          this.setState({ darkTheme: true })

        } else {

          this.setState({ darkTheme: false })

        }

      }
    } catch (error) {
      console.log(error)
    }
  }

  ChangeDataDarkTheme = async (value: string) => {

    try {

      let retornoGet = await AsyncStorage.getItem(this.idDarkTheme)

      if (retornoGet !== null) {

        await AsyncStorage.removeItem(this.idDarkTheme)
        await AsyncStorage.setItem(this.idDarkTheme, value)

      } else {

        await AsyncStorage.setItem(this.idDarkTheme, value)

      }


    } catch (e) {
      console.log(e)
    }
  }

  //#endregion


  componentDidMount() {
    this.getInicialDarkThemeValue()
  }

  render() {

    const toggleTheme = () => {
      this.ChangeDataDarkTheme(toString(!this.state.darkTheme))
      this.setState({ darkTheme: !this.state.darkTheme ? true : false })
    }

    const verify = this.state.darkTheme;
    let isDarkTheme = this.CustomDefaultTheme
    if (verify) {
      isDarkTheme = this.CustomDarkTheme
    }

    return (
      <PaperProvider theme={isDarkTheme} {...this.props}>
        <NavigationContainer theme={isDarkTheme} {...this.props}>
          <StatusBar animated={true} backgroundColor={isDarkTheme.colors.primary} />
          <AuthProvider>
            {/* <Drawer.Navigator initialRouteName="Login"
              backBehavior="none"
              drawerContent={props => <DrawContent props={props} SwitchDarkTheme={this.state.darkTheme} toggleTheme={toggleTheme} />}
              drawerType="slide"
              drawerStyle={{ backgroundColor: isDarkTheme.colors.background }}
              {...this.props}
              edgeWidth={65}
            >

              <Drawer.Screen name="Login" component={LoginScreen} />
              <Drawer.Screen name="RegisterUserScreen" children={() => { return (<RegisterUserScreen theme={isDarkTheme} {...this.props} />) }} />
              <Drawer.Screen name="ProfileScreen" children={() => { return (<ProfileScreen theme={isDarkTheme} {...this.props} />) }} />
              <Drawer.Screen name="MapsScreen" component={MapsScreen} />
              <Drawer.Screen name="BottomNavigator" component={BottomNavigator} />
            </Drawer.Navigator> */}
            <Routes toggleTheme={toggleTheme} SwitchDarkTheme={this.state.darkTheme} {...this.props} />

          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    )
  }
}

export default DrawNavigation;