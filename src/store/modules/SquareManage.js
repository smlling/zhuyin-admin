import request from '@/utils/request'

const getDefaultState = () => {
    return {
        activityList: {
            list: []
        },
        attachFiles: {
            small: {},
            large: {}
        },
        commentList: {
            list: []
        },
        replyList: {}
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        state = Object.assign({}, getDefaultState())
    },
    SET_STATE: (state, data) => {
        state.activityList = Object.assign({}, data)
    },
    SET_SMALL_BLOB: (state, data) => {
        const { activityId, blob } = data
        if (state.attachFiles.small[activityId]) {
            Object.assign(state.attachFiles.small[activityId], blob)
        } else {
            state.attachFiles.small[activityId] = Object.assign({}, blob)
        }
    },
    SET_LARGE_BLOB: (state, data) => {
        const { activityId, blob } = data
        if (state.attachFiles.large[activityId]) {
            Object.assign(state.attachFiles.large[activityId], blob)
        } else {
            state.attachFiles.large[activityId] = Object.assign({}, blob)
        }
    },
    REVOKE_BLOBS: (state) => {
        for (let activityId in state.attachFiles.small) {
            for (let fileId in state.attachFiles.small[activityId]) {
                URL.revokeObjectURL(state.attachFiles.small[activityId][fileId])
            }
        }
        for (let activityId in state.attachFiles.large) {
            for (let fileId in state.attachFiles.large[activityId]) {
                URL.revokeObjectURL(state.attachFiles.large[activityId][fileId])
            }
        }
    },
    UPDATE_ACTIVITY_ITEM: (state, data) => {
        const { tableIndex, activityInfo } = data
        Object.assign(state.activityList.list[tableIndex], activityInfo)
    },
    SET_COMMENT_LIST: (state, data) => {
        state.commentList = Object.assign({}, data)
    },
    SET_REPLY_LIST: (state, data) => {
        const { rootId, replyList } = data
        state.replyList[rootId] = replyList
    }
}

const actions = {
    // 获取动态列表
    activityList({ commit }, params) {
        return new Promise((resolve, reject) => {
            request({
                url: 'SquareManage/activity/list',
                method: 'get',
                params: params
            }).then(response => {
                const { data } = response
                commit('SET_STATE', data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取文件
    getFile({ commit }, params) {
        const { url, fetchType, activityId, fileId } = params
        return new Promise((resolve, reject) => {
            // 先从blob中找 没有再获取
            if (state.attachFiles[fetchType].hasOwnProperty(activityId) && state.attachFiles[fetchType][activityId].hasOwnProperty(fileId)) {
                resolve(state.attachFiles[fetchType][activityId][fileId])
            } else {
                request({
                    url: url,
                    method: 'get',
                    responseType: 'blob'
                })
                    .then(blob => {
                        let blobURL = URL.createObjectURL(blob)
                        if (fetchType === 'small') {
                            commit('SET_SMALL_BLOB', { blob: { [fileId]: blobURL }, activityId: activityId })
                        } else if (fetchType === 'large') {
                            // commit('SET_LARGE_BLOB', fileBlobs)
                            commit('SET_LARGE_BLOB', { blob: { [fileId]: blobURL }, activityId: activityId })
                        }
                        resolve(blobURL)
                    })
            }
        })
    },
    // 删除动态
    deleteActivity({ commit }, params) {
        const { activityId, tableIndex, deleteReason } = params
        // console.log(tableIndex)
        return new Promise((resolve, reject) => {
            request({
                url: 'SquareManage/activity/delete',
                method: 'get',
                params: {
                    id: activityId,
                    reason: deleteReason
                }
            }).then(response => {
                if (tableIndex >= 0) {
                    commit('UPDATE_ACTIVITY_ITEM', { tableIndex: tableIndex, activityInfo: response.data })
                    resolve(response)
                } else {
                    resolve(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取评论列表
    commentList({ commit }, params) {
        return new Promise((resolve, reject) => {
            request({
                url: 'SquareManage/comment/list',
                method: 'get',
                params: params
            }).then(response => {
                commit('SET_COMMENT_LIST', response.data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取评论列表
    replyList({ commit }, rootId) {
        return new Promise((resolve, reject) => {
            request({
                url: 'SquareManage/comment/reply/list',
                method: 'get',
                params: {
                    id: rootId
                }
            }).then(response => {
                commit('SET_REPLY_LIST', { rootId: rootId, replyList: response.data })
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 删除评论/回复
    deleteComment({ commit }, params) {
        const { commentId, deleteReason } = params
        return new Promise((resolve, reject) => {
            request({
                url: 'SquareManage/comment/delete',
                method: 'get',
                params: {
                    id: commentId,
                    reason: deleteReason
                }
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
