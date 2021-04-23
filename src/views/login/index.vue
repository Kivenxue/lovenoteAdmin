<template>
  <div class="login-container">
    <div class="login-particles">
      <!-- 粒子效果 -->
      <vue-particles color="#409EFF" shapeType="star"></vue-particles>
    </div>
    <div class="login-form">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        autocomplete="off"
      >
        <div class="title-container">
          <h3 class="title">LoveNote 后台管理</h3>
        </div>

        <el-form-item prop="account">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="account"
            v-model="loginForm.account"
            placeholder="请输入用户名"
            name="account"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
        <el-form-item prop="captchaCode" size="normal">
          <div class="svgCode-container">
            <el-input
              placeholder="验证码"
              maxlength="4"
              v-model="loginForm.captchaCode"
            ></el-input>
            <span v-html="captchaCodeSvg" @click="renderCaptchaCode()"></span>
          </div>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="block-btn"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
        <el-checkbox v-model="saveData" label="记住我" class="float-right"
          >三天之内记住我</el-checkbox
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import VueParticles from "vue-particles/src/vue-particles/vue-particles";
// import { decrypt, encrypt } from "@/utils/crypto";
import { getCaptchaCode } from "@/api/base";
export default {
  name: "Login",

  components: { VueParticles },
  data() {
    const checkAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入正确的密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "lemon123",
        password: "qq1879178791",
        captchaCode: "",
      },
      loginRules: {
        account: [{ required: true, trigger: "blur", validator: checkAccount }],
        password: [
          { required: true, trigger: "blur", validator: checkPassword },
        ],
        captchaCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { max: 4, min: 4, message: "请输入正确的密码", trigger: "blur" },
        ],
      },
      saveData: false,
      loading: false,
      passwordType: "password",
      redirect: undefined,
      captchaCodeSvg: null,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
            });
          // this.loading = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    renderCaptchaCode() {
      getCaptchaCode().then((res) => {
        this.captchaCodeSvg = res;
      });
    },
  },
  created() {
    console.log("start page...");
    this.renderCaptchaCode();
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.svgCode-container {
  height: 47px;
  .el-input {
    // width: 50%;
    max-width: 65%;
  }
  @media screen and (max-width: 540px) {
    .el-input {
      max-width: 40%;
    }
  }
  span {
    float: right;
    height: 47px;
    svg {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: rgb(35, 39, 65);
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  .login-particles {
    width: 100%;
    height: 100%;
  }

  .login-form {
    width: 520px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.3);
    padding: 40px;
    border: 1px solid rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    box-shadow: 0 0 5px #333;
    max-width: 95%;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
