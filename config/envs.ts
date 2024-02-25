
const port = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 8000

export const envs = {
  PORT: port
}