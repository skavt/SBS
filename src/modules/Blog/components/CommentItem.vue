<template>
  <b-media class="py-2">
    <template v-slot:aside>
      <b-img v-if="isSmallScreen" rounded="circle" :src="comment.createdBy.imageUrl  || '/assets/avatar.svg'" width="20"
             height="20"/>
      <b-img v-else rounded="circle" :src="comment.createdBy.imageUrl  || '/assets/avatar.svg'" width="32" height="32"/>
    </template>
    <h6 v-if="isSmallScreen" class="mt-0 mb-0" :style="smallScreenStyles">
      <span class="user-name">
        {{ comment.createdBy.lastName }}, {{ comment.createdBy.firstName }}
      </span>
      <br/>
      {{ comment.updatedAt | relativeDate }}
    </h6>
    <h6 v-else class="mt-0 mb-0">
      <span class="user-name">
        Test
        {{ comment.createdBy.lastName }}, {{ comment.createdBy.firstName }}
      </span>
      &sdot;&nbsp;{{ comment.updatedAt | relativeDate }}&nbsp;
    </h6>
    <span class="comment-wrapper" v-html="comment.comment"/>
    <b-button @click="onDelete" class="delete-comment" variant="link">
      <i class="far fa-trash-alt text-danger"/>
    </b-button>
  </b-media>
</template>

<script>
import {createNamespacedHelpers} from "vuex";

const {mapActions} = createNamespacedHelpers('blog')
export default {
  name: "CommentItem",
  props: {
    currentUser: {
      type: Object,
    },
    comment: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    blog: {
      type: Object,
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    isSmallScreen() {
      return this.windowWidth <= 480
    },
    smallScreenStyles() {
      return this.isSmallScreen ? {fontSize: '10px'} : {}
    },
  },
  methods: {
    ...mapActions(['deleteComment']),
    async onDelete() {
      const confirm = await this.$confirm('Are you sure you want to delete following comment?', 'Deleting Comment')
      if (confirm) {
        await this.deleteComment(this.comment)
      }
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  }
}
</script>

<style lang="scss" scoped>
.media {
  position: relative;
  border-bottom: 1px solid #f1f1f1;

  &:last-child {
    border-bottom: none;
  }
}

.comment-wrapper {
  font-weight: 400;

  & /deep/ img {
    width: 24px;
    margin: 0 1px;
  }
}

.user-name {
  color: #008BCA;
}

.delete-comment {
  position: absolute;
  right: 10px;
  top: 0;
  color: #495057;
}
</style>