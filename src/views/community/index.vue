<template>
  <!-- 帖子列表 -->
  <div class="container">
    <el-table border stripe>
      <el-table-column label="标题" align="center"></el-table-column>
      <el-table-column label="发布者" align="center"></el-table-column>
      <el-table-column label="发布时间" align="center"></el-table-column>
      <el-table-column label="点赞数" align="center"></el-table-column>
      <el-table-column label="浏览数" align="center"></el-table-column>
      <el-table-column label="评论数" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <el-button type="text">删除</el-button>
        <el-button type="text">预览</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>