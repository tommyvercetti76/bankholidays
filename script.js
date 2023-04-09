// Load the Google API Client Library
gapi.load('client', init);

// Initialize the Google API Client Library
async function init() {
    await gapi.client.init({
        apiKey: 'AIzaSyCzouCHyuXKtq3f_iMDBRTmNZwNEt5Y5YY',
    });

    // Attach event listener to the form
    document.getElementById('country-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const countryCode = document.getElementById('country').value.toUpperCase();
        getHolidays(countryCode);
    });
}

// Fetch bank holidays and display them in a table
async function getHolidays(countryCode) {
    try {
        // Request bank holidays from Google Calendar API
        const response = await gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/en.${countryCode}%23holiday%40group.v.calendar.google.com/events`,
        });

        const holidays = response.result.items;
        displayHolidays(holidays);
    } catch (error) {
        if (error.status === 404) {
            displayError('Calendar not found for the entered country code. Please enter a valid country code.');
        } else {
            displayError('An error occurred while fetching holidays. Please try again later.');
        }
    }
}

// Display holidays in a table
function displayHolidays(holidays) {
    const calendarDiv = document.getElementById('calendar');
    let table = `<table class="table-responsive">
                    <tr>
                        <th>Date</th>
                        <th>Holiday</th>
                    </tr>`;
    holidays.forEach(holiday => {
        table += `<tr>
                    <td>${new Date(holiday.start.date).toLocaleDateString()}</td>
                    <td>${holiday.summary}</td>
                  </tr>`;
    });
    table += '</table>';
    calendarDiv.innerHTML = table;
}

// Display error message
function displayError(message) {
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = `<p class="alert alert-danger">${message}</p>`;
}
