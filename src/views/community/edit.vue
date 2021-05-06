<template>
  <!-- 编辑系统帖子 -->
  <div class="container">
     <el-form :model="formData" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal">
         <el-form-item label="主题">
             <el-input v-model="form.formData">
                 
             </el-input>
         </el-form-item>
         <el-form-item>
             <el-button type="primary" @click="onSubmit">立即创建</el-button>
             <el-button>取消</el-button>
         </el-form-item>
     </el-form>
      
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>