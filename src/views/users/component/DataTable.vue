<template>
  <el-table v-loading="loading" :data="tableData" border stripe>
    <el-table-column
      prop="id"
      label="恋爱号"
      width="150"
      align="center"
    ></el-table-column>
    <el-table-column label="头像" width="100" align="center">
      <template slot-scope="slot">
        <div class="avatar-content">
          <el-avatar shape="circle" :src="slot.row.avatar"></el-avatar>
          <svg-icon
            :class="slot.row.sex == '男' ? 'blue' : 'red'"
            :icon-class="slot.row.sex == '男' ? 'man' : 'woman'"
          ></svg-icon>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="account" width="200" align="center" label="账户">
    </el-table-column>
    <el-table-column align="center" width="250" label="昵称">
      <template slot-scope="slot">
        <span :class="slot.row.isvip ? 'red' : ''">{{
          slot.row.nickname
        }}</span>
        <svg-icon v-if="slot.row.isvip" icon-class="vip"></svg-icon>
      </template>
    </el-table-column>
    <el-table-column align="center" width="300" label="情侣">
      <template slot-scope="slot">
        <div class="lover-content">
          <el-avatar
            shape="circle"
            :src="slot.row.user.avatar"
            fit="fill"
          ></el-avatar>
          <span :class="slot.row.user.isvip ? 'red' : ''">{{
            slot.row.user.nickname
          }}</span>
          <svg-icon v-if="slot.row.user.isvip" icon-class="vip"></svg-icon>
          <span class="account-span">{{ slot.row.user.account }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column align="center" label="状态">
      <template slot-scope="slot">
        <template v-if="slot.row.black_list">
          <el-tooltip class="item" effect="dark" placement="top-start">
            <div v-if="slot.row.black_list.endAt" slot="content">
              <span>
                封禁原因:
                {{ reason[slot.row.black_list.reason].label }}
              </span>
              <br />
              <span>
                封禁结束:
                {{ endAt(slot.row.black_list.endAt) }}
              </span>
            </div>
            <div v-else slot="content">
              <span>永久封禁</span>
            </div>
            <span style="cursor: pointer">已被封禁</span>
          </el-tooltip>
        </template>
        <template v-else>
          <span>{{ slot.row.state }}</span>
        </template>
      </template>
    </el-table-column>
    <el-table-column fixed="right" align="center" width="100" label="操作">
      <template slot-scope="slot">
        <template v-if="slot.row.black_list === null">
          <el-button type="text" @click="banClick(slot.row, slot.$index)"
            >封禁</el-button
          >
        </template>
        <template v-else>
          <el-button
            :disabled="!slot.row.black_list.endAt"
            type="text"
            @click="handleRmoveBan(slot.row.id, slot.$index)"
            >解封</el-button
          >
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { parseTime } from "@/utils/index";
import { reason } from "@/enum/blacklist";
export default {
  data() {
    return {
      reason,
    };
  },
  props: {
    tableData: {
      type: Array,
      default: [],
      require: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    // 将id传给父组件
    async banClick(row, tableIndex) {
      this.$emit("handleban", row, tableIndex);
    },
    // 解除封禁
    async handleRmoveBan(id, tableIndex) {
      this.$emit("handleremoveban", id, tableIndex);
    },

    endAt(date) {
      return parseTime(date);
    },
  },
  created() {
    // console.log(parseTime(1619148646, ""));
  },
};
</script>

<style lang="scss">
.lover-content {
  display: flex;
  //   justify-content: ce;
  .el-avatar {
    margin-right: 10px;
  }
  .account-span {
    font-size: 12px;
    position: absolute;
    left: 60px;
    bottom: 15px;
    color: #909399;
  }
}
</style>