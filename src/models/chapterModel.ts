// "mp3s": [],
// "_id": "66bdca8e1237f1e853925097",
// "contentId": "66bc752b26f1f1f1f075dc28",
// "title": "Chương 3: Tiếp thị điện tử",
// "text": []
// "images":
//                     ],
//                     "numberOfPage": 13,
//                     "status": "ACTIVE",
//                     "createdAt": "2024-08-15T09:29:50.446Z",
//                     "updatedAt": "2024-08-15T09:29:50.446Z",

export interface ChapterModel {
  _id?: string;
  title?: string;
  contentId?: string;
  images?: string[];
  mp3s?: string[];
  numberOfPage?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChapterResponse {
  status: string;
  message: string;
  data: ChapterModel;
}
