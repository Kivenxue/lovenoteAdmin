<template>
  <!-- 查找表单 -->
  <el-form inline :model="formData">
    <el-form-item>
      <el-input
        placeholder="请输入恋爱号用以查找"
        @input="handleSearch"
        v-model="formData.id"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        placeholder="请输入昵称或者账号查找"
        @input="handleSearch"
        v-model="formData.account"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        id: "",
        account: "",
      },
    };
  },
  props: {
    searchData: {
      type: Object,
    },
  },
  watch: {
    searchData: {
      immediate: true,
      handler(val) {
        this.formData = val;
      },
    },
  },
  methods: {
    handleSearch() {
      this.$emit("handlesearch", this.formData);
    },
  },
  mounted() {
    this.$emit("update:searchData", this.formData);
  },
};
</script>

<style>
</style>