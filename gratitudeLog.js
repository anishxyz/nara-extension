document.addEventListener('DOMContentLoaded', () => {
    const logContainer = document.getElementById('log-container');

    if (logContainer) {
        // Retrieve gratitude entries from storage
        chrome.storage.local.get({ gratitudeEntries: [] }, (result) => {
            const entries = result.gratitudeEntries;

            // Clear the loading message
            logContainer.innerHTML = ''; 

            if (entries.length > 0) {
                // Sort entries by date (most recent first) if needed - assumes date format is sortable
                // entries.sort((a, b) => new Date(b.date) - new Date(a.date)); // Adjust date parsing if necessary

                entries.reverse().forEach(entry => { // Display most recent first
                    const entryDiv = document.createElement('div');
                    entryDiv.classList.add('log-entry');

                    const dateSpan = document.createElement('span');
                    dateSpan.classList.add('date');
                    dateSpan.textContent = entry.date;

                    const textP = document.createElement('p');
                    textP.classList.add('text');
                    textP.textContent = entry.text;

                    entryDiv.appendChild(dateSpan);
                    entryDiv.appendChild(textP);
                    logContainer.appendChild(entryDiv);
                });
            } else {
                logContainer.innerHTML = '<p>No gratitude entries saved yet. Start adding some!</p>';
            }
        });
    } else {
        console.error('Log container element not found.');
    }
});
