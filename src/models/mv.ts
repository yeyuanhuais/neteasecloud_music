export interface Artists {
  id: number;
  name: string;
}

export interface MvProgram {
  alg: string;
  artistId: string;
  artistName: string;
  artists: Artists[];
  canDislike: boolean;
  copywriter: string;
  duration: number;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  subed: boolean;
  trackNumberUpdateTime?: any;
  type?: any;
}
export interface MvUrl {
  id: number;
  url: string;
  r: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  fee: number;
  mvFee: number;
  st: number;
  promotionVo?: any;
  msg: string;
}

export interface SimiMv {
  alg: string;
  artistId: number;
  artistName: string;
  artists: Artists;
  briefDesc: string;
  cover: string;
  desc: any;
  duration: number;
  id: number;
  mark: number;
  name: string;
  playCount: number;
}
