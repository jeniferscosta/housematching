import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import commonStyles from '../../utils/commonStyles';

const MessageChat = ({ navigation, route }) => {
  const { userName, profilePicture, userId } = route.params;
  const [status, setStatus] = useState('offline'); // Default status
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch user status and messages from the backend
    const fetchUserStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}/status`);
        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching user status:', error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/messages/${userId}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchUserStatus();
    fetchMessages();
  }, [userId]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, message: newMessage }),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      const sentMessage = await response.json();
      setMessages([...messages, sentMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.messageTimestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('NotificationsScreen')}>
          <Image source={require('../../assets/icons/back.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Image source={profilePicture ? { uri: profilePicture } : require('../../assets/icons/profile-placeholderUser.png')} style={styles.profilePicture} />
          <View>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userStatus}>{status}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderMessageItem}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  backButton: {
    marginLeft: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userStatus: {
    fontSize: 14,
    color: '#666',
  },
  messageList: {
    flex: 1,
  },
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#F5F4F8', // Added background color
    borderRadius: 10, // Optional: Add border radius for rounded corners
    marginVertical: 5, // Optional: Add margin for spacing between messages
  },
  messageText: {
    fontSize: 14,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MessageChat;