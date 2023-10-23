import express from 'express'
import bcrypt from 'bcrypt'
import { Users } from './db'
import mongoose from 'mongoose'
import AdminBroExpress from '@admin-bro/express'
import adminBroOptions from './adminbro-options'

import LandingRoute from './routes/landing'

require('dotenv').config()

const router = AdminBroExpress.buildAuthenticatedRouter(adminBroOptions, {
  authenticate: async (email: any, password: any) => {
    const user = await Users.findOne({ email }, { password: 1, _id: 0 })
    if (user) {
      const matched = await bcrypt.compare(password, user.get('password'))
      if (matched) {
        return user
      }
    }
    return false
  },
  cookiePassword: process.env.COOKIE_PASSWORD!
})



const app = express()

app.use(adminBroOptions.options.rootPath, router)

const run = async () => {
  await mongoose.connect('mongodb://127.0.0.1/test', {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  console.log('Connected to MongoDB');
  app.use('/landing', LandingRoute)
  await app.listen(3001)
}

run()

process.on('uncaughtException', (exception) => {
  console.error({
    error: exception, event: "uncaughtException", message: 'UnCaught exception identified'
  });
});

// To handle unhandled rejections

process.on('unhandledRejection', (reason) => {
  console.error({
    error: reason as Error,
    event: 'UNHANDLED_REJECTION_ERROR',
    message: `Faced unhandled rejection on the process`,
  });
});
