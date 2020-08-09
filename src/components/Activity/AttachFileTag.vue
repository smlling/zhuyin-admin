<template>
    <div>
        <el-dialog :visible.sync="image.visible" append-to-body fullscreen>
            <ImagePreview :path="image.src" :isVisible.sync="image.visible"></ImagePreview>
        </el-dialog>
        <el-dialog
            title="视频查看"
            :visible.sync="video.visible"
            :center="true"
            append-to-body
            destroy-on-close
        >
            <video
                controls
                :src="video.src"
                :poster="video.poster"
                style="width: 100%; border-radius: 10px; box-shadow: 0 0 20px 0"
            ></video>
        </el-dialog>
        <el-popover placement="bottom" trigger="click" :disabled="attachFiles.image_count === 0">
            <div v-for="(thumb, index) in image.thumb" :key="index" style="display: inline">
                <el-image
                    style="cursor:pointer"
                    :src="thumb.src"
                    fit="fill"
                    @click="handleFullscreenImage(thumb.id)"
                ></el-image>
            </div>
            <el-tag
                slot="reference"
                style="cursor: pointer"
                type="success"
                @mouseenter.native="handleGetThumbs('image')"
            >{{ '图片:' + attachFiles.image_count }}</el-tag>
        </el-popover>
        <el-popover placement="bottom" trigger="click" :disabled="attachFiles.video_count === 0">
            <div v-for="(thumb, index) in image.thumb" :key="index" style="display: inline">
                <el-image
                    :src="thumb.src"
                    style="cursor:pointer"
                    fit="fill"
                    @click="handlePlayVideo(thumb.id)"
                ></el-image>
            </div>
            <el-tag
                slot="reference"
                style="cursor: pointer"
                type="success"
                @mouseenter.native="handleGetThumbs('video')"
            >{{ '视频:' + attachFiles.video_count }}</el-tag>
        </el-popover>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

// attahcFiles: {
//     "image_count": 2,
//     "video_count": 0,
//     "images_list": {
//         "9": {
//             "large": "https://wx.lwting.top:65002/admin/SquareManage/activity/attach/9/large",
//             "small": "https://wx.lwting.top:65002/admin/SquareManage/activity/attach/9/small"
//         },
//         "10": {
//             "large": "https://wx.lwting.top:65002/admin/SquareManage/activity/attach/10/large",
//             "small": "https://wx.lwting.top:65002/admin/SquareManage/activity/attach/10/small"
//         }
//     },
//     "videos_list": []
// }
export default {
    name: 'AttachFileTag',
    props: {
        attachFiles: {
            type: Object,
            required: true
        },
        activityId: {
            type: Number,
            required: true
        }
    },
    computed: {
        ...mapGetters({
            attachFileBlobs: 'attachFiles'
        })
    },
    methods: {
        // 获取附件
        getFile(url, fetchType, activityId, fileId) {
            return this.$store.dispatch('SquareManage/getFile', {
                url: url,
                fetchType: fetchType,
                activityId: activityId,
                fileId: fileId
            })
        },
        handleGetThumbs(type) {
            this.image.thumb.length = 0
            let urlList = {}
            if (type === 'image') {
                urlList = this.attachFiles.images_list
            } else if (type === 'video') {
                urlList = this.attachFiles.videos_list
            }
            for (let fileId in urlList) {
                this.getFile(
                    urlList[fileId].small,
                    'small',
                    this.activityId,
                    fileId
                ).then(blobURL => {
                    let thumb = {
                        id: fileId,
                        src: blobURL
                    }
                    this.image.thumb.push(thumb)
                })
            }
        },
        handleFullscreenImage(fileId) {
            this.image.visible = true
            this.getFile(
                this.attachFiles.images_list[fileId].large,
                'large',
                this.activityId,
                fileId
            ).then(blobURL => {
                console.log(blobURL)
                this.image.src = blobURL
            })
        },
        handlePlayVideo(fileId) {
            // eslint-disable-next-line standard/computed-property-even-spacing
            this.video.poster = this.attachFileBlobs.small[this.activityId][
                fileId
            ]
            this.video.visible = true
            this.getFile(
                this.attachFiles.videos_list[fileId].large,
                'large',
                this.activityId,
                fileId
            ).then(blobURL => {
                this.video.src = blobURL
            })
        }
    },
    data() {
        return {
            image: {
                visible: false,
                src: '',
                thumb: []
            },
            video: {
                visible: false,
                src: undefined,
                poster: undefined
            }
        }
    }
}
</script>
