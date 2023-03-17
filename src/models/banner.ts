export interface Banner {
  imageUrl: string;
  targetId: number;
  targetType: number;//1000-歌单推荐，1-新歌首发/热歌推荐，10-新碟首发/热碟推荐
  typeTitle: string;
  bannerId: number;
}
