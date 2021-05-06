<template>
  <div>
    <edit-image @successCBK="imageSuccessCBK" class="upload-btn"></edit-image>
    <editor :id="tinymceId" :init="init" v-model="content"></editor>
  </div>
</template>

<script>
import tinymce from "tinymce";
import EditImage from "./EditImage/index.vue";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/icons/default/icons";
import "tinymce/skins/ui/oxide/skin.css";

import { plugins } from "./plugins";
import { toolbar } from "./toolbar";
export default {
  components: { Editor, EditImage },
  props: {
    id: {
      type: String,
      default: function () {
        return (
          "vue-tinymce-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      },
    },
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      init: {
        selector: `#${this.tinymceId}`,
        language: "zh_CN",
        plugins,
        toolbar,
        height: 750,
        min_height: 650,
        width: 700,
      },
      tinymceId: this.id,
      content: "",
    };
  },
  created() {
    tinymce.init({
      width: 500,
    });
  },
  methods: {
    imageSuccessCBK(arr) {
      arr.forEach((v) => {
        tinymce.get(this.tinymceId).insertContent(`<img src=${v.url}>`);
      });
    },
  },
  watch: {
    value(newValue) {
      this.content = newValue;
    },
    content(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>

<style scoped>
button {
}
</style>