const getters = {
    adminInfo: state => state.Home,
    dashboard: state => state.SystemStatus,
    userList: state => state.UserManage.userList,
    activityList: state => state.SquareManage.activityList,
    attachFiles: state => state.SquareManage.attachFiles,
    commentList: state => state.SquareManage.commentList,
    replyList: state => state.SquareManage.replyList,
    adminList: state => state.SystemManage.adminList,
    logList: state => state.SystemManage.logList
}
export default getters
