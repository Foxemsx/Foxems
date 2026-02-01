export async function GET() {
  return Response.json({
    isWatching: false,
    timestamp: new Date().toISOString(),
  });
}
