<template>
  <el-dialog
    class="ban-dialog"
    :title="`封禁用户 - ${formData.account}`"
    :visible.sync="openDialog"
    :before-close="handleClose"
  >
    <el-form :model="formData" :rules="rules" ref="banForm">
      <el-form-item label="封禁理由" prop="reason">
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
      <el-form-item label="封禁时长" prop="endAt">
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
      <el-form-item label="图片验证码" prop="captchaCode">
        <div class="svgCode-container">
          <el-input v-model="formData.captchaCode"></el-input>
          <div class="captchaCode" v-html="captchaCode"></div>
        </div>
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
import { getCaptchaCode, checkCaptcha } from "@/api/base";
export default {
  data() {
    return {
      formData: {
        admin_id: "",
        account: "",
        uid: "",
        reason: "",
        endAt: "",
        captchaCode: "",
        captchaKey: "",
      },
      endAt,
      reason,
      captchaCode: null,
      rules: {
        reason: [
          { required: true, message: "请选择封禁理由", tigger: "change" },
        ],
        endAt: [{ required: true, message: "请选择封禁时长" }],
        captchaCode: [{ required: true, message: "请输入图片验证码" }],
      },
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
    openDialog: {
      immediate: true,
      handler(val) {
        if (val) {
          this.renderCaptcha();
        }
      },
    },
  },
  methods: {
    handleClose() {
      //   this.openDialog = false;
      this.$emit("handleclose", false);
    },
    handleBan() {
      this.$refs["banForm"].validate((valid) => {
        if (valid) {
          checkCaptcha(
            this.formData.captchaKey,
            this.formData.captchaCode
          ).then((res) => {
            if (res) {
              this.$emit("handleban", this.formData);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 渲染图片验证码
    async renderCaptcha() {
      getCaptchaCode().then((res) => {
        this.captchaCode = res.data;
        this.formData.captchaKey = res.key;
      });
    },
  },
  mounted() {
    this.$emit("update:blackListData", this.formData);
    // this.$emit("update:")
  },
};
</script>

<style lang="scss" scoped >
.svgCode-container {
  // height: 47px;
  display: flex;
  align-items: center;
  .el-input {
    // width: 50%;
    max-width: 30% !important;
  }
  @media screen and (max-width: 540px) {
    .el-input {
      min-width: 40% !important;
    }
  }
  .captchaCode {
    float: right;
    svg {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>
<style lang="scss">
.ban-dialog {
  .el-dialog {
    width: 385px;
  }
  @media screen and (max-width: 390px) {
    .el-dialog {
      width: 95% !important;
    }
  }
}
</style>