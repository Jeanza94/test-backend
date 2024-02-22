import {Request, Response} from 'express'

export const getItems = (req: Request, res: Response) => {
  console.log(req)
  res.status(200).json({message: "hola"})
}

export const getItemById = (req: Request, res: Response) => {
  const id = req.params.id
  res.status(200).json({message: id})
}