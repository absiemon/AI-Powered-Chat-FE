import { AppShell, Container } from '@mantine/core';
import ChatContainer from './components/ChatContainer.jsx';

export default function App() {
  return (
    <AppShell padding={0}>
      <AppShell.Main>
        <Container size="md" h="100vh" py="md" px="sm">
          <ChatContainer />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}