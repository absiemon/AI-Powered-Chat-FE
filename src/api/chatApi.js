import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 30_000, // generous — covers Gemini latency + retries
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Sends a chat message and returns the AI reply + insight.
 * @param {object} params
 * @param {string|null} params.sessionId - Existing session UUID, or null to create a new one.
 * @param {string} params.message - User's message text.
 * @returns {Promise<{
 *   sessionId: string,
 *   userMessage: object,
 *   assistantMessage: object,
 *   insight: { intent: string, sentiment: string },
 *   conversation: object[]
 * }>}
 */
export async function sendChatMessage({ sessionId, message }) {
  const payload = { message };
  if (sessionId) {
    payload.sessionId = sessionId;
  }

  const { data } = await apiClient.post('/api/chat', payload);
  return data;
}

/**
 * Clears the conversation history for a session (server-side).
 * The session UUID remains valid afterwards.
 * @param {string} sessionId
 * @returns {Promise<{ sessionId: string, message: string }>}
 */
export async function resetConversation(sessionId) {
  const { data } = await apiClient.delete(`/api/chat/${sessionId}`);
  return data;
}