const quotes = [
    "The secret of getting ahead is getting started. – Mark Twain",
    "It always seems impossible until it's done. – Nelson Mandela",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "The future depends on what we do in the present. – Mahatma Gandhi",
    "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
    "The best time to plant a tree was 20 years ago. The second best time is now. – Chinese Proverb",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "You don't have to be great to start, but you have to start to be great. – Zig Ziglar",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "The harder you work for something, the greater you'll feel when you achieve it. – Unknown"
  ];
  
  // Function to select a random quote from the array
  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  
  // Function to start the game and set up the quote
  function startGame() {
    const quoteElement = document.getElementById('quote');
    const button = document.getElementById('start-btn');
    const textarea = document.getElementById('textarea');
    
    // Change the quote each time the game is started
    quoteElement.textContent = getRandomQuote();
    
    // Reset the game state (clear the text area and results)
    textarea.disabled = false;
    textarea.value = '';
    textarea.focus();
    button.disabled = false;
  
    // Reset the results
    document.getElementById('results').style.display = 'block'; // Make sure the results section is visible
    document.getElementById('time').textContent = '0';
    document.getElementById('words').textContent = '0';
    document.getElementById('speed').textContent = '0';
    
    // Start the timer
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000); // Update every second
  }
  
  // Add event listener to start button
  document.getElementById('start-btn').addEventListener('click', startGame);
  
  // Function to handle typing logic
  document.getElementById('textarea').addEventListener('input', function() {
    const quote = document.getElementById('quote').textContent;
    const userInput = this.value;
    
    // Update the time, words, and speed
    updateTypingStats(userInput);
  
    // Check if user input matches the quote
    if (userInput === quote) {
      clearInterval(timerInterval); // Stop the timer
      const timeTaken = (new Date() - startTime) / 1000;
      const wordsPerMinute = (userInput.split(' ').length / timeTaken) * 60;
      
      document.getElementById('results').innerHTML = `
        <p>Time Taken: <span>${timeTaken.toFixed(2)} seconds</span></p>
        <p>Words Per Minute: <span>${wordsPerMinute.toFixed(2)}</span></p>
      `;
      
      this.disabled = true;
      document.getElementById('start-btn').disabled = false;
    }
  });
  
  let startTime;
  let timerInterval;
  
  // Function to update the time, words, and speed
  function updateTypingStats(userInput) {
    const timeElapsed = (new Date() - startTime) / 1000;
    const wordCount = userInput.trim().split(/\s+/).length;
    const wpm = Math.round((wordCount / timeElapsed) * 60);
    
    document.getElementById('time').textContent = timeElapsed.toFixed(2);
    document.getElementById('words').textContent = wordCount;
    document.getElementById('speed').textContent = wpm;
  }
  