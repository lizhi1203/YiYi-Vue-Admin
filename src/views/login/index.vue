<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名：admin / user">
        <template #prefix>
          <el-icon class="el-input__inner"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" placeholder="密码：123456" show-password autocomplete="new-password">
        <template #prefix>
          <el-icon class="el-input__inner"><lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="CircleClose" round @click="resetForm(loginFormRef)" size="large">重置</el-button>
    <el-button type="primary" round :icon="UserFilled" @click="login(loginFormRef)" size="large" :loading="loading">登录</el-button>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { GlobalStore } from '@/stores/index'
  import { initDynamicRouter } from '@/router/modules/dynamicRouter'
  import { Login } from '@/api/interface/index'
  import { CircleClose, UserFilled } from '@element-plus/icons-vue'
  import { ElNotification } from 'element-plus'
  import type { ElForm } from 'element-plus'
  import { loginApi } from '@/api/modules/login'
  import md5 from "js-md5"
  import { HOME_URL } from '@/config/config'
  import { getTimeState } from '@/utils/util'

  const router = useRouter()
  const globalStore = GlobalStore()
  const loginForm = reactive<Login.ReqLoginForm>({ username: '', password: '' })
  const loginRules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  })
  type FormInstance = InstanceType<typeof ElForm>
  const loginFormRef = ref<FormInstance>()
  const loading = ref(false)

  const login = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async(valid) => {
      if (!valid) return
      loading.value = true
      try {
        const { data }: any = await loginApi({ ...loginForm, password: md5(loginForm.password)})
        globalStore.setToken(data.access_token)

        await initDynamicRouter()

        router.push(HOME_URL)
        ElNotification({
          title: getTimeState(),
          message: "欢迎登录 YIYI-Admin",
          type: "success",
          duration: 3000
        });
      } finally {
        loading.value = false
      }
    })
  }

  const resetForm = (elForm: FormInstance | undefined) => {
    if (!elForm) return
    elForm.resetFields()
  }

  onMounted(() => {
    document.onkeydown = (e: any) => {
      e = window.event || e;
      if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
        if (loading.value) return;
        login(loginFormRef.value)
      }
    }
  })
</script>

<style lang="scss" scoped>

</style>