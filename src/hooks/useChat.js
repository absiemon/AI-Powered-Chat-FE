// Encapsulates all chat state and side effects in a single hook so
// components stay declarative. Exposes:
//   - messages:           array of conversation entries (server-authoritative)
//   - sessionId:          current session UUID (null until first send)
//   - isSending:          true while a message is in flight
//   - latestAssistantId:  id of the most recently received assistant message
//                         (used by MessageItem to know which message to animate
//                         with the typewriter; older messages render instantly)
//   - sendMessage(text):  sends user message, updates state
//   - reset():            clears server-side history and local state

import { useCallback, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { sendChatMessage, resetConversation } from '../api/chatApi.js';

export function useChat() {
    // The full conversation as returned by the backend (server-authoritative).
    // Each entry has: id, role, text, insight, isFallback, createdAt.
    const [messages, setMessages] = useState([]);

    // Active session UUID. Null until the first message is sent — the backend
    // creates the session and returns its id in the response.
    const [sessionId, setSessionId] = useState(null);

    // True while an outgoing message is waiting for the AI reply.
    const [isSending, setIsSending] = useState(false);

    // Id of the assistant message that should run the typewriter animation.
    // Set right after a successful send so only that bubble animates; older
    // bubbles render their text instantly.
    const [latestAssistantId, setLatestAssistantId] = useState(null);


    const sendMessage = useCallback(
        async (text) => {
            const trimmed = text.trim();
            if (!trimmed || isSending) return;

            // Optimistic user bubble — gives instant visual feedback.
            const optimisticEntry = {
                id: `optimistic-${Date.now()}`,
                role: 'user',
                text: trimmed,
                insight: null,
                isFallback: false,
                createdAt: new Date().toISOString(),
                _optimistic: true,
            };
            setMessages((prev) => [...prev, optimisticEntry]);
            setIsSending(true);

            try {
                const data = await sendChatMessage({ sessionId, message: trimmed });
                // Replace optimistic state with the server-authoritative conversation.
                setMessages(data.conversation);
                setSessionId(data.sessionId);

                // Tell MessageItem which bubble should run the typewriter effect.
                // Only the latest assistant message animates; earlier ones render instantly.
                setLatestAssistantId(data.assistantMessage?.id || null);
            } catch (err) {
                // Roll back the optimistic bubble so the user can retry.
                setMessages((prev) => prev.filter((m) => m.id !== optimisticEntry.id));

                notifications.show({
                    color: 'red',
                    title: 'Could not reach the server',
                    message:
                        err?.response?.data?.message ||
                        err?.message ||
                        'Please check your connection and try again.',
                    autoClose: 5000,
                });
            } finally {
                setIsSending(false);
            }
        },
        [sessionId, isSending],
    );

    /**
     * Clears both server-side and local conversation history.
     * If we never had a session, just clears local state.
     */
    const reset = useCallback(async () => {
        if (!sessionId) {
            setMessages([]);
            setLatestAssistantId(null);
            return;
        }

        try {
            await resetConversation(sessionId);
            setMessages([]);
            setLatestAssistantId(null);
            notifications.show({
                color: 'blue',
                title: 'Conversation cleared',
                message: 'Starting a fresh chat.',
                autoClose: 2000,
            });
        } catch (err) {
            notifications.show({
                color: 'red',
                title: 'Could not reset',
                message: err?.message || 'Please try again.',
                autoClose: 4000,
            });
        }
    }, [sessionId]);

    return {
        messages,
        sessionId,
        isSending,
        latestAssistantId,
        sendMessage,
        reset,
    };
}