import { TextInput, ActionIcon, rem, Stack, Container } from "@mantine/core";
import { IconUnlink, IconDownload, IconArrowLeft } from "@tabler/icons-react";

export function TextInputComponents({
  handleSubmit,
  handleFetch,
  url,
  setUrl,
}) {
  const demoProps = {
    h: 50,
    mt: "xs",
  };
  return (
    <>
      <Container {...demoProps}>
        <Stack h={100} align="strech" justify="flex-start" gap="xs">
          <form onSubmit={handleSubmit}>
            <TextInput
              value={url}
              onChange={(e) => setUrl(e.currentTarget.value)}
              radius="xl"
              size="lg"
              placeholder="Enter Url TikTok Video/Photo"
              rightSectionWidth={42}
              leftSection={
                <IconUnlink
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              rightSection={
                <ActionIcon
                  size={32}
                  radius="xl"
                  variant="filled"
                  onClick={handleFetch}
                >
                  <IconDownload
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              }
            />
          </form>
        </Stack>
      </Container>
    </>
  );
}
