import AdminBro from 'admin-bro'
import AdminBroMongoose from '@admin-bro/mongoose'
import bcrypt from 'bcrypt'

import {
  Users,
  DayGame,
  HalfHourGame,
  DayGameResult,
  HalfHourGameResult
} from './db'

AdminBro.registerAdapter(AdminBroMongoose)

const contentNavigation = {
  name: 'admin'
}

const canModifyUsers = ({ currentAdmin }: any) => currentAdmin && currentAdmin.role === 'admin'

const adminBroOptions = new AdminBro({
  resources: [
    {
      resource: Users,
      options: {
        navigation: contentNavigation,
        properties: {
          email: { isVisible: { list: true, filter: true, show: true, edit: true }, type: 'email' },
          encryptedPassword: { isVisible: false, type: 'password' },
          password: {
            type: 'password',
            isVisible: {
              list: false, edit: true, filter: false, show: false
            }
          },
          updatedAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
          createdAt: { isVisible: { list: true, filter: true, show: true, edit: false } }
        },
        actions: {
          new: {
            before: async (request: any) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                  password: undefined
                }
              }
              return request
            },
            isAccessible: canModifyUsers
          },
          edit: {
            before: async (request: any) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                  password: undefined
                }
              }
              return request
            },
            isAccessible: canModifyUsers
          },
          delete: { isAccessible: canModifyUsers }
        }
      }
    },
    {
      resource: DayGame,
      options: {
        navigation: '24Game'
      }
    },
    {
      resource: DayGameResult,
      options: {
        navigation: '24Game'
      }
    },
    {
      resource: HalfHourGame,
      options: {
        navigation: '30MinGame'
      }
    },
    {
      resource: HalfHourGameResult,
      options: {
        navigation: '30MinGame'
      }
    }
  ],
  dashboard: {
    handler: async () => {
      return { some: 'output' }
    },
    component: AdminBro.bundle('./components/my-dashboard-component')
  },
  rootPath: '/admin'
})

export default adminBroOptions
