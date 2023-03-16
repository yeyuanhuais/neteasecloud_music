export interface FmProgram {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime?: any;
}
export interface FmBanner {
  exclusive: boolean;
  pic: string;
  targetId: number;
  targetType: number;
  typeTitle: string;
  url: string;
}

export interface FmCatelist {
  id: number;
  name: string;
  pic56x56Id: number;
  pic56x56IdStr: string;
  pic56x56Url: string;
  pic84x84Id: number;
  pic84x84IdUrl: string;
  pic96x96Id: number;
  pic96x96IdStr: string;
  pic96x96Url: string;
  picIPad: number;
  picIPadStr: string;
  picIPadUrl: string;
  picMacId: string;
  picMacUrl: string;
  picPCBlack: number;
  picPCBlackStr: string;
  picPCBlackUrl: string;
  picPCWhite: number;
  picPCWhiteStr: string;
  picPCWhiteUrl: string;
  picUWPId: string;
  picUWPUrl: string;
  picWeb: number;
  picWebStr: string;
  picWebUrl: string;
}

export interface FmProgramRecommend {
  adIconInfo: any;
  alg: string;
  auditDisPlayStatus: number;
  auditStatus: number;
  authDTO: any;
  bdAuditStatus: number;
  blurCoverUrl: string;
  buyed: boolean;
  canReward: true;
  categoryId: number;
  categoryName: any;
  channels: string[];
  commentCount: number;
  commentThreadId: string;
  coverId: number;
  coverUrl: string;
  createEventId: number;
  createTime: number;
  description: string;
  disPlayStatus: any;
  dj: DJ;
  djPlayRecordVo: any;
  duration: number;
  existLyric: boolean;
  feeScope: number;
  h5Links: any;
  icon: any;
  id: number;
  isPublish: true;
  likedCount: number;
  listenerCount: number;
  liveInfo: any;
  mainSong: MainSong;
  mainTrackId: number;
  name: string;
  privacy: boolean;
  programDesc: any;
  programFeeType: number;
  pubStatus: number;
  radio: Radio;
  reason: string;
  recommended: boolean;
  reward: boolean;
  scheduledPublishTime: number;
  score: number;
  secondCategoryId: number;
  secondCategoryName: any;
  serialNum: number;
  shareCount: number;
  smallLanguageAuditStatus: number;
  songs: any;
  subscribed: boolean;
  subscribedCount: number;
  titbitImages: any;
  titbits: any;
  trackCount: number;
  videoInfo: any;
}

export interface DJ {
  accountStatus: number;
  anchor: true;
  authStatus: number;
  authenticationTypes: number;
  authority: number;
  avatarDetail: any;
  avatarImgId: number;
  avatarImgIdStr: string;
  avatarImgId_str: string;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundImgIdStr: string;
  backgroundUrl: string;
  birthday: number;
  brand: string;
  city: number;
  defaultAvatar: boolean;
  description: string;
  detailDescription: string;
  djStatus: number;
  expertTags: any;
  experts: any;
  followed: boolean;
  gender: number;
  mutual: boolean;
  nickname: string;
  province: number;
  remarkName: any;
  signature: string;
  userId: number;
  userType: number;
  vipType: number;
}

export interface MainSong {
  album: Album;
  alias: any;
  artists: Artists[];
  audition: any;
  bMusic: BLMMusic[];
  commentThreadId: string;
  copyFrom: string;
  copyright: number;
  copyrightId: number;
  crbt: any;
  dayPlays: number;
  disc: string;
  duration: number;
  fee: number;
  ftype: number;
  hMusic: any;
  hearTime: number;
  id: number;
  lMusic: BLMMusic;
  mMusic: BLMMusic;
  mark: number;
  mp3Url: any;
  mvid: number;
  name: string;
  no: number;
  noCopyrightRcmd: any;
  playedNum: number;
  popularity: 5;
  position: number;
  ringtone: string;
  rtUrl: any;
  rtUrls: any;
  rtype: number;
  rurl: any;
  score: number;
  sign: any;
  starred: boolean;
  starredNum: number;
  status: number;
  transName: any;
}
export interface Radio {
  buyed: boolean;
  category: string;
  categoryId: number;
  createTime: number;
  desc: string;
  descPicList: DescPicList[];
  discountPrice: any;
  dj: any;
  dynamic: boolean;
  feeScope: number;
  finished: boolean;
  icon: any;
  id: number;
  intervenePicId: number;
  intervenePicUrl: string;
  lastProgramCreateTime: number;
  lastProgramId: number;
  lastProgramName: any;
  liveInfo: any;
  manualTagsDTO: any;
  name: string;
  originalPrice: number;
  picId: number;
  picUrl: string;
  playCount: number;
  price: number;
  privacy: boolean;
  programCount: number;
  purchaseCount: number;
  radioFeeType: number;
  secondCategory: string;
  shortName: any;
  subCount: number;
  subed: boolean;
  taskId: number;
  underShelf: boolean;
  videos: any;
}
export interface Album {
  alias: any;
  artist: any;
  artists: Artists[];
  blurPicUrl: string;
  briefDesc: string;
  commentThreadId: string;
  company: any;
  companyId: number;
  copyrightId: number;
  description: string;
  id: number;
  mark: number;
  name: string;
  pic: number;
  picId: number;
  picId_str: string;
  picUrl: string;
  publishTime: number;
  size: number;
  songs: any;
  status: number;
  subType: any;
  tags: string;
  transName: any;
  type: any;
}
export interface Artists {
  albumSize: number;
  alias: any;
  briefDesc: string;
  id: number;
  img1v1Id: number;
  img1v1Url: string;
  musicSize: number;
  name: string;
  picId: number;
  picUrl: string;
  topicPerson: number;
  trans: string;
}

export interface BLMMusic {
  bitrate: number;
  dfsId: number;
  extension: string;
  id: number;
  name: any;
  playTime: number;
  size: number;
  sr: number;
  volumeDelta: number;
}
export interface DescPicList {
  content: string;
  height: number;
  id: number;
  type: number;
  width: number;
}

export interface FmToplist {
  category: string;
  categoryId: number;
  createTime: number;
  creatorName: string;
  dj: DJ;
  feeScope: number;
  id: number;
  lastRank: number;
  name: string;
  picUrl: string;
  playCount: number;
  programCount: number;
  radioFeeType: number;
  rank: number;
  rcmdtext: string;
  score: number;
  subCount: number;
}

export interface FmToplistAnchor {
  avatarDetail: {
    identityIconUrl: string;
    identityLevel: number;
    userType: number;
  };
  avatarUrl: string;
  id: number;
  lastRank: number;
  liveId: number;
  liveStatus: number;
  liveType: number;
  mainAuthDesc: string;
  nickName: string;
  rank: number;
  roomNo: number;
  score: number;
  userFollowedCount: number;
  userType: number;
}
