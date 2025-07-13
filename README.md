Pac-Man CloneA simple Pac-Man game created with HTML5 Canvas and vanilla JavaScript. Navigate the maze, eat all the dots, and avoid the ghosts!Screenshots(You can replace the placeholder URL above with an actual screenshot of your game once you have one.)How to PlayThe objective of the game is to clear each level by eating all the dots in the maze while avoiding the ghosts.Move Pac-Man: Use the Arrow Keys (ArrowUp, ArrowDown, ArrowLeft, ArrowRight) to change Pac-Man's direction.Objective: Eat all the green dots on the screen to advance to the next level.Avoid Ghosts: If a ghost touches you, you will lose a life.Game Over: The game ends when you run out of lives.Restart: When the "Game Over" message appears, press the 'R' key to restart the game.Getting StartedThis project is designed to be run directly in a web browser. No complex setup or dependencies are required.PrerequisitesA modern web browser (e.g., Chrome, Firefox, Safari, Edge).Running the GameClone or Download the Repository:Get a local copy of the project files.Create the HTML file:In the same directory as the PacmanGame.js file, create a new file named index.html and add the following content:<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pac-Man</title>
    <style>
        body {
            background-color: #000;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: 'Press Start 2P', cursive; /* A classic arcade font */
        }
        canvas {
            border: 2px solid #fff;
            background-color: #000;
        }
    </style>
    <!-- Optional: Add a retro font -->
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</head>
<body>
  <script src="PacmanGame.js"></script>
</body>
</html>
Open in Browser:Open the index.html file in your web browser. The game should start automatically.FeaturesClassic Maze Gameplay: Navigate a predefined maze layout.Player Control: Smooth, grid-based player movement.Ghost AI:Random Ghost: Moves in random directions.Chase Ghost: Actively pursues the player.Scoring System: Gain points for eating dots and clearing levels.Multiple Lives & Levels: Start with three lives and progress through increasingly challenging levels.Game Over & Restart: Clear "Game Over" state with a simple key press to play again.Future ImprovementsThis is a basic implementation with lots of room for new features. Here are a few ideas:Power-Pellets: Add larger dots that, when eaten, allow Pac-Man to eat the ghosts for a short time.Frightened Ghost State: Implement behavior for ghosts when a power-pellet is active (e.g., they turn blue and run away).Fruit Bonuses: Add bonus items (cherries, strawberries) that appear for a limited time for extra points.Sound Effects: Add sounds for eating dots, player death, and level start.High Score: Implement a system to save and display the high score using localStorage.More Ghost AI: Create more complex ghost behaviors (e.g., patrol, ambush).Start Screen & UI Improvements: Add a main menu and improve the in-game HUD.
