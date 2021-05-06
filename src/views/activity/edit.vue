<template>
  <div class="container">
    <el-form :model="dataForm" ref="form" :inline="false">
      <el-row :gutter="20">
        <el-col :md="8" :xl="24">
          <el-form-item label="活动标题">
            <el-input
              v-model="dataForm.title"
              placeholder="请输入活动标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="dataForm.startTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="dataForm.endTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动封面">
            <upload />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="活动内容">
            <editor :value="dataForm.content"></editor>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Editor from "@/components/Tinymce/index";
import Upload from "./component/Upload.vue";
export default {
  components: { Editor, Upload },
  data() {
    return {
      dataForm: {
        title: "",
        startTime: null,
        endTime: null,
        cover: "",
        content: "",
      },
      content: "",
    };
  },
};
</script>
<style lang="scss"  scoped>
</style>