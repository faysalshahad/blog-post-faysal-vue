// stores/blogStore.js
import { defineStore } from "pinia";
import axios from "axios";

// The fake API base URL (can still be used for initial fetch if localStorage is empty)
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
  }),
  actions: {
    // --- NEW: Load from localStorage on initialization ---
    initializePosts() {
      try {
        const storedPosts = localStorage.getItem("blogPosts");
        if (storedPosts) {
          this.posts = JSON.parse(storedPosts);
          // Ensure IDs are numbers (localStorage stores strings) and handle max ID for new posts
          this.posts.forEach((post) => {
            post.id = Number(post.id);
          });
        } else {
          // If no posts in local storage, fetch initial set from the fake API
          this.fetchInitialPostsFromAPI();
        }
      } catch (e) {
        console.error("Error initializing posts from local storage:", e);
        this.posts = []; // Fallback to empty if localStorage is corrupted
        this.fetchInitialPostsFromAPI(); // Attempt to fetch from API as a fallback
      }
    },

    // --- NEW: Save to localStorage after any modification ---
    savePostsToLocalStorage() {
      try {
        localStorage.setItem("blogPosts", JSON.stringify(this.posts));
      } catch (e) {
        console.error("Error saving posts to local storage:", e);
      }
    },

    // --- Modified: Initial fetch from API (only if localStorage is empty) ---
    async fetchInitialPostsFromAPI() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_BASE_URL}/posts?_limit=10`); // Fetch a limited number
        this.posts = response.data.map((post) => ({
          id: post.id,
          title: post.title,
          body: post.body,
          // Use a static placeholder image for API-fetched posts if they don't have one
          imageUrl: `https://via.placeholder.com/150/007bff/ffffff?text=API+Post+${post.id}`,
        }));
        this.savePostsToLocalStorage(); // Save initial fetched posts to local storage
      } catch (error) {
        this.error = "Failed to fetch initial posts from API.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    // --- Modified: Add post logic for localStorage ---
    async addPost(newPost) {
      this.loading = true;
      this.error = null;
      try {
        // Generate a unique client-side ID
        const newId =
          this.posts.length > 0
            ? Math.max(...this.posts.map((p) => p.id)) + 1
            : 1;

        const postToAdd = {
          ...newPost,
          id: newId,
          // IMPORTANT: URL.createObjectURL is temporary. For persistence,
          // you need a static URL or Base64 for the image.
          // Here, we'll revert to a placeholder for persistence.
          imageUrl:
            newPost.imageUrl && newPost.imageUrl.startsWith("blob:")
              ? `https://via.placeholder.com/150/FFA500/FFFFFF?text=New+Post+${newId}` // Placeholder for new posts
              : newPost.imageUrl, // Keep if it was already a static URL
        };

        // Add to the beginning of the array for better visibility
        this.posts.unshift(postToAdd);
        this.savePostsToLocalStorage(); // Save updated array to local storage

        // You can still make a POST request to the fake API if required
        // for assignment demonstration, but its response won't affect persistence.
        // await axios.post(`${API_BASE_URL}/posts`, postToAdd);
      } catch (error) {
        this.error = "Failed to add post.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    // --- Modified: Delete post logic for localStorage ---
    async deletePost(postId) {
      this.loading = true;
      this.error = null;
      try {
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.savePostsToLocalStorage(); // Save updated array to local storage

        // You can still make a DELETE request to the fake API
        // await axios.delete(`${API_BASE_URL}/posts/${postId}`);
      } catch (error) {
        this.error = "Failed to delete post.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // You would also need an updatePost action if you have an edit feature
  },
});
