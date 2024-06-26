// components/MediaCard.jsx
import React from "react";
import {
  Card,
  Image,
  Text,
  Group,
  Button,
  Avatar,
  SimpleGrid,
  Container,
  Center,
  Space,
  Stack,
} from "@mantine/core";
import { IconMusic, IconDownload, IconArrowBackUp } from "@tabler/icons-react";

export function MediaCard({ data, handleClear }) {
  const { type, description, author, statistics, MetaData } = data;
  const demoProps = {
    h: "auto",
    mt: "md",
  };
  return (
    <Container {...demoProps}>
      <Button
        variant="default"
        radius="md"
        onClick={handleClear}
        leftSection={<IconArrowBackUp size={14} />}
        style={{ marginTop: "20px" }}
      >
        Download Another Video
      </Button>
      <Space h="lg" />
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ margin: "auto", maxWidth: 600 }}
      >
        <Card.Section>
          <Group
            position="apart"
            mt="md"
            mb="xs"
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Avatar
              src={author.avatarMedium[0]}
              alt={author.nickname}
              size="lg"
            />
            <Stack h={90} align="flex-start" justify="center" gap="xs">
              <Text weight={500}>{author.nickname}</Text>
              <Text weight={400}>@{author.username}</Text>
            </Stack>
          </Group>
        </Card.Section>

        <Text size="sm" color="dimmed" style={{ textAlign: "center" }}>
          {description}
        </Text>
        <Space h="lg" />
        <Image
          radius="md"
          h={200}
          w="auto"
          fit="contain"
          style={{ textAlign: "center" }}
          alt={author.nickname}
          src={type == "video" ? MetaData.video.cover[0] : MetaData.images[0]}
        />
        <Space h="lg" />
        <Group mt="lg" spacing="xs" position="center">
          <Text size="sm" weight={500}>
            Likes: {statistics.diggCount}
          </Text>
          <Text size="sm" weight={500}>
            Comments: {statistics.commentCount}
          </Text>
          <Text size="sm" weight={500}>
            Shares: {statistics.shareCount}
          </Text>
        </Group>

        {type === "video" && (
          <Group mt="md" position="center" spacing="md">
            <Button
              component="a"
              href={MetaData.video.playAddr[0]}
              target="_blank"
              leftSection={<IconDownload size={14} />}
              variant="light"
              color="blue"
            >
              Download Video No Watermark
            </Button>
            <Button
              component="a"
              href={MetaData.music[0]}
              target="_blank"
              leftSection={<IconMusic size={14} />}
              variant="light"
              color="green"
            >
              Download Music
            </Button>
          </Group>
        )}

        {type === "image" && (
          <>
            <Center mt="md">
              <Button
                component="a"
                href={MetaData.music[0]}
                download
                variant="light"
                color="green"
                leftSection={<IconDownload size={16} />}
              >
                Download Music
              </Button>
            </Center>
            <SimpleGrid cols={2} mt="md" spacing="lg">
              {MetaData.images.map((img, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                  <Image src={img} alt={`Image ${index + 1}`} radius="sm" />
                  <Space h="sm" />
                  <Button
                    component="a"
                    href={img}
                    download
                    variant="light"
                    color="blue"
                    leftSection={<IconDownload size={12} />}
                    style={{ marginTop: "4px" }}
                  >
                    Download
                  </Button>
                </div>
              ))}
            </SimpleGrid>
          </>
        )}
      </Card>
    </Container>
  );
}
