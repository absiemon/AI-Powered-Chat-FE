import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';
import { IconRobot, IconUser, IconAlertTriangle } from '@tabler/icons-react';
import { useTypewriter } from '../hooks/useTypewriter.js';
import InsightBadge from './InsightBadge.jsx';
import MarkdownContent from './MarkdownContent.jsx';

/**
 * @param {object} props
 * @param {object} props.entry - The conversation entry to render.
 * @param {string} props.entry.role         - 'user' | 'assistant'.
 * @param {string} props.entry.text         - Message body (may contain markdown).
 * @param {object|null} props.entry.insight - { intent, sentiment } for assistant messages.
 * @param {boolean} props.entry.isFallback  - True if this assistant reply came from the fallback path.
 * @param {boolean} props.animate           - True if this message should run the typewriter.
 */
export default function MessageItem({ entry, animate = false }) {
    const isUser = entry.role === 'user';
    const isFallback = entry.isFallback === true;

    const { displayedText, isTyping } = useTypewriter(entry.text, animate && !isUser);

    // Visual styling differs by role.
    const bubbleBg = isUser
        ? 'var(--mantine-color-blue-6)'
        : isFallback
            ? '#fff8e1'
            : '#f1f3f5';
    const textColor = isUser ? 'white' : 'inherit';
    const borderColor = isFallback ? '#ffd54f' : 'transparent';

    return (
        <Group
            align="flex-start"
            justify={isUser ? 'flex-end' : 'flex-start'}
            gap="xs"
            wrap="nowrap"
        >
            {/* Avatar appears on the side opposite the bubble */}
            {!isUser && (
                <Avatar size="sm" radius="xl" color="blue" variant="light">
                    <IconRobot size={16} />
                </Avatar>
            )}

            <Stack
                gap={4}
                style={{
                    maxWidth: '75%',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                }}
            >
                <Paper
                    shadow="none"
                    radius="lg"
                    px="md"
                    py="sm"
                    style={{
                        backgroundColor: bubbleBg,
                        color: textColor,
                        border: `1px solid ${borderColor}`,
                        // Tail-style asymmetric radius for visual interest.
                        borderBottomRightRadius: isUser ? 4 : undefined,
                        borderBottomLeftRadius: !isUser ? 4 : undefined,
                        wordBreak: 'break-word',
                    }}
                >
                    {isUser ? (
                        <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                            {entry.text}
                        </Text>
                    ) : (
                        <>
                            <MarkdownContent>{displayedText}</MarkdownContent>
                            {/* Blinking caret while the typewriter is running. */}
                            {isTyping && <BlinkingCaret />}
                        </>
                    )}
                </Paper>

                {/* Fallback hint sits between the bubble and the insight badges */}
                {isFallback && (
                    <Group gap={4} align="center">
                        <IconAlertTriangle size={12} color="#f59f00" />
                        <Text size="xs" c="dimmed">
                            The assistant is having trouble — try again.
                        </Text>
                    </Group>
                )}

                {!isUser && entry.insight && !isTyping && <InsightBadge insight={entry.insight} />}
            </Stack>

            {isUser && (
                <Avatar size="sm" radius="xl" color="gray" variant="filled">
                    <IconUser size={16} />
                </Avatar>
            )}
        </Group>
    );
}


function BlinkingCaret() {
    return (
        <>
            <style>
                {`@keyframes caret-blink { 50% { opacity: 0; } }
          .caret-blink {
            display: inline-block;
            width: 6px;
            height: 14px;
            margin-left: 2px;
            vertical-align: text-bottom;
            background-color: #495057;
            animation: caret-blink 1s steps(2) infinite;
          }`}
            </style>
            <span className="caret-blink" />
        </>
    );
}