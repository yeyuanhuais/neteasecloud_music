import { ref, computed } from "vue";
import { defineStore } from "pinia";
import _axios from "@/plugins/axios";
import type { UserAccount, UserProfile } from "@/models/user";
import { ElMessage } from "element-plus";

export const useUserStore = defineStore("user", () => {
  const profile = ref<UserProfile>({} as UserProfile); //用户信息
  const showLogin = ref<boolean>(false); //登录弹窗
  const isLogin = computed(() => profile.value?.userId > 0); //是否登录
  /* ======== 检查登录状态 ======== */
  const checkLogin = async () => {
    const { data } = await _axios.get<{ data: { profile: UserProfile; account: UserAccount; code: number } }>("/login/status").catch(err => {});
    if (data.code === 200) {
      profile.value = data.profile;
      showLogin.value = false;
    }
  };
  /* ======== 退出登录 ======== */
  const onLogout = async () => {
    await _axios.get<{ profile: UserProfile }>("/logout").catch(err => {});
    profile.value = {} as UserProfile;
  };
  /* ======== 手机号登录 需验证后续无法实现 ======== */
  const onLoginPhone = async (params: any) => {
    const { code, msg } = await _axios.get<{ code: number; cookie: string; message: string }>("/login/cellphone", { params }).catch(err => {});
    if (code === 200) {
      checkLogin();
    } else {
      ElMessage({
        showClose: true,
        message: msg,
        type: "error",
        grouping: true,
      });
    }
  };
  /* ======== 邮箱登录 需验证后续无法实现 ======== */
  const onLoginEmail = async (params: any) => {
    const { code, msg } = await _axios.get<{ code: number; cookie: string; message: string }>("/login", { params }).catch(err => {});
    if (code === 200) {
      checkLogin();
    } else {
      ElMessage({
        showClose: true,
        message: msg,
        type: "error",
        grouping: true,
      });
    }
  };

  return { profile, checkLogin, isLogin, showLogin, onLogout, onLoginPhone, onLoginEmail };
});
