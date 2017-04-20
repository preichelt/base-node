/* @flow */
import { Router } from 'express'

export default function() {
  const api = Router()

  api.get('/', (req, res) => {
    const msg: string = 'We eatin'
    res.send(msg)
  })

  return api
}
