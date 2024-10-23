// const mongoose = require('mongoose')
// const Book = require('./book.model')
// const request = require('request')
// const { Schema } = mongoose

// const NotifyModel = Schema(
//   {
//     userId: Schema.Types.ObjectId,
//     bookId: {
//       type: Schema.Types.ObjectId,
//       ref: Book,
//     },
//     chapterId: Schema.Types.ObjectId,
//     requestId: Schema.Types.ObjectId,
//     message: String,
//     status: {
//       type: String,
//       default: 'UNREAD',
//       enum: ['READ', 'UNREAD'],
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

// const Notify = mongoose.model('Notify', NotifyModel)

// module.exports = Notify
export interface Notify {
  _id?: string;
  userId?: string;
  bookId?: string;
  chapterId?: string;
  requestId?: string;
  message?: string;
  status?: NotifyStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum NotifyStatus {
  READ = 'READ',
  UNREAD = 'UNREAD',
}
