import { useState } from "react";
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
import { HeaderMenu } from "../components/Header/Header.jsx";
import { Hero } from "../components/Hero/Hero.jsx";
import { Footer } from "../components/Footer/Footer.jsx";
import { TextInputComponents } from "../components/TextInput/TextInput.jsx";
import { MediaCard } from "../components/MediaCard/MediaCard.jsx";

import { useFetch } from "../providers/index.js";

const TiktokURLregex =
  /https:\/\/(?:m|www|vm|vt|lite)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video|photo)\/|\?shareId=|\&item_id=)(\d+))|\w+)/;

export default function IndexPage() {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const { data, loading, error, fetchData, clearData } = useFetch();

  const handleFetch = () => {
    if (!url) {
      setUrlError("URL cannot be empty");
      return;
    }
    if (!TiktokURLregex.test(url)) {
      setUrlError("Please enter a valid TikTok URL");
      return;
    }
    setUrlError("");
    setIsFetching(true);
    fetchData(url).finally(() => {
      setIsFetching(false);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFetching) {
      handleFetch();
    }
  };
  const handleClear = () => {
    clearData();
    setUrl("");
  };
  return (
    <>
      <HeaderMenu />
      <Hero />
      <TextInputComponents
        handleSubmit={handleSubmit}
        handleFetch={handleFetch}
        url={url}
        setUrl={setUrl}
      />
      <Space h="xl" />
      {urlError && (
        <Alert title="Error" color="red" style={{ marginBottom: "20px" }}>
          {urlError}
        </Alert>
      )}
      {loading && (
        <>
          <Center>
            <Loader />
          </Center>
        </>
      )}

      {error && (
        <Alert title="Error" color="red">
          {error.message}
        </Alert>
      )}

      {data && (
        <>
          <MediaCard data={data} handleClear={handleClear} />
          <Space h="xl" />
        </>
      )}
      <Footer />
    </>
  );
}
