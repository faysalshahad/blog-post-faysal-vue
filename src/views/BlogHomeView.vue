<template>
  <div>
    <h1 class="page-title">Blog Posts</h1>
    <div v-if="paginatedPosts.length === 0" class="empty-message">
      No posts to display. Add a new blog post!
    </div>
    <div v-else class="posts-list">
      <BlogCard
        v-for="post in paginatedPosts"
        :key="post.id"
        :post="post"
        @delete="handleDeletePost"
      />
    </div>

    <div class="pagination">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        Previous
      </button>
      <span v-for="page in totalPages" :key="page">
        <button
          @click="changePage(page)"
          :class="{ active: currentPage === page }"
          class="pagination-btn page-number-btn"
        >
          {{ page }}
        </button>
      </span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useBlogStore } from "../stores/blogStore";
import BlogCard from "../components/BlogCard.vue";

const blogStore = useBlogStore();
const currentPage = ref(1);
const postsPerPage = 5;

const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  return blogStore.posts.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(blogStore.posts.length / postsPerPage);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const handleDeletePost = (postId) => {
  if (confirm("Are you sure you want to delete this post?")) {
    blogStore.deletePost(postId);
    // If current page becomes empty after delete, go to previous page
    if (paginatedPosts.value.length === 0 && currentPage.value > 1) {
      changePage(currentPage.value - 1);
    }
  }
};

onMounted(() => {
  // blogStore.fetchPosts();
  blogStore.initializePosts();
});
</script>

<style scoped>
/* FIX: Center the page title */
.page-title {
  text-align: center;
  color: #555;
  margin-bottom: 20px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.empty-message {
  text-align: center;
  margin-top: 50px;
  color: #888;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
}

.pagination-btn {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.page-number-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
