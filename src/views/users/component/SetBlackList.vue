<template>
  <el-dialog
    class="ban-dialog"
    :title="`封禁用户 - ${formData.account}`"
    :visible.sync="openDialog"
    :before-close="handleClose"
  >
    <el-form :model="formData">
      <el-form-item label="封禁理由">
        <el-select v-model="formData.reason" placeholder="请选择封禁理由">
          <el-option
            v-for="item in reason"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封禁时长">
        <el-select v-model="formData.endAt" placeholder="请选择封禁时长">
          <el-option
            v-for="item in endAt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="handleBan"
          >封禁</el-button
        >
        <el-button size="default" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { endAt, reason } from "@/enum/blacklist";
export default {
  data() {
    return {
      formData: {
        admin_id: "",
        account: "",
        uid: "",
        reason: "",
        endAt: "",
      },
      endAt,
      reason,
    };
  },
  props: {
    blackListData: {
      type: Object,
    },
    openDialog: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    blackListData: {
      immediate: true,
      handler(val) {
        this.formData = val;
      },
    },
  },
  methods: {
    handleClose() {
      //   this.openDialog = false;
      this.$emit("handleclose", false);
    },
    handleBan() {
      this.$emit("handleban", this.formData);
    },
  },
  mounted() {
    this.$emit("update:blackListData", this.formData);
    // this.$emit("update:")
  },
};
</script>

<style lang="scss">
.ban-dialog {
  div:first-child {
    max-width: 385px;
  }
  @media screen and (max-width: 635px) {
    div:first-child {
      min-width: 95% !important;
    }
  }
}
</style>