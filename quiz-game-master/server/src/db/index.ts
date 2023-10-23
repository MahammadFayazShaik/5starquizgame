import mongoose from 'mongoose'
export const Slots = [
  '12:00 AM',
  '12:30 AM',
  '1:00 AM',
  '1:30 AM',
  '2:00 AM',
  '2:30 AM',
  '3:00 AM',
  '3:30 AM',
  '4:00 AM',
  '4:30 AM',
  '5:00 AM',
  '5:30 AM',
  '6:00 AM',
  '6:30 AM',
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM'
]

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    encryptedPassword: {
      type: String,
      required: true
    },
    role: { type: String, enum: ['admin', 'restricted'], required: true }
  },
  {
    timestamps: true
  }
)
export const Users = mongoose.model('Users', UserSchema)

export const DayGame = mongoose.model(
  'DayGame',
  new mongoose.Schema({ name: String, resultTime: String, },  { timestamps: true })
)

export const HalfHourGame = mongoose.model(
  'HalfHourGame',
  new mongoose.Schema({ name: String }, { timestamps: true })
)

export const DayGameResult = mongoose.model(
  'DayGameResult',
  new mongoose.Schema(
    {
      date: Date,
      result: { type: Number, min: 0, max: 100 },
      game: { type: mongoose.Types.ObjectId, ref: 'DayGame' }
    },
    { timestamps: true }
  )
)

const HalfHourGameResultSchema = new mongoose.Schema(
  {
    game: { type: mongoose.Types.ObjectId, ref: 'HalfHourGame' },
    date: {
      type: Date
    },
    slots: [
      {
        slot: {
          type: String,
          enum: Slots,
          required: true
        },
        result: { type: Number, min: 0, max: 100, required: true }
      }
    ]
  },
  { timestamps: true }
)

export const HalfHourGameResult = mongoose.model(
  'HalfHourGameResult', HalfHourGameResultSchema
)
