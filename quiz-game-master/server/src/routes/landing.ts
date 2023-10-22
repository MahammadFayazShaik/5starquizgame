import express from 'express'
import {
  DayGame,
  DayGameResult,
  HalfHourGame,
  HalfHourGameResult,
  Slots
} from '../db'
const router = express.Router()
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function convertTZ(date: any) {
  return new Date(
    (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
      timeZone: 'Asia/Calcutta'
    })
  )
}

function get24HourTime(time: string) {
  let hour = parseInt(time.split(':')[0].trim())
  const minute = parseInt(time.split(':')[1].trim())
  if (time.includes('PM')) {
    return [hour != 12 ? hour + 12 : hour, minute]
  }
  if (time.includes('AM') && hour === 12) hour = hour - 12
  return [hour, minute]
}
const getSlots = (date: number, slotInfo: any[] = []) => {
  const inputDate = convertTZ(new Date(date))
  const currentDate = convertTZ(new Date())
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const currentSlotIdx =
    inputDate.getDate() < currentDate.getDate()
      ? Slots.length - 1
      : hours * 2 + (minutes < 30 ? 0 : 1)
  const slots: Array<{ slot: string; result: number }> = slotInfo
  if (slots.length <= currentSlotIdx) {
    for (let i = 0; i <= currentSlotIdx; i++) {
      if (!slots[i]?.result) {
        slots[i] = {
          slot: Slots[i],
          result: getRandomInt(0, 99)
        }
      }
    }
  }
  return slots
}
router.get('/half-hour-result/:from/:to', async (req, res) => {
  const from = convertTZ(new Date(Number(req.params.from)))
  const to = convertTZ(new Date(Number(req.params.to)))
  const response = await HalfHourGameResult.findOne({
    date: {
      $gte: from,
      $lt: to
    }
  })
  if (response) {
    await HalfHourGameResult.updateOne(
      {
        _id: response?._id
      },
      {
        slots: getSlots(Number(req.params.to), response.get('slots'))
      }
    )
  } else {
    const game = await HalfHourGame.findOne({ name: 'JMD' })
    const resultDate = new Date(Number(req.params.from))
    const halfHourGameResult = new HalfHourGameResult({
      date: resultDate,
      slots: getSlots(Number(req.params.to), []),
      game: game
    })
    await halfHourGameResult.save()
  }
  const finalResponse = await HalfHourGameResult.findOne({
    date: {
      $gte: from,
      $lt: to
    }
  })
  res.send({
    success: true,
    response: finalResponse
  })
})

router.get('/all-game-results-current-month/:from/:to', async (req, res) => {
  try {
    const from = new Date(Number(req.params.from))
    const to = new Date(Number(req.params.to))
    const response = await DayGameResult.find({
      date: {
        $gte: from,
        $lt: to
      }
    }).populate('game', 'name')
    const finalResponse = response
      .map(doc => ({
        date: doc.get('date').getDate(),
        game: doc.get('game').get('name'),
        result: doc.get('result')
      }))
      .reduce((agg, cur) => {
        // @ts-ignore
        const results =
          agg[cur.game] ??
          new Array(new Date().getDate()).fill({ date: '', result: '' })
        results[cur.date - 1] = { date: cur.date, result: cur.result }
        return {
          ...agg,
          [cur.game]: results
        }
      }, {})
    res.send({
      success: true,
      response: finalResponse
    })
  } catch (error) {
    console.log(error.stack)
    res.status(500).send({
      success: false,
      message: 'Internal server error!!'
    })
  }
})

const rotateArray1 = function (arr: any[], k: number) {
  for (let i = 0; i < k; i++) {
    arr.unshift(arr.pop())
  }

  return arr
}

router.get('/all-game-results-widget/:from/:to', async (req, res) => {
  try {
    const from = convertTZ(new Date(Number(req.params.from)))
    const to = convertTZ(new Date(Number(req.params.to)))
    let games = await DayGame.find({}, { name: 1, resultTime: 1 })
    games.sort((a, b) => {
      if (
        get24HourTime(a.get('resultTime'))[0] -
          get24HourTime(b.get('resultTime'))[0] ===
        0
      )
        return (
          get24HourTime(a.get('resultTime'))[1] -
          get24HourTime(b.get('resultTime'))[1]
        )
      return (
        get24HourTime(a.get('resultTime'))[0] -
        get24HourTime(b.get('resultTime'))[0]
      )
    })
    games = rotateArray1(games, 3)
    const temp = games[3]
    games[3] = games[4]
    games[4] = temp
    const response = await DayGameResult.find({
      date: {
        $gte: from,
        $lt: to
      }
    }).populate('game')
    const results: { [key: string]: [] } = response
      .map(doc => ({
        date: doc.get('date').getDate(),
        game: doc.get('game').get('name'),
        result: doc.get('result'),
        time: doc.get('game').get('resultTime')
      }))
      .reduce((agg, cur) => {
        // @ts-ignore
        const prev = Object.values(agg[cur.game] ?? {})
        const results = [
          { date: cur.date, result: cur.result, resultTime: cur.time }
        ].concat(prev)
        results.sort((a, b) => a.date - b.date)
        return {
          ...agg,
          [cur.game]: results.reduce((agg, cur) => {
            return {
              ...agg,
              [cur.date]: cur
            }
          }, {})
        }
      }, {})
    res.send({
      success: true,
      response: {
        results,
        games
      }
    })
  } catch (error) {
    console.log(error.stack)
    res.status(500).send({
      success: false,
      message: 'Internal server error!!'
    })
  }
})

