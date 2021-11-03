const middleware = () => {
  return (req: any, res: any, next: any) => {
    if (!req.body.url) {
      return res.status(422).json({ error: 'url is required' })
    } else {
      next()
    }
  }
}
export default middleware;