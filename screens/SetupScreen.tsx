import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import GuessInput from '../components/GuessInput';

interface SetupScreenProps {
  onCodeSet: (code: number[]) => Promise<void>;
  isLoading: boolean;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onCodeSet, isLoading }) => {
  const [code, setCode] = React.useState<(number | null)[]>([null, null, null, null]);

  const isCodeComplete = code.every((digit) => digit !== null);

  const handleSetCode = () => {
    if (isCodeComplete) {
      onCodeSet(code as number[]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Codemaker: Set Your Secret Code</Text>
      <Text style={styles.instructions}>
        Enter a 4-digit code using numbers 1-9.
      </Text>
      <GuessInput code={code} onCodeChange={setCode} />
      <Button
        title={isLoading ? 'Creating Game...' : 'Set Secret Code'}
        onPress={handleSetCode}
        disabled={!isCodeComplete || isLoading}
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
    textAlign: 'center',
  },
  instructions: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});

export default SetupScreen;
