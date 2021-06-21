<template>
  <section>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>任务快照列表</span>
  </div>
  <div class="text item">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="请输入执行快照id"></el-input>
        </el-form-item>
         <el-form-item>
          <el-input v-model="filters.name" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item>
        <el-select v-model="filters.status" clearable placeholder="请选择执行状态" style="width:100%;">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
         <el-form-item>
          <el-select v-model="filters.group" clearable placeholder="请选择任务集群" style="width:100%;">
          <el-option
            v-for="item in groups"
            :key="item.name"
            :label="item.remark"
            :value="item.name">
          </el-option>
        </el-select>
        </el-form-item>
         <el-form-item>
          <el-input v-model="filters.ip" placeholder="请输入ip"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getSnapshots">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
      <el-table :data="snapshots" highlight-current-row v-loading="loading"  stripe  style="width: 100%;">
        <el-table-column prop="id" label="id" width="200" fixed>
        </el-table-column>
        <el-table-column prop="name" label="任务名称" width="200">
        </el-table-column>
        <el-table-column prop="group" label="任务集群" width="100">
        </el-table-column>
        <el-table-column prop="cron" label="Cron表达式" width="100" >
        </el-table-column>
         <el-table-column prop="ip" label="ip" width="150" >
        </el-table-column>
        <el-table-column prop="status" label="执行状态" width="100">
            <template slot-scope="scope">
              <el-tag type="success" size="mini" v-if="scope.row.status==1">EXECUTING</el-tag>
              <el-tag type="primary" size="mini" v-else-if="scope.row.status==2">COMPLETE</el-tag>
               <el-tag type="danger" size="mini" v-else-if="scope.row.status==-1">ERROR</el-tag>
               <el-tag type="warning" size="mini" v-else-if="scope.row.status==3">UNKNOW</el-tag>
          </template>
        </el-table-column>
         <el-table-column label="耗时" width="100" >
            <template slot-scope="scope">
              <el-tag type="danger" size="mini">{{scope.row.times}}秒</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="target" label="Target" width="250" >
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200" >
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="200" >
        </el-table-column>
         <el-table-column prop="finishTime" label="结束时间" width="200">
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
      <template slot-scope="scope">
         <el-button
          size="mini"
          type="primary"
          @click="handleView(scope.$index, scope.row)">详情</el-button>
      </template>
    </el-table-column>
      </el-table>

       <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,sizes,prev, pager, next"  @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize"  :page-sizes="[20, 30, 50, 100]" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </div>
</el-card>


 <!--查看界面-->
    <el-dialog title="任务快照详情" :visible.sync="viewFormVisible" :close-on-click-modal="false">
      <el-form :model="viewForm" label-width="100px"  ref="viewForm">
          <el-form-item label="快照Id" prop="id">
          <el-input v-model="viewForm.id" disabled></el-input>
        </el-form-item>
            <el-form-item label="任务Id" prop="jobId">
          <el-input v-model="viewForm.jobId" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="viewForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务集群" prop="group">
             <el-input v-model="viewForm.group" disabled></el-input>
        </el-form-item>
        <el-form-item label="Cron表达式" prop="cron" >
             <el-input v-model="viewForm.cron" disabled></el-input>
        </el-form-item>
          <el-form-item label="ip" prop="cron" >
             <el-input v-model="viewForm.ip" disabled></el-input>
        </el-form-item>
         <el-form-item label="目标任务" prop="target">
            <el-input v-model="viewForm.target" disabled></el-input>
        </el-form-item>
         <el-form-item label="任务参数" prop="params">
            <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 20}" v-model="viewForm.params" disabled></el-input>
        </el-form-item>
         <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="viewForm.createTime" disabled></el-input>
        </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="viewForm.mobile" disabled></el-input>
          </el-form-item>

            <el-form-item label="状态" prop="status">
            <el-input v-model="viewForm.status" disabled></el-input>
          </el-form-item>

              <el-form-item label="耗时" prop="times">
            <el-input v-model="viewForm.times" disabled></el-input>
          </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="viewForm.createTime" disabled></el-input>
          </el-form-item>
              <el-form-item label="开始时间" prop="startTime">
            <el-input v-model="viewForm.startTime" disabled></el-input>
          </el-form-item>

        <el-form-item label="完成时间" prop="finishTime">
            <el-input v-model="viewForm.finishTime" disabled></el-input>
          </el-form-item>
            <el-form-item label="备注" prop="remark">
            <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 20}" v-model="viewForm.remark" disabled></el-input>
          </el-form-item>
           <el-form-item label="结果" prop="result">
            <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 20}" v-model="viewForm.result" disabled></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="viewFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { executeSnapshotList,groupConfList,snapshotDelete} from '@/api/api'
export default {
  data () {
    return {
        filters:{
            id:'',
            group:'',
            ip:''
        },
        status:[
            {"name":"EXECUTING","value":1},
            {"name":"COMPLETE","value":2},
            {"name":"UNKNOW","value":3},
            {"name":"ERROR","value":-1}
        ],
        groups:{},
        total:0,
        page:1,
        pageSize:20,
        loading:false,
      viewForm:{

      },
      viewFormVisible:false,
      viewClientFormVisible:false,
      snapshots: [],
      clients:[]
    }
  },
  methods: {

handleSizeChange(size ){
    this.pageSize =size
    this.getSnapshots()
},
      handleCurrentChange(va){
          this.page =va
          this.getSnapshots()
      },
   handleView(index, row){
     this.viewForm = Object.assign({}, row)
     this.viewFormVisible =true

   },
   handleDelete(index, row){
     this.$confirm('确认要删除此任务快照信息吗？', '友情提示', {}).then(() => {
           let para = Object.assign({}, row)
            snapshotDelete(para).then((res) => {
              // NProgress.done();
                this.$message({
                message: "删除成功",
                type: 'success'
              })
              this.getSnapshots()

            })
          })
   },
    // 获取任务执行快照列表
    getSnapshots: function () {
      let para =Object.assign({"pageNo":this.page,"pageSize":this.pageSize}, this.filters)
      this.loading = true
      executeSnapshotList(para).then((res) => {
         this.loading = false
        this.snapshots = res.data.list
        this.total = res.data.totalCount
      })
    },
    groupList(){
      let para = {}
      groupConfList(para).then((res) => {
        this.groups = res.data
      })
    }
  },
  mounted () {
   this.getSnapshots()
   this.groupList()
  }
}

</script>

<style scoped>

</style>
