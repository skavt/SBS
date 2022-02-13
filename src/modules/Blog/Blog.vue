<template>
  <b-card no-body class="blog-card">
    <b-card-header>
      <div class="d-flex justify-content-between align-items-center">
        <b-button variant="light" class="mr-3" @click="$router.push({name: 'home'})">
          <i class="fas fa-chevron-left"/>
          Back
        </b-button>
        <b-dropdown v-if="isSmallScreen" no-caret variant="link">
          <template slot="button-content">
            <i class="fas fa-ellipsis-v"/>
          </template>
          <b-dropdown-item>
            <b-dropdown-item @click="onUpdateBlogClick" href="#">
              <div class="d-flex justify-content-between align-items-center">
                Edit
                <i class="fas fa-pencil-alt text-info"/>
              </div>
            </b-dropdown-item>
            <b-dropdown-item @click="onDeleteBlogClick" href="#">
              <div class="d-flex justify-content-between align-items-center">
                Delete
                <i class="fas fa-trash-alt text-danger"/>
              </div>
            </b-dropdown-item>
          </b-dropdown-item>
        </b-dropdown>
        <div v-else>
          <b-button class="mr-1" variant="outline-info" size="sm" @click="onUpdateBlogClick">
            <i class="fas fa-pencil-alt"/>
            Edit
          </b-button>
          <b-button class="mr-1" variant="danger" size="sm" @click="onDeleteBlogClick">
            <i class="fas fa-trash-alt"/>
            Delete
          </b-button>
        </div>
      </div>
    </b-card-header>
    <b-card-body class="blog-card-body">
      <view-spinner :show="loading"/>
      <div v-if="!loading && Object.keys(currentBlog).length" class="page-content">
        <b-card class="mt-3" no-body>
          <b-card-body>
            <b-media class="align-items-center pb-3">
              <template v-slot:aside>
                <b-img rounded="circle" :src="currentBlog.createdBy.imageUrl  || '/assets/avatar.svg'" width="48"
                       height="48">
                </b-img>
              </template>
              <h5 v-if="isSmallScreen" class="mt-0" :style="smallScreenStyles">
                <span class="user-name">
                  {{ currentBlog.createdBy.lastName }}, {{ currentBlog.createdBy.firstName }}
                </span>
                <br/>
                {{ currentBlog.updatedAt | relativeDate }}
              </h5>
              <h5 v-else class="mt-0" :style="smallScreenStyles">
                <span class="user-name">
                  {{ currentBlog.createdBy.lastName }}, {{ currentBlog.createdBy.firstName }}
                </span>
                &sdot;&nbsp;{{ currentBlog.updatedAt | relativeDate }}
              </h5>
            </b-media>
            <h4 class="mb-3"> {{ currentBlog.title }}</h4>
            <b-img v-if="currentBlog.imageUrl" class="mb-3" :src="currentBlog.imageUrl" width="100%" height="100%"/>
            <h6>{{ currentBlog.body }}</h6>
          </b-card-body>
          <!--          <b-card-footer>-->
          <!--            <b-button size="sm" pill variant="light" :pressed.sync="showComments">-->
          <!--              <i class="far fa-comments fa-lg"/>-->
          <!--              <b-badge v-if="data.blogComments" class="ml-2" pill variant="secondary">-->
          <!--                {{ data.blogComments.length }}-->
          <!--              </b-badge>-->
          <!--            </b-button>-->
          <!--          </b-card-footer>-->
          <!--          <add-comment v-if="showComments" :blog_id="data.id" :current-user="currentUser" :channel-id="channelData.id"/>-->
          <!--          <b-card-body v-if="showComments && data.blogComments && data.blogComments.length" class="pt-1 pb-1">-->
          <!--            <comment-item v-for="(comment, index) in data.blogComments" :comment="comment" :index="index" :blog="data"-->
          <!--                          :key="`blog-comment-${index}`" :current-user="currentUser" :channel-id="channelData.id">-->
          <!--            </comment-item>-->
          <!--          </b-card-body>-->
        </b-card>
      </div>
    </b-card-body>
    <blog-modal/>
  </b-card>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import ViewSpinner from "../../core/components/view-spinner/view-spinner";
import BlogModal from "./modals/BlogModal";

const {mapState, mapActions} = createNamespacedHelpers('blog')
export default {
  name: "Blog",
  components: {BlogModal, ViewSpinner},
  data() {
    return {
      showComments: true,
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    ...mapState({
      currentBlog: state => state.blogView.currentBlog,
      loading: state => state.blogView.loading,
    }),
    isSmallScreen() {
      return this.windowWidth <= 480
    },
    smallScreenStyles() {
      return this.isSmallScreen ? {fontSize: '12px'} : {}
    },
  },
  methods: {
    ...mapActions(['getBlogByUuid', 'showBlogModal', 'deleteBlog', 'removeCurrentBlog']),
    onUpdateBlogClick() {
      this.showBlogModal(this.currentBlog)
    },
    async onDeleteBlogClick() {
      const confirm = await this.$confirm('Are you sure you want to delete following blog?', 'Deleting Blog')
      if (confirm) {
        await this.deleteBlog(this.currentBlog.uuid);
        await this.$router.push({name: 'home'})
      }
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
    this.getBlogByUuid(this.$route.params.blogUuid)
  },
  destroyed() {
    this.removeCurrentBlog()
  }
}
</script>

<style lang="scss" scoped>
.media {
  position: relative;
}

.user-name {
  color: #008BCA;
}

.hover-pointer {
  &:hover {
    cursor: pointer;
  }
}

.blog-card {
  height: 100%;
  width: 100%;
}

.blog-card-body {
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

.action-buttons {
  position: absolute;
  right: 0;
  top: 0;
}

/deep/.dropdown-item {
  padding: 2px 10px;
}

</style>