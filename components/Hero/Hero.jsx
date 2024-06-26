import {
  Container,
  Center,
  Stack,
  Title,
  Text,
  Loader,
  Alert,
  Space,
  Button,
} from "@mantine/core";

export function Hero() {
  const demoProps = {
    h: 50,
    mt: "md",
  };

  return (
    <>
      <Stack h={250} align="center" justify="flex-start" gap="xs">
        <Title order={1}>Tiktok Downloader</Title>
        <Text size="md">Download TikTok Videos Online. No Watermark</Text>
      </Stack>
    </>
  );
}
