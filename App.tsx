import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import SetupScreen from './screens/SetupScreen';
import JoinScreen from './screens/JoinScreen';
import GuessingScreen from './screens/GuessingScreen';
import GameOverScreen from './screens/GameOverScreen';
import { checkGuess } from './utils/gameLogic';
import * as api from './utils/apiService';

type GamePhase = 'SETUP' | 'JOIN' | 'GUESSING' | 'GAME_OVER';

interface Guess {
  id: number;
  guess: number[];
  wellPlaced: number;
  misplaced: number;
}

const MAX_ATTEMPTS = 10;

export default function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('SETUP');
  const [secretCode, setSecretCode] = useState<number[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameCode, setGameCode] = useState<api.GameCode>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Clean up game if the app is closed
    return () => {
      if (gameCode) {
        api.deleteGame(gameCode);
      }
    };
  }, [gameCode]);

  const handleCodeSet = async (code: number[]) => {
    setIsLoading(true);
    const newGameCode = await api.createGame(code);
    setSecretCode(code); // In a real backend scenario, the client would not hold the secret code.
    setGameCode(newGameCode);
    setGamePhase('JOIN');
    setIsLoading(false);
  };

  const handleJoinGame = async (code: api.GameCode): Promise<boolean> => {
    setIsLoading(true);
    const success = await api.joinGame(code);
    if (success) {
      setGamePhase('GUESSING');
    }
    setIsLoading(false);
    return success;
  };

  const handleSubmitGuess = async (guess: number[]) => {
    // The candidate will replace this logic with a call to api.submitGuess
    // and use the result from the backend.
    const result = checkGuess(guess, secretCode);

    // Placeholder for the API call
    // const result = await api.submitGuess(gameCode, guess);

    const newGuess: Guess = {
      id: guesses.length + 1,
      guess,
      ...result,
    };
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);

    if (result.wellPlaced === 4 || newGuesses.length === MAX_ATTEMPTS) {
      setGamePhase('GAME_OVER');
    }
  };

  const handlePlayAgain = () => {
    if (gameCode) {
      api.deleteGame(gameCode);
    }
    setGamePhase('SETUP');
    setSecretCode([]);
    setGuesses([]);
    setGameCode('');
  };

  const renderScreen = () => {
    if (isLoading && gamePhase !== 'SETUP') {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    switch (gamePhase) {
      case 'SETUP':
        return <SetupScreen onCodeSet={handleCodeSet} isLoading={isLoading} />;
      case 'JOIN':
        return (
          <View style={styles.centered}>
            <Text style={styles.gameCodeText}>Your Game Code:</Text>
            <Text style={styles.gameCode} testID="game-code">{gameCode}</Text>
            <JoinScreen onJoinGame={handleJoinGame} />
          </View>
        );
      case 'GUESSING':
        return (
          <GuessingScreen
            guesses={guesses}
            maxAttempts={MAX_ATTEMPTS}
            onSubmitGuess={handleSubmitGuess}
          />
        );
      case 'GAME_OVER':
        const isVictory = guesses[guesses.length - 1]?.wellPlaced === 4;
        return (
          <GameOverScreen
            isVictory={isVictory}
            secretCode={secretCode}
            onPlayAgain={handlePlayAgain}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  content: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCodeText: {
    fontSize: 22,
    color: '#333',
    marginBottom: 10,
  },
  gameCode: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 5,
    marginBottom: 20,
  },
});
