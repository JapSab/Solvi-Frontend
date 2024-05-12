function getAuthToken() {
    const url = "https://accounts.livechat.com/v2/customer/token";
    const data = {
        grant_type: "cookies",
        client_id: "90985e7afa7445d9aa311e421a4c81f4",
        response_type: "token",
        organization_id: "b9f9c250-9782-48b0-9ad8-ea544af4a30d"
    };

    fetch(url, {
        method: 'POST', // Specify the method
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Specify the content type
        },
        body: new URLSearchParams(data) // Convert the data object into URL-encoded format
    })
    .then(response => response.json()) // Parse JSON response
    .then(data => console.log(data)) // Log data to the console
    .catch(error => console.error('Error:', error)); // Log any errors
}

// Call the function when needed
getAuthToken();
