<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import _axios from "@/plugins/axios";
import { ElMessage, type FormInstance } from "element-plus";
import { useCookies } from "vue3-cookies";
import { useIntervalFn } from "@vueuse/core";
import { Md5 } from "ts-md5";

const { cookies } = useCookies();
const isLoading = ref(false);
const qrKey = ref("");
const qrCreateUrl = ref("");
const status = ref();
const timing = ref(0); // 验证码倒计时
const loginType = ref<number>(0); // 登录方式 0-扫码，1-账号密码，2-邮箱登录,3-验证码登录
const { showLogin } = storeToRefs(useUserStore());
const { onLoginPhone, onLoginEmail, checkLogin } = useUserStore();
let timer: any;
const formRef = ref<FormInstance>();
const form = reactive({ phone: "", password: "", captcha: "", email: "" });
const { pause, resume } = useIntervalFn(
  () => {
    if (timing.value <= 0) {
      // 停止定时任务
      pause();
    } else {
      // 单次定时任务执行的回调
      timing.value--;
    }
  },
  1000,
  {
    // 默认不开启定时任务
    immediate: false,
  }
);
/* ======== 账号手机号邮箱提交 ======== */
const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      if (loginType.value === 3) {
        onLoginPhone({ phone: form.phone, captcha: form.captcha });
      } else if (loginType.value === 1) {
        onLoginPhone({ phone: form.phone, md5_password: Md5.hashStr(form.password) });
      } else if (loginType.value === 2) {
        onLoginEmail({ email: form.email, md5_password: Md5.hashStr(form.password) });
      }
    } else {
      return false;
    }
  });
};
/* ======== 发送验证码 ======== */
const sendCaptcha = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validateField(["phone"], async valid => {
    if (valid) {
      if (timing.value === 0) {
        timing.value = 60;
        resume();
      } else {
        return;
      }
      const { code, msg } = await _axios.get<{ code: number; msg: string; data: boolean }>("/captcha/sent", { params: { phone: form.phone } });
      if (code !== 200) {
        ElMessage({
          showClose: true,
          message: msg,
          type: "warning",
        });
      }
    }
  });
};

/* ======== 二维码 key 生成接口 ======== */
const getQrKey = async () => {
  isLoading.value = true;
  const { data, code } = await _axios.get<{ code: number; data: { code: number; unikey: string } }>("/login/qr/key");
  if (code === 200) {
    qrKey.value = data.unikey;
    getQrCreate(data.unikey);
  }
};
/* ======== 二维码生成接口 ======== */
const getQrCreate = async (key: string) => {
  const { data, code } = await _axios.get<{ code: number; data: { qrimg: string; qrurl: string } }>("/login/qr/create", { params: { key, qrimg: true } });
  if (code === 200) {
    qrCreateUrl.value = data.qrimg;
    isLoading.value = false;
    loopQrCheck(key);
  }
};
/* ======== 二维码检测扫码状态接口 ======== */
const loopQrCheck = async (key: string) => {
  timer = setInterval(async () => {
    const { code, cookie } = await _axios.get<{ code: number; cookie: string; message: string; avatarUrl: string; nickname: string }>("/login/qr/check", { params: { key } });
    if (!timer) return;
    status.value = code;
    if (code === 803) {
      clearInterval(timer);
      ElMessage({
        showClose: true,
        message: "授权登录成功",
        type: "success",
      });
      showLogin.value = false;
      status.value = "";
      cookies.set("cookie", cookie);
      timer = undefined;
      checkLogin();
    } else if (code === 800) {
      clearInterval(timer);
      ElMessage({
        showClose: true,
        message: "二维码已过期，请刷新",
        type: "warning",
      });
      timer = undefined;
    }
  }, 2000);
};
/* ======== 重新获取二维码 ======== */
const refreshClick = () => {
  qrCreateUrl.value = "";
  status.value = "";
  getQrKey();
};

onMounted(() => {
  if (loginType.value === 0) getQrKey();
});

watch(showLogin, val => {
  if (val) {
    if (loginType.value === 0) getQrKey();
  } else {
    clearInterval(timer);
  }
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
<template>
  <el-dialog v-model="showLogin" title="" width="25%" center destroy-on-close>
    <div>
      <div class="flex flex-col justify-between items-center" v-if="loginType === 0">
        <p class="mt-3 text-xl">扫码登录</p>
        <div v-loading="isLoading" class="relative mt-3" v-if="status !== 802">
          <div><img :src="qrCreateUrl" alt="二维码" height="200" width="200" v-show="!isLoading" /></div>
          <div v-show="isLoading" style="width: 200px; height: 200px"></div>
          <div v-if="status === 800" class="flex absolute inset-0 justify-center bg-black/90">
            <div class="text-white">
              <p>二维码失效</p>
              <el-button type="info" link size="small" @click="refreshClick" class="mt-4">点击刷新</el-button>
            </div>
          </div>
          <p class="mt-3">
            <span>使用</span>
            <span class="text-sky-500">网易云音乐APP</span>
            <span>扫码登录</span>
          </p>
        </div>
        <div v-if="status === 802" class="mt-5">
          <el-result icon="success" title="扫码成功" sub-title="请在手机上确认登录"> </el-result>
        </div>
      </div>
      <div class="flex flex-col justify-between items-center" v-else>
        <p class="mt-3 text-xl">{{ loginType === 2 ? "邮箱登录" : loginType === 3 ? "验证码登录" : loginType === 1 ? "账号登录" : "登录" }}</p>
        <div class="relative mt-5 w-10/12">
          <el-form ref="formRef" :model="form">
            <el-form-item prop="phone" :rules="[{ required: true, message: '请输入手机号', trigger: 'blur' }]" v-if="loginType === 1 || loginType === 3">
              <el-input placeholder="手机号" v-model.number="form.phone" />
            </el-form-item>
            <el-form-item prop="email" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }]" v-if="loginType === 2">
              <el-input placeholder="163网易邮箱" v-model.number="form.email" />
            </el-form-item>
            <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]" v-if="loginType === 1 || loginType === 2">
              <el-input placeholder="密码" v-model="form.password" />
            </el-form-item>
            <el-form-item prop="captcha" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]" v-if="loginType === 3">
              <el-input placeholder="验证码" v-model="form.captcha" class="input-with-button">
                <template #append>
                  <el-button @click="sendCaptcha(formRef)" type="primary" class="w-full">{{ timing === 0 ? "发送验证码" : `${timing}s后重新获取` }}</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submit(formRef)" type="primary" class="w-full">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="flex justify-around mt-5">
        <el-button link disabled class="hover-text" v-if="loginType !== 0" @click="loginType = 0">扫码登录</el-button>
        <el-button link disabled class="hover-text" v-if="loginType !== 1" @click="loginType = 1">账号登录</el-button>
        <el-button link disabled class="hover-text" v-if="loginType !== 3" @click="loginType = 3">验证码登录</el-button>
        <el-button link disabled class="hover-text" v-if="loginType !== 2" @click="loginType = 2">邮箱登录</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<style lang="scss" scoped>
.input-with-button {
  ::v-deep(.el-input-group__append) {
    padding: 0;
    width: 80%;
    @apply bg-emerald-400 text-white;
  }
}
</style>
