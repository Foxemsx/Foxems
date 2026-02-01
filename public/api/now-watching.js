// Mock API endpoint for now watching status
// This can be connected to the extension's WebSocket data in the future

export async function GET() {
  // TODO: Connect to extension's WebSocket to get real-time data
  // For now, return "not watching" state
  return Response.json({
    isWatching: false,
    timestamp: new Date().toISOString(),
  });
}
