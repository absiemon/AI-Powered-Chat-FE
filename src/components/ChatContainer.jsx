import { Paper, Stack } from '@mantine/core';
import { useChat } from '../hooks/useChat.js';
import ChatHeader from './ChatHeader.jsx';
import MessageList from './MessageList.jsx';
import ChatInput from './ChatInput.jsx';

export default function ChatContainer() {
  const { messages, isSending, latestAssistantId, sendMessage, reset } = useChat();

  return (
    <Paper
      shadow="sm"
      radius="lg"
      withBorder
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}
    >
      <Stack gap={0} style={{ flex: 1, minHeight: 0 }}>
        <ChatHeader onReset={reset} disabled={isSending || messages.length === 0} />
        <MessageList
          messages={messages}
          isSending={isSending}
          latestAssistantId={latestAssistantId}
        />
        <ChatInput onSend={sendMessage} isSending={isSending} />
      </Stack>
    </Paper>
  );
}