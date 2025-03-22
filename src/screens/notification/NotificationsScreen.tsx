import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import commonStyles from '../../utils/commonStyles';

import { NavigationProp } from '@react-navigation/native';

const NotificationsScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      profilePicture: null, // No profile picture
      userName: 'John Doe',
      message: 'You have a new message. Please check it in the message tab.',
    },
    {
      id: '2',
      profilePicture: require('../../assets/icons/profile-placeholderUser.png'),
      userName: 'Jane Smith',
      message: 'You have a new message. Please check it in the message tab.',
    },
    // Add more notifications here
  ]);

  const [messages, setMessages] = useState([
    {
      id: '1',
      profilePicture: require('../../assets/icons/profile-placeholderUser.png'),
      userName: 'John Doe',
      message: 'Hello! How are you?',
    },
    {
      id: '2',
      profilePicture: require('../../assets/icons/profile-placeholderUser.png'),
      userName: 'Jane Smith',
      message: 'Can we schedule a meeting?',
    },
    // Add more messages here
  ]);

  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);

  const saveNotification = async (notification) => {
    try {
      const response = await fetch('http://localhost:3000/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });
      if (!response.ok) {
        throw new Error('Failed to save notification');
      }
      const savedNotification = await response.json();
      setNotifications([...notifications, savedNotification]);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const saveMessage = async (message) => {
    try {
      const response = await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      if (!response.ok) {
        throw new Error('Failed to save message');
      }
      const savedMessage = await response.json();
      setMessages([...messages, savedMessage]);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const toggleSelectNotification = (id) => {
    setSelectedNotifications((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((notificationId) => notificationId !== id)
        : [...prevSelected, id]
    );
  };

  const toggleSelectMessage = (id) => {
    setSelectedMessages((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((messageId) => messageId !== id)
        : [...prevSelected, id]
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete the selected items? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            if (activeTab === 'notifications') {
              deleteNotifications();
            } else {
              deleteMessages();
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const deleteNotifications = async () => {
    try {
      await Promise.all(
        selectedNotifications.map(async (id) => {
          const response = await fetch(`http://localhost:3000/api/notifications/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete notification');
          }
        })
      );
      setNotifications(notifications.filter((notification) => !selectedNotifications.includes(notification.id)));
      setSelectedNotifications([]);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const deleteMessages = async () => {
    try {
      await Promise.all(
        selectedMessages.map(async (id) => {
          const response = await fetch(`http://localhost:3000/api/messages/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete message');
          }
        })
      );
      setMessages(messages.filter((message) => !selectedMessages.includes(message.id)));
      setSelectedMessages([]);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleSelectNotification(item.id)}>
      <View style={[styles.notificationItem, selectedNotifications.includes(item.id) && styles.selectedItem]}>
        <Image
          source={item.profilePicture ? { uri: item.profilePicture } : require('../../assets/icons/profile-placeholderUser.png')}
          style={styles.profilePicture}
        />
        <View style={styles.notificationTextContainer}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleSelectMessage(item.id)}>
      <View style={[styles.notificationItem, selectedMessages.includes(item.id) && styles.selectedItem]}>
        <Image
          source={item.profilePicture ? { uri: item.profilePicture } : require('../../assets/icons/profile-placeholderUser.png')}
          style={styles.profilePicture}
        />
        <View style={styles.notificationTextContainer}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={commonStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../../assets/icons/back.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
          <Image source={require('../../assets/icons/delete.png')} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'notifications' && styles.activeTabButton]} onPress={() => setActiveTab('notifications')}>
          <Text style={styles.tabText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'messages' && styles.activeTabButton]} onPress={() => setActiveTab('messages')}>
          <Text style={styles.tabText}>Messages</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'notifications' ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotificationItem}
        />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  backButton: {
    marginLeft: 10,
  },
  deleteButton: {
    marginRight: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  activeTabButton: {
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#e0e0e0',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationsScreen;