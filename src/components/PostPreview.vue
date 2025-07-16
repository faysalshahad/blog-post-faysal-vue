<template>
  <div class="post-preview">
    <div class="preview-title-bar">
      <h2>Blog Preview</h2>
    </div>
    <div class="preview-content">
      <div class="preview-image-wrapper">
        <img :src="post.imageUrl" :alt="post.title" class="preview-image" />
      </div>
      <div class="preview-text">
        <h3 class="preview-post-title">
          {{ post.title || "Live Preview Title" }}
        </h3>
        <p class="preview-post-body">
          {{
            post.body ||
            "This is the live preview of your blog post. As you type in the form above, the content here will update automatically."
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.post-preview {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
}

.preview-title-bar {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.preview-title-bar h2 {
  font-size: 1.5rem;
  color: #333;
}

.preview-content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.preview-image-wrapper {
  flex-shrink: 0;
  width: 120px; /* Fixed size for preview image */
  height: 120px; /* Fixed size for preview image */
  overflow: hidden;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* Background if image fails to load */
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.preview-text {
  flex-grow: 1;
}

.preview-post-title {
  font-size: 1.2rem;
  margin: 0 0 10px;
  color: #333;
  line-height: 1.3;
}

.preview-post-body {
  color: #666;
  line-height: 1.6;
  margin: 0;
}
</style>
