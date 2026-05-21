import { Badge, Group } from '@mantine/core';


const SENTIMENT_COLORS = {
  positive: 'teal',
  neutral: 'gray',
  negative: 'red',
};


export default function InsightBadge({ insight }) {
  if (!insight) return null;

  const sentimentColor = SENTIMENT_COLORS[insight.sentiment] || 'gray';

  return (
    <Group gap={6}>
      <Badge
        variant="light"
        color="blue"
        size="xs"
        radius="sm"
        styles={{ label: { textTransform: 'none' } }}
      >
        intent: {insight.intent}
      </Badge>
      <Badge
        variant="light"
        color={sentimentColor}
        size="xs"
        radius="sm"
        styles={{ label: { textTransform: 'none' } }}
      >
        sentiment: {insight.sentiment}
      </Badge>
    </Group>
  );
}