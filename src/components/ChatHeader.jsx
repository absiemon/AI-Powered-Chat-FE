import { ActionIcon, Group, Text, Tooltip, ThemeIcon } from '@mantine/core';
import { IconRefresh, IconSparkles } from '@tabler/icons-react';

/**
 * @param {object} props
 * @param {() => void} props.onReset   - Called when the reset button is clicked.
 * @param {boolean} props.disabled     - Disables the reset button (e.g. mid-send).
 */
export default function ChatHeader({ onReset, disabled }) {
  return (
    <Group
      justify="space-between"
      align="center"
      px="md"
      py="sm"
      style={{
        borderBottom: '1px solid #e9ecef',
        backgroundColor: '#fafbfc',
      }}
    >
      <Group gap="xs">
        <ThemeIcon variant="light" color="blue" size="md" radius="md">
          <IconSparkles size={18} />
        </ThemeIcon>
        <Text fw={600} size="md">
          AI Chat
        </Text>
      </Group>

      <Tooltip label="New chat" withArrow position="left">
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={onReset}
          disabled={disabled}
          aria-label="Start a new chat"
        >
          <IconRefresh size={18} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}