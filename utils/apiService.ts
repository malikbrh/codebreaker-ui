// A 4-letter code, e.g., "ABCD"
export type GameCode = string;

// The 4-digit secret code
export type SecretCode = number[];

// The result of a guess
export interface GuessResult {
  wellPlaced: number;
  misplaced: number;
}

// Generates a random 4-letter game code
const generateGameCode = (): GameCode => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

/**
 * Simulates creating a new game on the backend.
 * In a real implementation, this would make an HTTP POST request.
 * @param secretCode The secret code set by the Codemaker.
 * @returns A promise that resolves to the unique 4-letter game code.
 */
export const createGame = async (secretCode: SecretCode): Promise<GameCode> => {
  console.log(`API: Creating game with secret code: ${secretCode.join('')}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const gameCode = generateGameCode();
      console.log(`API: Game created with code: ${gameCode}`);
      // Here you would store the secretCode on the backend, associated with the gameCode
      resolve(gameCode);
    }, 500); // Simulate network delay
  });
};

/**
 * Simulates joining an existing game.
 * In a real implementation, this would make an HTTP POST request.
 * @param gameCode The 4-letter code to join.
 * @returns A promise that resolves to true if the game exists, false otherwise.
 */
export const joinGame = async (gameCode: GameCode): Promise<boolean> => {
  console.log(`API: Attempting to join game with code: ${gameCode}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate checking if the game code is valid on the backend
      const gameExists = true; // Assume the code is always valid for now
      console.log(`API: Game join status for ${gameCode}: ${gameExists}`);
      resolve(gameExists);
    }, 500);
  });
};

/**
 * Simulates submitting a guess to the backend for evaluation.
 * In a real implementation, this would make an HTTP POST request.
 * @param gameCode The game's unique code.
 * @param guess The 4-digit guess.
 * @returns A promise that resolves to the guess result.
 */
export const submitGuess = async (gameCode: GameCode, guess: SecretCode): Promise<GuessResult> => {
  console.log(`API: Submitting guess ${guess.join('')} for game ${gameCode}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real backend, you would fetch the secret code for the gameCode
      // and run the checkGuess logic there.
      // For now, we'll just return a mock result.
      const result: GuessResult = { wellPlaced: 1, misplaced: 1 };
      console.log(`API: Guess result for ${gameCode}:`, result);
      resolve(result);
    }, 500);
  });
};

/**
 * Simulates deleting a game from the backend.
 * In a real implementation, this would make an HTTP DELETE request.
 * @param gameCode The game's unique code.
 */
export const deleteGame = async (gameCode: GameCode): Promise<void> => {
  console.log(`API: Deleting game ${gameCode}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`API: Game ${gameCode} deleted.`);
      resolve();
    }, 500);
  });
};
