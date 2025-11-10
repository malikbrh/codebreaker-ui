# Code Breaker MVP

This is a React Native (Expo) implementation of the classic "Code Breaker" game, refactored to support a client-server architecture. It's a 2-player game where one player sets a secret code and the other tries to guess it within a limited number of attempts.

## Features

-   **Backend Ready**: The application is structured to easily integrate with a backend service. It includes a mock API service with placeholder functions for creating, joining, and playing the game.
-   **Game Codes**: The game now uses a 4-letter game code to allow players to join a specific game session.
-   **Secret Code**: A 4-digit code using numbers from 1 to 9. Duplicates are allowed.
-   **Limited Attempts**: The guesser has 10 attempts to crack the code.
-   **Detailed Feedback**: For each guess, the game provides feedback on the number of "Well Placed" and "Misplaced" digits.
-   **State-Driven UI**: The game flow is managed by a central state machine, ensuring a clean and predictable user experience.
-   **Cross-Platform**: Built with Expo, allowing it to run on web, Android, and iOS.

## Project Structure

The project is organized into the following directories:

-   `/assets`: Contains static assets like images and fonts.
-   `/components`: Reusable React Native components used across different screens.
-   `/screens`: The main screens of the application, each corresponding to a specific game phase.
-   `/utils`: Utility functions, including the core game logic and the mock API service.

## Component Usage

### `App.tsx`

This is the main component of the application. It manages the game's state, including the `gamePhase`, `secretCode`, `guesses`, and `gameCode`. It's responsible for rendering the correct screen based on the current `gamePhase`.

### Screens

-   **`SetupScreen.tsx`**: The initial screen where the Codemaker sets the 4-digit secret code.
-   **`JoinScreen.tsx`**: A screen that displays the generated game code and allows the Guesser to join the game.
-   **`GuessingScreen.tsx`**: The main game screen where the Guesser submits their guesses and views the history of their attempts.
-   **`GameOverScreen.tsx`**: The final screen that displays whether the Guesser won or lost, reveals the secret code, and provides an option to play again.

### Components

-   **`GuessInput.tsx`**: A reusable component that provides a 4-slot input for the code and a number pad for entering digits. It's used in both the `SetupScreen` and `GuessingScreen`.
-   **`GuessHistory.tsx`**: A component that displays a list of the Guesser's previous attempts and the feedback for each guess.

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
npm install
```

## Running the Application

You can run the application on web, Android, or iOS using the following commands:

-   **Web**: `npm run web`
-   **Android**: `npm run android`
-   **iOS**: `npm run ios`

The application will start in development mode with hot-reloading enabled.
