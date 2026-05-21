
import { Avatar, Group, Paper } from '@mantine/core';
import { IconRobot } from '@tabler/icons-react';

const STYLE = `
@keyframes typing-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40%           { transform: translateY(-4px); opacity: 1; }
}
.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #868e96;
  animation: typing-bounce 1.2s infinite ease-in-out;
}
.typing-dot:nth-child(2) { animation-delay: 0.15s; }
.typing-dot:nth-child(3) { animation-delay: 0.3s; }
`;

export default function TypingIndicator() {
  return (
    <>
      <style>{STYLE}</style>
      <Group align="flex-start" gap="xs" wrap="nowrap">
        <Avatar size="sm" radius="xl" color="blue" variant="light">
          <IconRobot size={16} />
        </Avatar>
        <Paper
          shadow="none"
          radius="lg"
          px="md"
          py="sm"
          style={{
            backgroundColor: '#f1f3f5',
            borderBottomLeftRadius: 4,
          }}
        >
          <Group gap={4}>
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </Group>
        </Paper>
      </Group>
    </>
  );
}