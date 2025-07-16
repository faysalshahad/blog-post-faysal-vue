<template>
  <div class="blog-card">
    <div class="blog-image-wrapper">
      <img :src="post.imageUrl" :alt="post.title" class="blog-image" />
    </div>
    <div class="blog-content">
      <div class="blog-header">
        <h2 class="blog-title">{{ post.title }}</h2>
        <button @click="$emit('delete', post.id)" class="delete-btn">
          Delete
        </button>
      </div>
      <p class="blog-body">{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  post: {
    type: Object,
    required: true,
  },
});

defineEmits(["delete"]);
</script>

<style scoped>
.blog-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex; /* Use flexbox for image and content alignment */
  align-items: flex-start; /* Align items to the top */
  gap: 20px; /* Space between image and text */
}

.blog-image-wrapper {
  flex-shrink: 0; /* Prevent image from shrinking */
  width: 150px; /* FIX: Ensure a fixed size for the image area */
  height: 150px; /* FIX: Ensure a fixed size for the image area */
  overflow: hidden; /* Hide anything outside the bounds */
  border-radius: 6px; /* Match desired corner radius */
  display: flex; /* Use flexbox to center content if image is smaller */
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* Background if image fails to load */
}

.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the area, cropping if necessary */
  display: block; /* Remove extra space below image */
}

.blog-content {
  flex-grow: 1; /* Allow content to take remaining space */
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px; /* Space between header and body */
}

.blog-title {
  font-size: 1.25rem;
  margin: 0; /* Remove default margins */
  color: #333;
  line-height: 1.3;
  flex-grow: 1; /* Allow title to take available space */
  padding-right: 15px; /* Space before delete button */
}

.delete-btn {
  background-color: #f44336; /* Red */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  white-space: nowrap; /* Prevent button text from wrapping */
  transition: background-color 0.2s ease;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.blog-body {
  color: #666;
  line-height: 1.6;
  margin: 0; /* Remove default margins */
}
</style>
