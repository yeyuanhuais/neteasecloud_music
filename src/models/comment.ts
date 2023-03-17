export interface Comments {
  beReplied: any;
  commentId: number;
  commentLocationType: number;
  content: string;
  contentResource: any;
  decoration: any;
  expressionUrl: any;
  grade: any;
  ipLocation: {
    ip: any;
    location: string;
    userId: any;
  };
  liked: boolean;
  likedCount: number;
  needDisplayTime: boolean;
  parentCommentId: number;
  pendantData: any;
  repliedMark: any;
  richContent: any;
  showFloorComment: any;
  status: number;
  time: number;
  timeStr: string;
  user: {
    anonym: number;
    authStatus: number;
    avatarDetail: any;
    avatarUrl: string;
    commonIdentity: any;
    experts: any;
    expertTags: any;
    followed: boolean;
    liveInfo: any;
    locationInfo: any;
    mutual: boolean;
    nickname: string;
    remarkName: any;
    socialUserId: any;
    target: any;
    userId: number;
    userType: number;
    vipRights: {
      associator: any;
      musicPackage: any;
      redplus: any;
      redVipAnnualCount: number;
      redVipLevel: number;
    };
    vipType: number;
  };
  userBizLevels: any;
  children: any;
  show: boolean;
}
