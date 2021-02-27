<template>
  <section>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务执行计划</span>
      </div>
      <div class="text item">
        <!--列表-->
        <el-table
          :data="plans"
          highlight-current-row
          v-loading="loading"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="id" label="id" width="200" fixed>
          </el-table-column>
          <el-table-column prop="name" label="任务名称" width="150">
          </el-table-column>
          <el-table-column prop="group" label="任务集群" width="100">
          </el-table-column>
          <el-table-column prop="cron" label="Cron表达式" width="100">
          </el-table-column>
          <el-table-column prop="beforeTime" label="上次执行时间" width="160">
          </el-table-column>
          <el-table-column prop="nextTime" label="下次执行时间" width="160">
          </el-table-column>
          <el-table-column prop="target" label="target"> </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleView(scope.$index, scope.row)"
                >详情</el-button
              >
              <el-button
                size="mini"
                type="success"
                @click="handleClientView(scope.$index, scope.row)"
                >任务节点</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!--查看界面-->
    <el-dialog
      title="任务执行计划"
      :visible.sync="viewFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="viewForm" label-width="100px" ref="viewForm">
        <el-form-item label="任务Id" prop="id">
          <el-input
            v-model="viewForm.id"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="任务名称" prop="name">
          <el-input
            v-model="viewForm.name"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="任务集群" prop="group">
          <el-input
            v-model="viewForm.group"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="Cron表达式" prop="cron">
          <el-input
            v-model="viewForm.cron"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="目标任务" prop="target">
          <el-input
            v-model="viewForm.target"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="任务参数" prop="params">
          <el-input
            v-model="viewForm.params"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="上次执行时间" prop="beforeTime">
          <el-input
            v-model="viewForm.beforeTime"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="下次执行时间" prop="nextTime">
          <el-input
            v-model="viewForm.nextTime"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input
            v-model="viewForm.mobile"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="viewForm.remark"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="viewFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>

    <!--查看界面-->
    <el-dialog
      title="执行任务Client列表"
      :visible.sync="viewClientFormVisible"
      :close-on-click-modal="false"
    >
      <!--列表-->
      <el-table
        :data="clients"
        highlight-current-row
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column prop="name" label="client" width="150">
        </el-table-column>
        <el-table-column prop="group" label="集群" width="150">
        </el-table-column>
        <el-table-column prop="path" label="path"> </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="viewClientFormVisible = false"
          >关闭</el-button
        >
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { planList, clientList } from "@/api/api";
export default {
  data() {
    return {
      loading: false,
      viewForm: {},
      viewFormVisible: false,
      viewClientFormVisible: false,
      plans: [],
      clients: [],
    };
  },
  methods: {
    handleView(index, row) {
      this.viewForm = Object.assign({}, row);
      this.viewFormVisible = true;
    },
    handleClientView(index, row) {
      this.viewClientFormVisible = true;
      let param = {
        group: row.group,
      };
      this.clients = [];
      clientList(param).then((res) => {
        this.loading = false;
        this.clients = res.data || [];
      });
    },
    // 获取任务列表
    getPlans: function () {
      let para = {};
      this.loading = true;
      planList(para).then((res) => {
        this.loading = false;
        this.plans = this.formatTimeEach(res.data,['beforeTime','nextTime']);
      });
    },
  },
  mounted() {
    this.getPlans();
  },
};
</script>

<style scoped>
</style>
