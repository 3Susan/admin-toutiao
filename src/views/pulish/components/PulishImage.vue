<template>
  <div class='pulishImage-container' @click="showDialog">
    <div class="img-outside">
      <img :src="urlAddress" ref="outsideImg">
    </div>
    <el-dialog
      title="选择封面"
      :visible.sync="show"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <susan-image :headerShow="false"
            :iconShow="false"
            :UpdateLoaderShow="false"
            ref="susanImage"
          ></susan-image>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" ref="file" @change="fileChange">
          <div class="img-inner">
            <img ref="innerImg">
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="onConfirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { updateImage } from '@/api/img'
import ImageOne from '@/views/image'
export default {
  name: 'pulishImageIndex',
  data () {
    return {
      show: false,
      activeName: ''
    }
  },
  props: ['urlAddress'],
  components: { 'susan-image': ImageOne },
  methods: {
    showDialog () {
      this.show = true
    },
    fileChange () {
      const file = this.$refs.file.files[0]
      const url = window.URL.createObjectURL(file)
      this.$refs.innerImg.src = url
    },
    onConfirmImage () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请上传文件')
        } else {
          const url = window.URL.createObjectURL(file)
          this.$refs.outsideImg.src = url
          const fd = new FormData()
          fd.append('image', file)
          updateImage(fd).then(res => {
            this.show = false
            this.$emit('emitImages', url)
          })
        }
      } else {
        const index = this.$refs.susanImage.selected
        const url = this.$refs.susanImage.AllImages[index].url
        if (!url) {
          this.$message('请选择封面')
        } else {
          this.show = false
          this.$refs.outsideImg.src = url
          this.$emit('emitImages', url)
        }
      }
    }
  }
}
</script>
<style lang='less' scoped>
  .pulishImage-container {
    .img-outside {
      width: 120px;
      height: 120px;
      border: 1px dashed rgb(153, 69, 0);
      img {
        max-width: 100%;
        height: 120px;
      }
    }
  }
  .img-inner {
    width: 120px;
    height: 120px;
    box-sizing: content-box;
    border: 1px dashed rgb(153, 69, 0);
    img {
        max-width: 100%;
        height: 120px;
      }
  }
</style>
