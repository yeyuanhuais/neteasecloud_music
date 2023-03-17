export interface SongUrl {
  br: number;
  canExtend: boolean;
  code: number;
  effectTypes: any;
  encodeType: string;
  expi: number;
  fee: number;
  flag: number;
  freeTimeTrialPrivilege: {
    remainTime: number;
    resConsumable: boolean;
    type: number;
    userConsumable: boolean;
  };
  freeTrialInfo: any;
  freeTrialPrivilege: {
    cannotListenReason: any;
    listenType: any;
    resConsumable: boolean;
    userConsumable: boolean;
  };
  gain:number;
  id: number;
  level: string;
  md5: string;
  payed: number;
  peak: number;
  podcastCtrp: any;
  rightSource: number;
  size: number;
  time: number;
  type: string;
  uf: any;
  url: string;
  urlSource: number;
}