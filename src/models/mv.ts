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
