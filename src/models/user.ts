export interface UserProfile {
  userId: number;
  userType: number;
  nickname: string;
  avatarImgId: number;
  avatarUrl: string; //头像Url
  backgroundImgId: number;
  backgroundUrl: string; //背景图片
  signature?: any;
  createTime: number;
  userName: string;
  accountType: number; //账号类型
  shortUserName: string;
  birthday: number;
  authority: number;
  gender: number;
  accountStatus: number; //账号状态
  province: number;
  city: number;
  authStatus: number;
  description?: any;
  detailDescription?: any;
  defaultAvatar: boolean;
  expertTags?: any;
  experts?: any;
  djStatus: number;
  locationStatus: number;
  vipType: number;
  followed: boolean;
  mutual: boolean;
  authenticated: boolean;
  lastLoginTime: number;
  lastLoginIP: string;
  remarkName?: any;
  viptypeVersion: number;
  authenticationTypes: number;
  avatarDetail?: any; //头像详情
  anchor: boolean;
}

export interface UserAccount {
  anonimousUser: boolean;
  ban: number;
  baoyueVersion: number;
  createTime: any;
  donateVersion: number;
  id: any;
  paidFee: false;
  status: number;
  tokenVersion: number;
  type: number;
  userName: string;
  vipType: number;
  whitelistAuthority: number;
}
