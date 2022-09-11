<template>
  <div>
    <van-nav-bar title="登录" class="nav-bar" />
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label><span class="toutiao toutiao-shouji"></span></template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
        ><template #label
          ><span class="toutiao toutiao-yanzhengma"></span
        ></template>
        <template #button>
          <van-button
            block
            type="default"
            round
            size="small"
            class="btn"
            native-type="button"
            v-if="isShowCodeBtn"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="3 * 1000"
            format="ss秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { codeRules, mobileRules } from './rule'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit(values) {
      // forbidClick 禁止点击
      // duration 展示的时长，为0，一直展示
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        // console.log(data, a.a)
        console.log(data.data)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分一下失败:提示用户手机号和验证码
        // 如果是手机号或者验证码错了，用户能知道
        // error:1.js抛的错 2.axios封装的error对象

        // axios封装的error对象
        // -error.response.data 后端返回的数据
        // -error.response.status 后端返回的状态码

        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // 1.js导致错误,2.507
          console.dir(error)
          this.$toast.clear()
          throw error
        }
      }
    },
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        this.isShowCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// scoped样式作用域当前的组件
// vue-cli 提供了语法 :deep() 深度选择器
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-field__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
</style>
