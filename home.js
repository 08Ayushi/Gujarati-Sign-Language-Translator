/* © 2025 SIGNMitra Team: Dev Shah, Ayushi Soni, Maitriba Jadeja, Vishwa Joshi */
// Basic Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const profileContainer = document.getElementById("profileContainer");
    const dropdown = document.getElementById("profileDropdown");
  
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (storedUser && storedUser.name) {
      // ✅ User is logged in → show circle with first letter
      const profile = document.createElement("div");
      profile.className = "profile-circle";
      profile.id = "profileCircle";
      profile.textContent = storedUser.name.charAt(0).toUpperCase();
      profileContainer.appendChild(profile);
  
      profile.addEventListener("click", () => {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      });
  
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".profile-wrapper")) {
          dropdown.style.display = "none";
        }
      });
  
      document.getElementById("userData").addEventListener("click", () => {
        alert(`Logged in as: ${storedUser.name} (${storedUser.email})`);
      });
  
      document.getElementById("userSettings").addEventListener("click", () => {
        alert("Settings page coming soon...");
      });
  
      document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "login.html";
      });
  
    } else {
      // ❌ User not logged in → show “Signup” button
      const signupBtn = document.createElement("button");
      signupBtn.className = "signup-btn";
      signupBtn.textContent = "Signup";
      signupBtn.addEventListener("click", () => {
        window.location.href = "login.html"; // Redirect to login/signup page
      });
      profileContainer.appendChild(signupBtn);
    }
  });
  