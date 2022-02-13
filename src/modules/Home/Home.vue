<template>
  <b-card no-body class="home">
    <b-card-header>
      <div class="float-right">
        <b-button class="mr-1" variant="secondary" size="sm" @click="onCreateBlogClick">
          <i class="fas fa-plus"/>
          Create Blog
        </b-button>
      </div>
    </b-card-header>
    <b-card-body class="home-card-body">
      <view-spinner :show="loading"/>
      <no-content :show="!loading && !blogs.length"/>
      <div v-if="!loading && blogs.length" class="page-content">
        <b-card class="mt-3" no-body v-for="data in blogs" :key="`blog-${data.uuid}`">
          <b-card-body>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <router-link class="blog-linked-text" :to="{name: 'blog', params: {blogUuid: data.uuid}}"
                           :style="smallScreenStyles">
                {{ data.title }}
              </router-link>
              <div>
                <i class="fas fa-trash-alt text-danger blog-actions" @click="onDeleteBlogClick(data)"/>
                <i class="fas fa-pencil-alt text-info blog-actions mr-2" @click="onUpdateBlogClick(data)"/>
              </div>
            </div>
            <div class="d-flex align-items-end blog-body" @click="onBodyClick(data)">
              {{ truncateText(data.body) }}
            </div>
          </b-card-body>
          <b-card-footer>
            <span class="mt-0 float-right" :style="smallScreenStyles">
              <span class="user-name">
                {{ data.createdBy.lastName }}, {{ data.createdBy.firstName }}
              </span>
              &sdot;&nbsp;{{ data.createdAt | relativeDate }}
            </span>
          </b-card-footer>
        </b-card>
      </div>
    </b-card-body>
    <blog-modal/>
  </b-card>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import ViewSpinner from "../../core/components/view-spinner/view-spinner";
import NoContent from "../../core/components/no-content/NoContent";
import BlogModal from "../Blog/modals/BlogModal";
import {deleteBlog} from "../../store/modules/blog/actions";

const {mapState, mapActions} = createNamespacedHelpers('blog')
export default {
  name: "Home",
  components: {BlogModal, NoContent, ViewSpinner},
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    ...mapState(['blogs', 'loading']),
    isSmallScreen() {
      return this.windowWidth <= 480
    },
    smallScreenStyles() {
      return this.isSmallScreen ? {fontSize: '12px'} : {}
    },
    textMaxLength() {
      return this.isSmallScreen ? 150 : 300;
    }
  },
  methods: {
    ...mapActions(['getAllBlog', 'showBlogModal', 'deleteBlog']),
    onCreateBlogClick() {
      this.showBlogModal()
    },
    onUpdateBlogClick(params) {
      this.showBlogModal(params)
    },
    async onDeleteBlogClick(params) {
      const confirm = await this.$confirm('Are you sure you want to delete following blog?', 'Deleting Blog')
      if (confirm) {
        await this.deleteBlog(params.uuid);
      }
    },
    truncateText(content) {
      return content.length > this.textMaxLength ? content.slice(0, this.textMaxLength) + '...' : content;
    },
    onBodyClick(params) {
      this.$router.push({name: 'blog', params: {blogUuid: params.uuid}})
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
    this.getAllBlog()
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
}

.home-card-body {
  background: #E8E8E8;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.page-content {
  margin-left: 15%;
  margin-right: 15%;
  position: relative;
}

.blog-linked-text {
  color: #3333ff;
  text-decoration: none;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.user-name {
  color: #008BCA;
}

.blog-actions {
  cursor: pointer;
  float: right;
}

.blog-body {
  cursor: pointer;
}
</style>