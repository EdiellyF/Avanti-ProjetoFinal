export function notFoundMiddleware(req, res, next) {
  res.status(404).json({ message: "404 Route Not Found :(" });
}
