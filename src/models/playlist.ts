export interface PlaylistDetail {
  adType: number;
  algTags: any;
  backgroundCoverId: number;
  backgroundCoverUrl: any;
  bannedTrackIds: any;
  cloudTrackCount: number;
  commentCount: number;
  commentThreadId: string;
  copied: boolean;
  coverImgId: number;
  coverImgId_str: string;
  coverImgUrl: string;
  createTime: number;
  creator: Creator;
  description: string;
  englishTitle: any;
  gradeStatus: string;
  highQuality: boolean;
  historySharedUsers: any;
  id: number;
  mvResourceInfos: any;
  name: string;
  newImported: boolean;
  officialPlaylistType: any;
  opRecommend: boolean;
  ordered: boolean;
  playCount: number;
  privacy: number;
  relateResType: any;
  remixVideo: any;
  score: any;
  shareCount: number;
  sharedUsers: any;
  specialType: number;
  status: number;
  subscribed: boolean;
  subscribedCount: number;
  subscribers: Subscribers[];
  tags: string[];
  titleImage: number;
  titleImageUrl: any;
  trackCount: number;
  trackIds: TrackIds[];
  trackNumberUpdateTime: number;
  tracks: Tracks[];
  trackUpdateTime: number;
  updateFrequency: any;
  updateTime: number;
  userId: number;
  videoIds: any;
  videos: any;
}
export interface Creator {
  accountStatus: number;
  anchor: boolean;
  authenticationTypes: number;
  authority: number;
  authStatus: number;
  avatarDetail: {
    identityIconUrl: string;
    identityLevel: number;
    userType: number;
  };
  avatarImgId: number;
  avatarImgId_str: string;
  avatarImgIdStr: string;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundImgIdStr: string;
  backgroundUrl: string;
  birthday: number;
  city: number;
  defaultAvatar: boolean;
  description: string;
  detailDescription: string;
  djStatus: number;
  experts: any;
  expertTags: any;
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
export interface Subscribers {
  accountStatus: 0;
  anchor: false;
  authenticationTypes: 0;
  authority: 0;
  authStatus: 0;
  avatarDetail: null;
  avatarImgId: 109951165307893900;
  avatarImgId_str: "109951165307893908";
  avatarImgIdStr: "109951165307893908";
  avatarUrl: "http://p1.music.126.net/4480gzshkek0asqjb8Tkrg==/109951165307893908.jpg";
  backgroundImgId: 109951165409198640;
  backgroundImgIdStr: "109951165409198640";
  backgroundUrl: "http://p1.music.126.net/yXOwBUlOq28TCzdTBxrWjw==/109951165409198640.jpg";
  birthday: 0;
  city: 110101;
  defaultAvatar: false;
  description: "";
  detailDescription: "";
  djStatus: 0;
  experts: null;
  expertTags: null;
  followed: false;
  gender: 2;
  mutual: false;
  nickname: "哈卡拉修宁Dian";
  province: 110000;
  remarkName: null;
  signature: "";
  userId: 1305958156;
  userType: 0;
  vipType: 11;
}
export interface TrackIds {
  alg: null;
  at: 1678850057290;
  f: null;
  id: 2030197956;
  rcmdReason: "";
  sc: null;
  sr: null;
  t: 0;
  uid: 1;
  v: 4;
}
export interface Tracks {}

export interface PlaylistProgram {
  alg: string;
  artistId: string;
  artistName: string;
  canDislike: boolean;
  highQuality: boolean;
  copywriter: string;
  duration: number;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  trackCount: number;
  subed: boolean;
  trackNumberUpdateTime?: any;
  type?: any;
}

export interface PlaylistTrackAll {}
