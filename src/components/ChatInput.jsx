import { useState } from 'react';
import { ActionIcon, Group, Textarea } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

/**
 * @param {object} props
 * @param {(text: string) => void} props.onSend - Called with the trimmed text.
 * @param {boolean} props.isSending             - Disables input while true.
 */
export default function ChatInput({ onSend, isSending }) {
  const [value, setValue] = useState('');

  const trimmed = value.trim();
  const canSend = trimmed.length > 0 && !isSending;

  const handleSend = () => {
    if (!canSend) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (event) => {
    // Enter (without Shift) sends. Shift+Enter inserts a newline naturally.
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Group
      gap="sm"
      align="flex-end"
      p="md"
      wrap="nowrap"
      style={{
        borderTop: '1px solid #e9ecef',
        backgroundColor: '#fafbfc',
      }}
    >
      <Textarea
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        autosize
        minRows={1}
        maxRows={6}
        disabled={isSending}
        radius="lg"
        style={{ flex: 1 }}
        styles={{ input: { fontSize: 14 } }}
      />

      <ActionIcon
        onClick={handleSend}
        disabled={!canSend}
        loading={isSending}
        size="xl"
        radius="xl"
        variant="filled"
        color="blue"
        aria-label="Send message"
      >
        <IconSend size={18} />
      </ActionIcon>
    </Group>
  );
}