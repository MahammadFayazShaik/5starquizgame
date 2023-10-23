import { HalfHourGameResult, Slots } from '.'
function getRandomInt (min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export const getHalfHourResult = async (date: string) => {
  const dateGte = new Date(date)
  const dateLte = new Date(date)
  const currentDate = new Date()
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const currentSlotIdx = hours * 2 + (minutes < 30 ? 0 : 1)
  const response = await HalfHourGameResult.findOne({
    date: {
      $gte: new Date(dateGte.setHours(0, 0, 0, 0)),
      $lt: new Date(
        dateLte.setHours(
          currentDate.getHours(),
          currentDate.getMinutes(),
          currentDate.getSeconds()
        )
      )
    }
  })
  const slots: Array<{ slot: string; result: number }> = response?.get('slots')
  if (slots.length <= currentSlotIdx) {
    for (let i = 0; i <= currentSlotIdx; i++) {
      if (!slots[i]?.result) {
        slots[i] = {
          slot: Slots[i],
          result: getRandomInt(0, 100)
        }
      }
    }
  }
  await HalfHourGameResult.updateOne(
    {
      _id: response?._id
    },
    {
      slots
    }
  )
  return response
}
