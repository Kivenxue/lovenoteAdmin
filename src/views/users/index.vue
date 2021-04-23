<template>
  <div class="container">
    <search-form
      :searchData.sync="searchForm"
      @handlesearch="handleSearch()"
    ></search-form>
    <data-table
      :tableData.sync="dataList"
      :loading="loading"
      @handleban="clickBan"
      @handleremoveban="handleRemoveBan"
    ></data-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentPage"
      :total="total"
    >
    </el-pagination>
    <set-black-list
      :openDialog="openDialog"
      :blackListData="blackListData"
      @handleclose="closeDialog"
      @handleban="handleBan"
    ></set-black-list>
  </div>
</template>

<script>
import DataTable from "./component/DataTable";
import SearchForm from "./component/SearchForm";
import SetBlackList from "./component/SetBlackList";
import { list, ban, removeBan, listOne } from "@/api/users";
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  components: { DataTable, SearchForm, SetBlackList },
  data() {
    return {
      dataList: [],
      searchForm: {
        id: "",
        account: "",
      },
      loading: true,
      total: 0,
      selectUser: {},
      openDialog: false,
      blackListData: {
        admin_id: "",
        account: "",
        uid: "",
        reason: "",
        endAt: "",
      },
      black_list: {},
      tableIndex: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.getData();
    for (var key in this.dataList) {
      console.log(this.dataList[key]);
    }
  },
  methods: {
    // 获取数据并绑定
    async getData(page = 1, where = {}) {
      const { rows, count } = await list(page, where);
      this.dataList = rows;
      this.total = count;
      this.loading = false;
    },
    /**搜索 */
    async handleSearch() {
      this.getData(1, this.searchForm);
    },
    // 翻页
    async handleCurrentPage(page) {
      this.loading = true;
      this.getData(page);
    },
    // 封禁按钮点击
    async clickBan(row, index) {
      const admin_id = store.state.user.userInfo.id;
      const uid = row.id;
      this.blackListData.account = row.account;
      this.blackListData.admin_id = admin_id;
      this.blackListData.uid = uid;
      this.tableIndex = index;
      this.openDialog = true;
    },
    // 关闭对话框
    async closeDialog() {
      this.openDialog = false;
    },
    // 封禁
    async handleBan() {
      await ban(this.blackListData);
      listOne(this.blackListData.uid).then((res) => {
        this.$set(this.dataList, this.tableIndex, res);
      });
      this.openDialog = false;
      this.blackListData = {};
    },
    // 解除封禁
    async handleRemoveBan(id, index) {
      console.log(id);
      console.log(index);
      await removeBan(id);
      listOne(id).then((res) => {
        this.$set(this.dataList, index, res);
      });
    },
  },
};
</script>

<style lang="scss">
.vip-text {
  color: #f56c6c;
}
.el-pagination {
  margin-top: 15px;
  text-align: right;
}
.users-container {
  display: flex;
  .el-avatar {
    margin-right: 10px;
  }
}
</style>