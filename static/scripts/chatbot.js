// Function to send user message and display bot response
function sendMessage() {
    var userInput = document.getElementById('user-input');
    var userMessage = userInput.value.trim();

    if (userMessage === '') {
        return; // Do not send empty messages
    }

    // Append user message to conversation dialog
    var conversation = document.querySelector('.conversation');
    var userMessageNode = document.createElement('div');
    userMessageNode.classList.add('chat-message', 'user-message');
    userMessageNode.innerHTML = '<i class="fas fa-user"></i><span>' + userMessage + '</span>';
    conversation.appendChild(userMessageNode);

    // Show typing animation
    var typingNode = document.createElement('div');
    typingNode.classList.add('chat-message', 'bot-message', 'typing-animation');
    typingNode.innerHTML = '<i class="fas fa-robot"></i><span>Typing</span>';
    conversation.appendChild(typingNode);

    // Make an API call to the server to process user message and get bot response
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'user_message=' + encodeURIComponent(userMessage)
    })
    .then(response => response.json())
    .then(data => {
        // Remove typing animation
        var typingElement = conversation.querySelector('.typing-animation');
        if (typingElement) {
            typingElement.remove();
        }

        // Append bot response to conversation dialog
        var botMessageNode = document.createElement('div');
        botMessageNode.classList.add('chat-message', 'bot-message', 'animate__animated', 'animate__fadeIn');
        botMessageNode.innerHTML = '<i class="fas fa-robot"></i><span>' + data.bot_response + '</span>';
        conversation.appendChild(botMessageNode);
    })
    .catch(error => {
        console.log('Error:', error);
    });

    // Clear the input field
    userInput.value = '';
}

// Function to handle keydown event and submit message on Enter key press
function handleKeyDown(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
    }
}
