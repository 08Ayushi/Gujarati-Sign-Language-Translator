/* © 2025 SIGNMitra Team: Dev Shah, Ayushi Soni, Maitriba Jadeja, Vishwa Joshi */
// Toggle visibility between login and signup forms
document.getElementById("loginBtn").addEventListener("click", () => toggleForm("login"));
document.getElementById("signupBtn").addEventListener("click", () => toggleForm("signup"));

function toggleForm(type) {
    if (type === "login") {
        document.getElementById("loginForm").style.display = "flex";
        document.getElementById("signupForm").style.display = "none";
        document.getElementById("loginBtn").classList.add("active");
        document.getElementById("signupBtn").classList.remove("active");
        document.getElementById("formTitle").textContent = "Sign In";
        document.getElementById("formSubtitle").textContent = "Access your SignMitra account";
    } else {
        document.getElementById("signupForm").style.display = "flex";
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("signupBtn").classList.add("active");
        document.getElementById("loginBtn").classList.remove("active");
        document.getElementById("formTitle").textContent = "Create Account";
        document.getElementById("formSubtitle").textContent = "Join SignMitra today";
    }
}

// Show/Hide password toggles
document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
        icon.textContent = input.type === "password" ? "👁️" : "🙈";
    });
});

// Reset validation messages
function resetValidation(formId) {
    document.querySelectorAll(`#${formId} .validation-message`).forEach(msg => {
        msg.textContent = "";
        msg.style.display = "none";
    });
    document.getElementById(`${formId}Success`).style.display = 'none';
}

// LOGIN
document.getElementById("loginSubmitBtn").addEventListener("click", async () => {
    resetValidation("login");

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const remember = document.getElementById("remember").checked;

    try {
        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            // grab the returned user
            const user = data.user;
          
            // remember‐me logic…
            if (remember) localStorage.setItem("user", JSON.stringify(user));
            else localStorage.removeItem("user");
          
            document.getElementById("loginSuccess").style.display = "block";
          
            setTimeout(() => {
              // ⬇️ NEW: send admins to admin.html
              if (user.role === "admin") {
                window.location.href = "admin.html";
              } else {
                window.location.href = "home.html";
              }
            }, 1500);
          }
          else if (res.status === 404) {
            console.log("❌ User not found. Redirecting to Signup...");
            toggleForm("signup");
        } else {
            console.log("❌ Login failed:", data.message);
            document.getElementById("loginPasswordError").textContent = data.message;
            document.getElementById("loginPasswordError").style.display = "block";
        }
    } catch (err) {
        console.log("💥 Server error:", err.message);
    }
});

// SIGNUP
document.getElementById("signupSubmitBtn").addEventListener("click", async () => {
    resetValidation("signup");

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    try {
        const res = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (res.ok) {
            console.log("✅ User registered:", email);
            document.getElementById("signupSuccess").style.display = "block";
            setTimeout(() => {
                toggleForm("login");
                document.getElementById("loginEmail").value = email;
            }, 1500);
        } else if (res.status === 409) {
            console.log("⚠️ User already exists:", email);
            toggleForm("login");
        } else {
            console.log("❌ Signup failed:", data.message);
            document.getElementById("signupEmailError").textContent = data.message;
            document.getElementById("signupEmailError").style.display = "block";
        }
    } catch (err) {
        console.log("💥 Server error:", err.message);
    }
});
// ✔️ absolute to your current host/origin
fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  