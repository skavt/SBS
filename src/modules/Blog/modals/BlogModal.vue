<template>
  <ValidationObserver ref="form" v-slot="{ handleSubmit}">
    <b-modal v-model="modal.show" :title="getTitle" :ok-disabled="!model.body.trim() || !model.title.trim()"
             @hidden="onHideModal" @ok.prevent="handleSubmit(onSubmit)">
      <view-spinner :show="loading"/>
      <b-form v-if="!loading" @submit.prevent="handleSubmit(onSubmit)" @keydown="onKeydown">
        <input-widget :model="model" attribute="imageUrl" placeholder="Image"/>
        <input-widget :model="model" attribute="title" :autofocus="true"/>
        <div class="grow-wrap">
          <b-form-textarea
              v-model="model.body" placeholder="Description" name="text" id="text"
              onInput="this.parentNode.dataset.replicatedValue = this.value">
          </b-form-textarea>
        </div>
      </b-form>
    </b-modal>
  </ValidationObserver>
</template>

<script>
import BlogModel from "../models/BlogModel";
import InputWidget from "../../../core/components/input-widget/InputWidget";
import ViewSpinner from "../../../core/components/view-spinner/view-spinner";
import {createNamespacedHelpers} from "vuex";
import {uuid} from "vue-uuid";

const {mapState, mapActions} = createNamespacedHelpers('blog')
const {mapState: mapAuthState} = createNamespacedHelpers('auth')
export default {
  name: "BlogModal",
  components: {ViewSpinner, InputWidget},
  data() {
    return {
      model: new BlogModel(),
    }
  },
  computed: {
    ...mapState({
      modal: state => state.modal,
      loading: state => state.modal.loading,
      data: state => state.modal.data,
    }),
    ...mapAuthState(['currentUser']),
    getTitle() {
      return this.model.id ? 'Update Blog' : 'Create New Blog'
    },
  },
  watch: {
    data() {
      if (this.data) {
        this.model = new BlogModel(this.data);
      }
    },
  },
  methods: {
    ...mapActions(['hideBlogModal', 'createNewBlog', 'updateBlog']),
    onKeydown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        this.onSubmit()
      }
    },
    async onSubmit() {
      this.model.resetErrors()
      let form = {...this.model.toJSON()}
      form.createdBy = {...this.currentUser}
      form.createdAt = new Date().toLocaleString()
      form.updatedAt = form.createdAt

      let res
      if (!form.uuid) {
        form.uuid = uuid.v4()
        res = await this.createNewBlog(form)
      } else {
        form.updatedAt = new Date().toLocaleString()
        res = await this.updateBlog(form)
      }

      if (res.success) {
        if (!form.uuid) {
          this.$toast(`Blog created successfully`)
        } else {
          this.$toast(`Blog updated successfully`)
        }
        this.onHideModal()
      } else {
        this.model.setMultipleErrors(res.body);
      }
    },
    onHideModal() {
      this.hideBlogModal()
      this.model = new BlogModel()
    },
  },
}
</script>

<style lang="scss" scoped>

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
  grid-area: 1 / 1 / 2 / 2;
}
</style>