import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

interface JoinScreenProps {
  onJoinGame: (gameCode: string) => Promise<boolean>;
}

const JoinScreen: React.FC<JoinScreenProps> = ({ onJoinGame }) => {
  const [gameCode, setGameCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = async () => {
    if (gameCode.length !== 4) {
      Alert.alert('Invalid Code', 'Game code must be 4 letters long.');
      return;
    }
    setIsLoading(true);
    const success = await onJoinGame(gameCode.toUpperCase());
    setIsLoading(false);
    if (!success) {
      Alert.alert('Error', 'Could not find a game with that code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join a Game</Text>
      <Text style={styles.instructions}>
        Enter the 4-letter code from the Codemaker to begin guessing.
      </Text>
      <TextInput
        style={styles.input}
        value={gameCode}
        onChangeText={setGameCode}
        placeholder="ABCD"
        maxLength={4}
        autoCapitalize="characters"
        autoCorrect={false}
      />
      <Button
        title={isLoading ? 'Joining...' : 'Join Game'}
        onPress={handleJoin}
        disabled={isLoading || gameCode.length !== 4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f9fc',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  instructions: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 5,
  },
});

export default JoinScreen;
