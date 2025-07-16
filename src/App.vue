<template>
  <header>
    <nav class="navbar">
      <div class="navbar-content">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/add-blog" class="nav-link">Add Blog</router-link>
      </div>
    </nav>
  </header>
  <main class="container">
    <router-view />
  </main>
</template>

<style>
/* Define your custom color variables for easier management */
:root {
  --navbar-bg-color: #555; /* Slightly darker grey for navbar background */
  --nav-link-inactive-text-color: #4caf50; /* Green text for inactive links */
  --nav-link-active-bg-color: #4caf50; /* Green background for active/hover */
  --nav-link-active-text-color: white; /* White text for active/hover */
}

header {
  width: 100%; /* Ensure header spans full width */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar {
  background-color: var(
    --navbar-bg-color
  ); /* FIX: Dark grey background for the navbar */
  padding: 15px 0; /* Adjusted padding */
  display: flex;
  justify-content: center; /* Center the content within the navbar */
}

.navbar-content {
  display: flex;
  gap: 15px;
  max-width: 960px; /* Constrain content width similar to the main container */
  width: 100%; /* Allow it to take full width within max-width */
  justify-content: center; /* Center links within this content wrapper */
}

.nav-link {
  text-decoration: none;
  color: var(
    --nav-link-inactive-text-color
  ); /* FIX: Green text for inactive links */
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* FIX: Styles for when a nav link is hovered */
.nav-link:hover {
  background-color: var(
    --nav-link-active-bg-color
  ); /* Green background on hover */
  color: var(--nav-link-active-text-color); /* White text on hover */
}

/* FIX: Styles for the currently active nav link */
.nav-link.router-link-active {
  background-color: var(
    --nav-link-active-bg-color
  ); /* Green background when active */
  color: var(--nav-link-active-text-color); /* White text when active */
}

/* Ensure any previous specific .add-blog-btn background is overridden by these new rules */
/* (You can remove the .nav-link.add-blog-btn style from previous code if it still exists) */

.container {
  max-width: 960px;
  margin: 20px auto; /* This centers the container horizontally */
  padding: 0 15px;
}
</style>
