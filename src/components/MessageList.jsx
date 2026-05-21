import { useEffect, useRef } from 'react';
import { ScrollArea, Stack } from '@mantine/core';
import MessageItem from './MessageItem.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import EmptyState from './EmptyState.jsx';

/**
 * @param {object} props
 * @param {Array} props.messages              - Conversation entries from the backend.
 * @param {boolean} props.isSending           - True while waiting for an AI reply.
 * @param {string|null} props.latestAssistantId - Id of the message the typewriter should animate.
 */
export default function MessageList({ messages, isSending, latestAssistantId }) {
    // The ScrollArea internally renders a viewport div; 
    const viewportRef = useRef(null);

    // Scroll once whenever messages or send-state changes.
    useEffect(() => {
        requestAnimationFrame(() => {
            viewportRef.current?.scrollTo({
                top: viewportRef.current.scrollHeight,
                behavior: 'smooth',
            });
        });
    }, [messages, isSending]);

    useEffect(() => {
        if (!latestAssistantId) return undefined;

        let lastHeight = viewportRef.current?.scrollHeight ?? 0;
        let stableTicks = 0;

        const id = setInterval(() => {
            const el = viewportRef.current;
            if (!el) return;

            const currentHeight = el.scrollHeight;
            if (currentHeight !== lastHeight) {
                // Content still growing — follow it.
                el.scrollTo({ top: currentHeight, behavior: 'smooth' });
                lastHeight = currentHeight;
                stableTicks = 0;
            }
            else {
                // Height unchanged for a few ticks — typewriter likely done.
                stableTicks += 1;
                if (stableTicks >= 4) {
                    clearInterval(id);
                }
            }
        }, 120);

        return () => clearInterval(id);
    }, [latestAssistantId]);

    if (messages.length === 0 && !isSending) {
        return (
            <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
                <EmptyState />
            </div>
        );
    }

    return (
        <ScrollArea
            viewportRef={viewportRef}
            style={{ flex: 1, minHeight: 0 }}
            scrollbarSize={8}
            offsetScrollbars
        >
            <Stack gap="md" p="md">
                {messages.map((entry) => (
                    <MessageItem
                        key={entry.id}
                        entry={entry}
                        animate={entry.id === latestAssistantId}
                    />
                ))}

                {isSending && <TypingIndicator />}
            </Stack>
        </ScrollArea>
    );
}