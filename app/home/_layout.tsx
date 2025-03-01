import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Layout() {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState('dashboard');

    const handleTabPress = (e: any, routeName: string) => {
        setSelectedTab(routeName);
        router.push(`./${routeName}`);
    };

    return (
        <Tabs
            initialRouteName={selectedTab}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                  
                    switch (route.name) {
                        case 'dashboard':
                            iconName = 'appstore-o';
                            color = selectedTab === 'dashboard' ? "#4CAF50" : "#757575";
                            break;
                        case 'profile':
                            iconName = 'user';
                            color = selectedTab === 'profile' ? "#4CAF50" : "#757575";
                            break;
                        default:
                            return null;
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#4CAF50',
                tabBarInactiveTintColor: '#757575',
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
                headerShown: false,
            })}
            screenListeners={{
                tabPress: (e) => {
                  const routeName = e.target?.split('-')[0];
                  if (['dashboard', 'profile'].includes(routeName)) {
                    handleTabPress(e, routeName);
                  } else {
                    e.preventDefault(); 
                  }
                },
              }}
        >
           
            <Tabs.Screen name="dashboard" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
        height: 60,
        paddingBottom: 5,
        paddingTop: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
});