router.get('/day-game-month-chart', async (req, res) => {
  async function getResults(from: Date, to: Date, games: any[]) {
    if (req.query.date && req.query.game) {
      const [year, month] = [
        req.query.date.split('-')[0],
        req.query.date.split('-')[1]
      ]
      from.setDate(1)
      from.setHours(0, 0, 0, 0)
      from.setFullYear(year, month - 1)
      to.setMonth(from.getMonth() + 1)
      to.setDate(1)
      to.setHours(0, 0, 0, 0)
      const game = games.find(ele => ele._id == req.query.game)
      const response = await DayGameResult.find({
        game,
        date: {
          $gte: from,
          $lt: to
        }
      }).sort('date')
      return response
    }
  }

  try {
    const games = await DayGame.find()
    const from = convertTZ(new Date())
    const to = convertTZ(new Date())
    const results = await getResults(from, to, games)
    res.send({
      success: true,
      response: {
        games,
        results
      }
    })
  } catch (error) {
    console.log(error.stack)
    res.status(500).send({
      success: false,
      message: 'Internal server error!!'
    })
  }
})
router.get('/day-game-next-result/:time', async (req, res) => {
  try {
    const games = await DayGame.find({}, { resultTime: 1, name: 1 })
    games.sort((a, b) => {
      if (
        get24HourTime(a.get('resultTime'))[0] -
          get24HourTime(b.get('resultTime'))[0] ===
        0
      )
        return (
          get24HourTime(a.get('resultTime'))[1] -
          get24HourTime(b.get('resultTime'))[1]
        )
      return (
        get24HourTime(a.get('resultTime'))[0] -
        get24HourTime(b.get('resultTime'))[0]
      )
    })
    const [hour, minute] = [
      parseInt(req.params.time.split(':')[0]),
      parseInt(req.params.time.split(':')[1])
    ]
    const currentTimeInMinutes = hour * 60 + minute
    let finalGame = games[0]
    let finalGameIdx = null
    let dateToAdd = 0
    for (let i = 0; i < games.length; i++) {
      const game = games[i]
      const gameHour = get24HourTime(game.get('resultTime'))[0]
      const gameMinute = get24HourTime(game.get('resultTime'))[1]
      const gameTimeInMinutes = gameHour * 60 + gameMinute
      if (gameTimeInMinutes >= currentTimeInMinutes) {
        finalGameIdx = i
        break
      }
    }
    console.log(finalGame.get('name'), finalGameIdx, hour, minute, "###########");
    if (finalGameIdx === null) {
      const gameHour = get24HourTime(
        games[games.length - 1].get('resultTime')
      )[0]
      const gameMinute = get24HourTime(
        games[games.length - 1].get('resultTime')
      )[1]
      const gameTimeInMinutes = gameHour * 60 + gameMinute
      if (currentTimeInMinutes - gameTimeInMinutes <= 45) {
        finalGame = games[games.length - 1]
      } else {
        if (finalGame.get('name') === '5-Star') {
          if (hour === 23) dateToAdd = 0
          else dateToAdd = -1
        }
      }
    } else {
      const gameHour = get24HourTime(games[finalGameIdx].get('resultTime'))[0]
      const gameMinute = get24HourTime(games[finalGameIdx].get('resultTime'))[1]
      const gameTimeInMinutes = gameHour * 60 + gameMinute
      if (gameTimeInMinutes - currentTimeInMinutes < 16) {
        finalGame = games[finalGameIdx]
      } else {
        finalGame = games[finalGameIdx - 1]
      }
    }
    if (finalGame.get('name') === '5-Star') {
      if (hour === 23) dateToAdd = 0
      else dateToAdd = -1
    }

    const currentDate = new Date()
    currentDate.setDate(new Date().getDate() + dateToAdd)
    const from = convertTZ(currentDate).setHours(0, 0, 0, 0);
    const to = convertTZ(currentDate).setHours(23, 59);
    console.log("###########", finalGame.get('name'), from, to, "###########");
    const result = await DayGameResult.findOne({
      game: finalGame,
      date: {
        $gte: from,
        $lt: to
      }
    })
    res.send({
      success: true,
      response: {
        finalGame,
        result: result?.get('result') ?? 'wait'
      }
    })
  } catch (error) {
    console.log(error.stack)
    res.send({
      success: false,
      error
    })
  }
})

export default router