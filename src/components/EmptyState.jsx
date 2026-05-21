import { Center, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconMessageCircle2 } from '@tabler/icons-react';

export default function EmptyState() {
  return (
    <Center style={{ flex: 1, width: '100%' }}>
      <Stack align="center" gap="xs" px="md">
        <ThemeIcon size={64} radius="xl" variant="light" color="blue">
          <IconMessageCircle2 size={32} />
        </ThemeIcon>
        <Text size="lg" fw={500}>
          Start a conversation
        </Text>
        <Text size="sm" c="dimmed" ta="center" maw={320}>
          Ask anything — I'll do my best to help. Each reply also shows the
          detected intent and sentiment of your message.
        </Text>
      </Stack>
    </Center>
  );
}