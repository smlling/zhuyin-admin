webpackJsonp([6],{"+jxu":function(e,t){},KQMI:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("woOf"),a=s.n(r),o=s("Dd8w"),i=s.n(o),n=s("GwN5"),l=s.n(n),d=s("NYxO"),c={created:function(){this.getUserList()},computed:i()({},Object(d.b)({userList:"userlist"}),{disableFreezeConfirm:function(){return!(this.freezeUserForm.freeze_reason&&this.freezeUserForm.freeze_time)},disableAddConfirm:function(){return!(this.addUserForm.username&&this.addUserForm.password)}}),methods:{showPwd:function(){"password"===this.passwordType?this.passwordType="":this.passwordType="password"},showAddUser:function(){this.showAddDialog=!0},handleResetUser:function(e,t){var s=this;this.$confirm("此操作将重置该用户的密码, 操作无法撤回, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){s.$store.dispatch("UserManage/resetUser",e).then(function(e){console.log(e.msg),s.$message({type:"success",message:e.msg}),s.$alert("新密码: "+e.data.new_password,"用户密码重置成功")}).catch(function(e){console.log(e)})}).catch(function(){})},showFreezeUserDialog:function(e,t){this.tableIndex=t,this.showFreezeDialog=!0,this.freezeUserForm.uid=e},getUserList:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20;this.listLoading=!0,this.$store.dispatch("UserManage/UserList",{page:t,limit:s}).then(function(t){console.log(t.msg),e.listLoading=!1}).catch(function(t){console.log(t),e.listLoading=!1})},handleAddConfirm:function(){var e=this;this.disableAddConfirm||(this.addLoading=!0,this.$store.dispatch("UserManage/addUser",this.addUserForm).then(function(t){e.addLoading=!1,e.showAddDialog=!1,a()(e.addUserForm,{username:"",password:""}),e.$message({message:t.msg,type:"success"})}).catch(function(t){console.log(t),e.addLoading=!1,e.showAddDialog=!1}))},handleFreezeConfirm:function(){var e=this;this.disableFreezeConfirm||(this.freezeLoading=!0,this.$store.dispatch("UserManage/freezeUser",this.freezeUserForm).then(function(t){a()(e.userList.list[e.tableIndex],t.data),e.freezeLoading=!1,e.showFreezeDialog=!1,a()(e.freezeUserForm,{uid:0,freeze_reason:void 0,freeze_time:void 0}),e.$message({message:t.msg,type:"success"})}).catch(function(){e.freezeLoading=!1,e.showFreezeDialog=!1}))},handleFreezeClike:function(e,t){var s=this;e&&this.userList.list[t].unfreeze_time?(this.freezeLoading=!0,this.$store.dispatch("UserManage/unfreezeUser",e).then(function(e){a()(s.userList.list[s.tableIndex],e.data),s.freezeLoading=!1,s.$message({message:e.msg,type:"success"})}).catch(function(e){console.log(e),s.freezeLoading=!1})):this.showFreezeUserDialog(e,t)}},data:function(){return{tableIndex:void 0,Consts:l.a,showFreezeDialog:!1,showAddDialog:!1,passwordType:"password",freezeUserForm:{uid:0,freeze_reason:void 0,freeze_time:void 0},addUserForm:{username:"",password:""},freezeLoading:!1,addLoading:!1,listLoading:!0}}},u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticStyle:{height:"100%"}},[s("el-dialog",{attrs:{title:"冻结用户",visible:e.showFreezeDialog,width:"250px"},on:{"update:visible":function(t){e.showFreezeDialog=t}}},[s("el-select",{attrs:{placeholder:"请选择冻结理由"},model:{value:e.freezeUserForm.freeze_reason,callback:function(t){e.$set(e.freezeUserForm,"freeze_reason",t)},expression:"freezeUserForm.freeze_reason"}},e._l(e.Consts.freezeReasons,function(e,t){return s("el-option",{key:t,attrs:{label:e,value:t}})}),1),e._v(" "),s("el-select",{attrs:{placeholder:"请选择冻结时间"},model:{value:e.freezeUserForm.freeze_time,callback:function(t){e.$set(e.freezeUserForm,"freeze_time",t)},expression:"freezeUserForm.freeze_time"}},e._l(e.Consts.freezeTime,function(e,t){return s("el-option",{key:t,attrs:{label:e,disabled:e.disable,value:t}})}),1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.showFreezeDialog=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{loading:e.freezeLoading,type:"primary",disabled:e.disableFreezeConfirm},on:{click:e.handleFreezeConfirm}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"添加用户",visible:e.showAddDialog,width:"300px"},on:{"update:visible":function(t){e.showAddDialog=t}}},[s("el-form",{attrs:{"label-position":"left","label-width":"80px",model:e.addUserForm}},[s("el-form-item",{attrs:{label:"用户名"}},[s("el-input",{attrs:{tabindex:"1"},model:{value:e.addUserForm.username,callback:function(t){e.$set(e.addUserForm,"username",t)},expression:"addUserForm.username"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"密码"}},[s("el-input",{attrs:{type:e.passwordType,tabindex:"2"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleAddConfirm(t)}},model:{value:e.addUserForm.password,callback:function(t){e.$set(e.addUserForm,"password",t)},expression:"addUserForm.password"}}),e._v(" "),s("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[s("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.showAddDialog=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{loading:e.addLoading,type:"primary",disabled:e.disableAddConfirm},on:{click:e.handleAddConfirm}},[e._v("确 定")])],1)],1),e._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.userList.list,height:"95%","max-height":"100%"}},[s("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[s("el-form-item",{attrs:{label:"头像"}},[s("div",{staticClass:"demo-image__preview"},[s("el-image",{staticStyle:{width:"50px",height:"50px"},attrs:{src:t.row.avatar.small,"preview-src-list":[t.row.avatar.large]}})],1)]),e._v(" "),s("el-form-item",{attrs:{label:"个人描述"}},[s("span",[e._v(e._s(t.row.profile))])]),e._v(" "),s("el-form-item",{attrs:{label:"QQ"}},[s("span",[e._v(e._s(t.row.qq))])]),e._v(" "),s("el-form-item",{attrs:{label:"微信"}},[s("span",[e._v(e._s(t.row.wechat))])]),e._v(" "),s("el-form-item",{attrs:{label:"微博"}},[s("span",[e._v(e._s(t.row.weibo))])]),e._v(" "),s("el-form-item",{attrs:{label:"地区"}},[s("span",[e._v(e._s(t.row.address))])]),e._v(" "),t.row.unfreeze_time?s("el-form-item",{attrs:{label:"账户解冻时间"}},[s("span",[e._v(e._s(t.row.unfreeze_time))])]):e._e(),e._v(" "),t.row.unfreeze_time?s("el-form-item",{attrs:{label:"账户冻结原因"}},[s("span",[e._v(e._s(t.row.freeze_reason))])]):e._e(),e._v(" "),t.row.unfreeze_time?s("el-form-item",{attrs:{label:"连续登陆失败次数"}},[s("span",[e._v(e._s(t.row.login_failed_times))])]):e._e()],1)]}}])}),e._v(" "),s("el-table-column",{attrs:{align:"center",label:"UID",prop:"id"}}),e._v(" "),s("el-table-column",{attrs:{align:"center",label:"头像",prop:"avatar"},scopedSlots:e._u([{key:"default",fn:function(e){return[s("div",{staticClass:"block"},[s("el-avatar",{attrs:{size:50,src:e.row.avatar.small}})],1)]}}])}),e._v(" "),s("el-table-column",{attrs:{align:"center",label:"用户名",prop:"username"}}),e._v(" "),s("el-table-column",{attrs:{align:"center",label:"昵称",prop:"nickname"}}),e._v(" "),s("el-table-column",{attrs:{align:"center",label:"手机号",prop:"phone"}}),e._v(" "),s("el-table-column",{attrs:{align:"center",label:"邮箱",prop:"email"}}),e._v(" "),s("el-table-column",{attrs:{align:"center",label:"上次登录时间",prop:"last_login_time"}}),e._v(" "),s("el-table-column",{attrs:{align:"center",label:"注册时间",prop:"register_time"}}),e._v(" "),s("el-table-column",{attrs:{align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-tag",{attrs:{type:t.row.unfreeze_time?"danger":"success"}},[e._v(e._s(t.row.unfreeze_time?"冻结":"正常"))])]}}])}),e._v(" "),s("el-table-column",{attrs:{align:"right"},scopedSlots:e._u([{key:"header",fn:function(t){return[s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(s){return e.showAddUser(t.$index,t.row)}}},[e._v("添加用户")])]}},{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini",type:"primary",disabled:!t.row.phone},on:{click:function(s){return e.handleResetUser(t.row.id,t.$index)}}},[e._v("重置")]),e._v(" "),s("el-button",{attrs:{size:"mini",type:"warning",loading:e.freezeLoading},domProps:{textContent:e._s(t.row.unfreeze_time?"解冻":"冻结")},on:{click:function(s){return e.handleFreezeClike(t.row.id,t.$index)}}})]}}])})],1),e._v(" "),s("div",{staticStyle:{display:"flex"}},[s("el-pagination",{staticStyle:{margin:"auto"},attrs:{"hide-on-single-page":"",background:"",layout:"prev, pager, next","page-size":e.userList.limit,"page-count":e.userList.total_page,"current-page":e.userList.page},on:{"current-change":e.getUserList}})],1)],1)},staticRenderFns:[]};var f=s("VU/8")(c,u,!1,function(e){s("+jxu")},null,null);t.default=f.exports}});
//# sourceMappingURL=6.0fd33c7b3cf968927946.js.map