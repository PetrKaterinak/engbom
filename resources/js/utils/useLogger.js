let lastMessage = '';   // To store the last logged message
let lastMessageCount = 0;  // To count how many times the last message was logged consecutively

export default function log(...args) {
    const message = args.join(' '); // Create a string representation of the log arguments

    if (import.meta.env.VITE_APP_ENV === 'local') {
        if (message === lastMessage) {
            // Increment the count for the same consecutive message
            lastMessageCount++;
        } else {
            // Log the previous message with its count if it appeared multiple times
            if (lastMessageCount > 1) {
                console.log(`${lastMessage} (${lastMessageCount}x)`);
            }

            // Log the new message and reset the count
            console.log(message);
            lastMessage = message;
            lastMessageCount = 1;  // Reset the count for the new message
        }
    }
}