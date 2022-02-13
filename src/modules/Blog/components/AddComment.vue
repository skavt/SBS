<template>
  <b-card-body class="pt-1 bg-light">
    <ValidationObserver ref="form" v-slot="{ handleSubmit}">
      <b-media>
        <template v-slot:aside>
          <b-img rounded="circle" :src="currentUser.imageUrl || '/assets/avatar.svg'" width="32" height="32"/>
        </template>
        <b-form @submit.prevent="handleSubmit(onAddCommentClick)" @keydown="onKeydown">
          <div class="grow-wrap">
            <b-form-textarea v-model="comment" placeholder="Comment" name="text" id="text"
                             onInput="this.parentNode.dataset.replicatedValue = this.value">
            </b-form-textarea>
            <b-button @click="onAddCommentClick" class="add-comment" variant="link" size="lg">
              <i class="fas fa-paper-plane"/>
            </b-button>
          </div>
        </b-form>
      </b-media>
    </ValidationObserver>
  </b-card-body>
</template>

<script>
import {createNamespacedHelpers} from "vuex";
import {uuid} from "vue-uuid";

const {mapActions} = createNamespacedHelpers('blog')

export default {
  name: "AddComment",
  props: {
    currentUser: {
      type: Object
    },
    blogUuid: {
      type: String,
    },
  },
  data() {
    return {
      comment: '',
    }
  },
  methods: {
    ...mapActions(['addComment']),
    onKeydown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        if (this.comment.trim()) {
          this.onAddCommentClick()
        }
      }
    },
    async onAddCommentClick() {
      if (this.comment.trim()) {
        let params = {
          uuid: uuid.v4(),
          comment: this.comment,
          blogUuid: this.blogUuid,
          createdBy: {...this.currentUser},
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString()
        }
        await this.addComment(params);
        this.comment = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.media {
  position: relative;
}

.grow-wrap {
  display: grid;
}

.grow-wrap::after {
  content: attr(data-replicated-value) " ";
  white-space: pre-wrap;
  visibility: hidden;
}

.grow-wrap > textarea {
  resize: none;
  overflow: hidden;
}

.grow-wrap > textarea,
.grow-wrap::after {
  padding: 0.5rem;
  font: inherit;
  border-radius: 15px;
  grid-area: 1 / 1 / 2 / 2;
}

.add-comment {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>