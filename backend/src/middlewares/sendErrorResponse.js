export function sendErrorResponse(res, status, message) {
  return res.status(status).json({ message });
}
