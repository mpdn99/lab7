import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, YellowBox } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from './Fire';

export default function App() {
  const [messages, setMessages] = useState();

  useEffect(() => {
    Fire.shared.on(message => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, message))
    })
    return () => {
      Fire.shared.off()
    }
  }, [Fire.shared.parse._id])

  return (
    <KeyboardAvoidingView style={styles.container} >
      <GiftedChat
        messages={messages}
        onSend={Fire.shared.send}
        user={{
          name:"Donald Trump",
        }}
      />
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    color: 'red',
    flex: 1
  }
});
