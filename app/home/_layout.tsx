import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
import AddTransactionModal from './addTransaction';

export default function Layout() {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    const handleTabPress = (e: any, routeName: string) => {
        if (routeName === 'addTransaction') {
            e.preventDefault(); // Prevent default tab navigation
            setModalVisible(true); // Show modal
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false); // Close modal
        router.push('./dashboard'); // Navigate to dashboard
    };

    return (
        <>
            <Tabs
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'dashboard') iconName = 'home';
                        else if (route.name === 'addTransaction') iconName = 'pluscircle';
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#FFFFFF',
                    tabBarInactiveTintColor: '#AAAAAA',
                    tabBarStyle: styles.tabBar,
                    tabBarShowLabel: false,
                    headerShown: false,
                })}
                screenListeners={{
                    tabPress: (e) => handleTabPress(e, e.target?.split('-')[0]),
                }}
            >
                <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
                <Tabs.Screen
                    name="addTransaction"
                    options={{ title: 'Add Transaction' }}
                />
            </Tabs>

            <AddTransactionModal visible={modalVisible} onClose={handleCloseModal} />
        </>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#333333',
        borderTopWidth: 0,
        height: 60,
        paddingBottom: 5,
    },
});
