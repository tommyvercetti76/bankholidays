
async function init() {

    document.getElementById('country-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const countryName = document.getElementById('country').value.trim();
        const countryCode = CountryList.getCode(countryName);
    
        if (countryCode) {
            getHolidays(countryCode);
        } else {
            displayError('Invalid country name. Please enter a valid country name.');
        }
    }); 
}


async function getHolidays(countryCode) {
    const apiKey = '58bd74fcaee84f307354b7b15633618b126c6801';
    const year = new Date().getFullYear();

    try {
        const response = await fetch(
            `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${countryCode}&year=${year}&type=national`
        );
        const data = await response.json();

        if (data.response.holidays.length === 0) {
            displayError('No holidays found for the entered country code. Please enter a valid country code.');
        } else {
            displayHolidays(data.response.holidays);
        }
    } catch (error) {
        displayError('An error occurred while fetching holidays. Please try again later.');
    }
}

function displayHolidays(holidays) {
    const calendarDiv = document.getElementById('calendar');
    let table = `<table class="table-responsive">
                    <tr>
                        <th>Date</th>
                        <th>Holiday</th>
                    </tr>`;
    holidays.forEach(holiday => {
        table += `<tr>
                    <td>${new Date(holiday.date.iso).toLocaleDateString()}</td>
                    <td>${holiday.name}</td>
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
