import axios from 'axios'
import { ZAppModel } from '@/models'
import { ZAPP_URL } from '@/constants'
import config from '../../config'

export const zappService = {
  getAppConfig: async (): Promise<ZAppModel> => {
    return axios({
      url: `${ZAPP_URL}/${config.APP_ID}`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err
      })
  },
}
