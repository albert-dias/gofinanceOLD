import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import theme from '../global/styles/theme';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){
    const theme = useTheme();
    return(
        <Navigator
            tabBarOptions={{
                activeTintColor: theme.colors.secundary,
                inactiveTintColor: theme.colors.text,
                labelPosition: 'beside-icon',
                style:{
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 88
                }
            }}
        >
            <Screen 
                name="Listagem" 
                component={Dashboard}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons 
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen 
                name="Cadastrar" 
                component={Register}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons 
                            name='attach-money'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen 
                name="Resumo" 
                component={Register}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons 
                            name='pie-chart'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </Navigator>
    );
}