/* © 2025 SIGNMitra Team: Dev Shah, Ayushi Soni, Maitriba Jadeja, Vishwa Joshi */
async function sendResetLink(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();

    if (email === "") {
        alert("Please enter your email.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/forgot-password", { // changed to port 5000, update if needed
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        let result = {};

        // Try to parse JSON only if content exists
        const text = await response.text();
        if (text) {
            result = JSON.parse(text);
        }

        if (response.ok) {
            alert("Password has been sent to your email.");
        } else {
            alert(result.message || "Failed to send reset link.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
}