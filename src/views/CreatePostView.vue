<template>
  <div class="create-post-container">
    <div class="form-section">
      <h2 class="section-title">Add Blog</h2>
      <form @submit.prevent="submitPost">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="postData.title" required />
        </div>
        <div class="form-group">
          <label for="body">Body:</label>
          <textarea
            id="body"
            v-model="postData.body"
            rows="8"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="imageUrl">Image URL (Optional):</label>
          <input
            type="text"
            id="imageUrl"
            v-model="postData.imageUrlDirect"
            placeholder="Paste image URL here (e.g., from Imgur, Unsplash)"
          />
          <p class="help-text">
            Provide a direct image URL or upload a file below.
            <br />
            (Direct URLs persist, file uploads use a placeholder on refresh).
          </p>
        </div>

        <div class="form-group">
          <label for="banner">Upload Image (Optional):</label>
          <input
            type="file"
            id="banner"
            @change="handleFileChange"
            ref="fileInputRef"
          />
        </div>

        <div class="button-group">
          <button type="submit" class="submit-btn">Add Blog</button>
        </div>
      </form>
    </div>

    <div class="preview-section">
      <PostPreview :post="postData" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"; // Import 'watch'
import { useRouter } from "vue-router";
import { useBlogStore } from "../stores/blogStore";
import PostPreview from "../components/PostPreview.vue";

const blogStore = useBlogStore();
const router = useRouter();

const fileInputRef = ref(null); // Ref for the file input element

const postData = ref({
  title: "",
  body: "",
  imageUrl: "https://via.placeholder.com/150", // This is the URL for the LIVE PREVIEW
  imageUrlDirect: "", // This is the user's typed/pasted URL (persists)
  uploadedFile: null, // This temporarily stores the file object for blob URL creation
});

// WATCHER: Update the live preview image when imageUrlDirect changes
watch(
  () => postData.value.imageUrlDirect,
  (newValue) => {
    if (newValue) {
      postData.value.imageUrl = newValue; // Use the direct URL for preview
      postData.value.uploadedFile = null; // Clear any previously uploaded file state
      if (fileInputRef.value) {
        // Clear the file input element itself
        fileInputRef.value.value = "";
      }
    } else {
      // If imageUrlDirect is cleared, and no file is uploaded, revert preview to default
      if (!postData.value.uploadedFile) {
        postData.value.imageUrl = "https://via.placeholder.com/150";
      }
    }
  }
);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    postData.value.uploadedFile = file; // Store the file itself
    postData.value.imageUrl = URL.createObjectURL(file); // Create temporary blob URL for PREVIEW
    postData.value.imageUrlDirect = ""; // Clear direct URL input if file is selected
  } else {
    postData.value.uploadedFile = null;
    // If file input is cleared, and no direct URL is present, revert preview to default
    if (!postData.value.imageUrlDirect) {
      postData.value.imageUrl = "https://via.placeholder.com/150";
    }
  }
};

const submitPost = async () => {
  let finalImageUrl = "https://via.placeholder.com/150"; // Default placeholder if neither is provided

  if (postData.value.imageUrlDirect) {
    // Priority 1: User provided a direct image URL (this will persist)
    finalImageUrl = postData.value.imageUrlDirect;
  } else if (postData.value.uploadedFile) {
    // Priority 2: User uploaded a file. Blob URLs are temporary,
    // so we use a persistent placeholder for the saved post.
    finalImageUrl =
      "https://via.placeholder.com/150/FF5733/FFFFFF?text=Uploaded+Image";
    // Optional: You could use a static image from your /public or /assets folder here:
    // finalImageUrl = '/your-project-path/assets/default-uploaded-image.png';
  }

  const newPost = {
    title: postData.value.title,
    body: postData.value.body,
    imageUrl: finalImageUrl, // Use the determined final image URL for saving
  };

  await blogStore.addPost(newPost);

  // Reset form after submission
  postData.value.title = "";
  postData.value.body = "";
  postData.value.imageUrl = "https://via.placeholder.com/150"; // Reset preview image to default
  postData.value.imageUrlDirect = ""; // Clear the direct URL input
  postData.value.uploadedFile = null; // Clear the uploaded file state
  if (fileInputRef.value) {
    // Clear the file input element itself
    fileInputRef.value.value = "";
  }

  router.push("/");
};
</script>

<style scoped>
/* Keep your existing styles. */
.create-post-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section,
.preview-section {
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.section-title {
  text-align: center;
  color: #555;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.help-text {
  font-size: 0.85em;
  color: #666;
  margin-top: 5px;
  line-height: 1.4;
}

.button-group {
  text-align: center;
}

.submit-btn {
  background-color: #4caf50; /* Green */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
