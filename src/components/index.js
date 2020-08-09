import Vue from 'vue'
import AttachFileTag from './Activity/AttachFileTag'
import ActivityContextTag from './Activity/ActivityContextTag'
import ActivityStatusTag from './Activity/ActivityStatusTag'

import SocialAccountsTag from './User/SocialAccountsTag'
import UsernameTag from './User/UsernameTag'
import UserStatusTag from './User/UserStatusTag'
import UserOptions from './User/UserOptions'

import ReplyContextTag from './Comment/ReplyContextTag'
import CommentStatusTag from './Comment/CommentStatusTag'

Vue.component('activity-attach-file', AttachFileTag)
Vue.component('activity-context', ActivityContextTag)
Vue.component('activity-status', ActivityStatusTag)

Vue.component('user-social-accounts', SocialAccountsTag)
Vue.component('user-username', UsernameTag)
Vue.component('user-status', UserStatusTag)
Vue.component('user-options', UserOptions)

Vue.component('comment-reply-context', ReplyContextTag)
Vue.component('comment-status', CommentStatusTag)
