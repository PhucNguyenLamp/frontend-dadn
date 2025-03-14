// Define the interface for the data object


export interface IVideo {
  _id: string;
  title: string;
  url: string;
  tags: string[];
  likeNum: number;
  releaseDate: Date;
}