import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";



export const Tab = createBottomTabNavigator();
export const Stack = createStackNavigator();
export const TopTab = createMaterialTopTabNavigator();