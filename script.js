// Load the Google API Client Library
gapi.load('client', init);

// Initialize the Google API Client Library
async function init() {
    await gapi.client.init({
        apiKey: 'AIzaSyCzouCHyuXKtq3f_iMDBRTmNZwNEt5Y5YY',
    });
    getHolidays();
}

// Fetch bank holidays and display them in a table
async function getHolidays() {
    // Get the user's country
    const countryCode = await getUserCountryCode();

    // Request bank holidays from Google Calendar API
    const response = await gapi.client.request({
        path: `https://www.googleapis.com/calendar/v3/calendars/en.${countryCode}%23holiday%40group.v.calendar.google.com/events`,
    });

    const holidays = response.result.items;
    displayHolidays(holidays);
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

// Get the user's country code
async function getUserCountryCode() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country_code;
    } catch (error) {
        console.error('Error fetching country code:', error);
        // Fallback to the US if there's an error fetching the country code
        return 'US';
    }
}
