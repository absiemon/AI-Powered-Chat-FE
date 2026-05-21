import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Anchor, Code, List, Table, Text, Title } from '@mantine/core';


const components = {
    p: ({ children }) => (
        <Text size="sm" component="p" style={{ margin: '0.4em 0', whiteSpace: 'pre-wrap' }}>
            {children}
        </Text>
    ),
    strong: ({ children }) => <strong style={{ fontWeight: 600 }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    del: ({ children }) => <del>{children}</del>,


    h1: ({ children }) => (
        <Title order={4} mt="sm" mb={4}>
            {children}
        </Title>
    ),
    h2: ({ children }) => (
        <Title order={5} mt="sm" mb={4}>
            {children}
        </Title>
    ),
    h3: ({ children }) => (
        <Title order={6} mt="sm" mb={4}>
            {children}
        </Title>
    ),
    h4: ({ children }) => (
        <Text fw={600} size="sm" mt="sm" mb={4}>
            {children}
        </Text>
    ),
    h5: ({ children }) => (
        <Text fw={600} size="sm" mt="xs" mb={4}>
            {children}
        </Text>
    ),
    h6: ({ children }) => (
        <Text fw={600} size="sm" mt="xs" mb={4}>
            {children}
        </Text>
    ),

    // ---- Lists ----
    ul: ({ children }) => (
        <List size="sm" spacing={2} withPadding my={6}>
            {children}
        </List>
    ),
    ol: ({ children }) => (
        <List size="sm" spacing={2} withPadding type="ordered" my={6}>
            {children}
        </List>
    ),
    li: ({ children }) => <List.Item>{children}</List.Item>,

    // ---- Code ----
    // react-markdown calls `code` for both inline and fenced blocks; we
    // use the `className` prop (set on fenced blocks) to tell them apart.
    code: ({ inline, className, children }) => {
        const isInline = inline || !className;
        if (isInline) {
            return (
                <Code style={{ fontSize: '0.85em' }}>{children}</Code>
            );
        }
        return (
            <Code
                block
                style={{
                    fontSize: '0.85em',
                    padding: '0.6em 0.8em',
                    margin: '0.4em 0',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {children}
            </Code>
        );
    },
   
    pre: ({ children }) => <>{children}</>,

    // ---- Links ----
    a: ({ href, children }) => (
        <Anchor href={href} target="_blank" rel="noopener noreferrer" size="sm">
            {children}
        </Anchor>
    ),

    // ---- Blockquote ----
    blockquote: ({ children }) => (
        <div
            style={{
                borderLeft: '3px solid #ced4da',
                padding: '0.2em 0.8em',
                margin: '0.5em 0',
                color: '#495057',
                fontStyle: 'italic',
            }}
        >
            {children}
        </div>
    ),

    hr: () => (
        <hr
            style={{
                border: 'none',
                borderTop: '1px solid #dee2e6',
                margin: '0.6em 0',
            }}
        />
    ),

    table: ({ children }) => (
        <Table striped withTableBorder withColumnBorders mt="xs" mb="xs">
            {children}
        </Table>
    ),
    thead: ({ children }) => <Table.Thead>{children}</Table.Thead>,
    tbody: ({ children }) => <Table.Tbody>{children}</Table.Tbody>,
    tr: ({ children }) => <Table.Tr>{children}</Table.Tr>,
    th: ({ children }) => <Table.Th>{children}</Table.Th>,
    td: ({ children }) => <Table.Td>{children}</Table.Td>,
};


export default function MarkdownContent({ children }) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {children || ''}
        </ReactMarkdown>
    );
}