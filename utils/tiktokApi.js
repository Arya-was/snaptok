const { Headers } = require("node-fetch");
const headers = new Headers();

const tiktok_url =
  "https://www.tiktok.com/@rifkyiiii/video/7383337028278144262";

const getRedirectUrl = async (url) => {
  if (url.includes("vm.tiktok.com") || url.includes("vt.tiktok.com")) {
    url = await fetch(url, {
      redirect: "follow",
      follow: 10,
    });
    url = url.url;
    console.log("[*] Redirecting to: " + url);
  }
  return url;
};

const getIdVideo = async (url) => {
  if (url.includes("/t/")) {
    let url = await new Promise((resolve) => {
      require("follow-redirects").https.get(url, function (res) {
        return resolve(res.responseUrl);
      });
    });
  }
  let ID = url.match(/\d{17,21}/g);
  if (ID === null)
    return {
      status: "error",
      message:
        "Failed to fetch tiktok url. Make sure your tiktok url is correct!",
    };
  ID = ID[0];
  console.log(ID);
  // const matching = url.includes("/video/");
  // const matchingPhoto = url.includes("/photo/");
  // let idVideo = url.substring(
  //   url.indexOf("/video/") + 7,
  //   url.indexOf("/video/") + 26
  // );
  // if (matchingPhoto)
  //   idVideo = url.substring(
  //     url.indexOf("/photo/") + 7,
  //     url.indexOf("/photo/") + 26
  //   );
  // else if (!matching) {
  //   console.log("[X] Error: URL not found");
  // }
  // Tiktok ID is usually 19 characters long and sits after /video/
  // return idVideo.length > 19? idVideo.substring(0, idVideo.indexOf("?"))
  //   : idVideo;
  return ID;
};

const getVideo = async (url) => {
  const url_redirect = await getRedirectUrl(url);
  const idVideo = await getIdVideo(url_redirect);
  const API_URL = `https://api22-normal-c-alisg.tiktokv.com/aweme/v1/feed/?aweme_id=${idVideo}&iid=7318518857994389254&device_id=7318517321748022790&channel=googleplay&app_name=musical_ly&version_code=300904&device_platform=android&device_type=ASUS_Z01QD&version=9`;
  console.log(API_URL);
  const request = await fetch(API_URL, {
    method: "OPTIONS",
    headers: headers,
  });
  const body = await request.text();
  try {
    const res = JSON.parse(body);
    const content = res.aweme_list[0];
    // check if video was deleted
    if (content.aweme_id != idVideo) {
      return null;
    }
    const author = {
      uid: content.author.uid,
      username: content.author.unique_id,
      nickname: content.author.nickname,
      signature: content.author.signature,
      region: content.author.region,
      avatarThumb: content.author.avatar_thumb.url_list,
      avatarMedium: content.author.avatar_medium.url_list,
      url: `https://www.tiktok.com/@${content.author.unique_id}`,
    };
    const statistics = {
      commentCount: content.statistics.comment_count,
      diggCount: content.statistics.digg_count,
      downloadCount: content.statistics.download_count,
      playCount: content.statistics.play_count,
      shareCount: content.statistics.share_count,
      forwardCount: content.statistics.forward_count,
      loseCount: content.statistics.lose_count,
      loseCommentCount: content.statistics.lose_comment_count,
      whatsappShareCount: content.statistics.whatsapp_share_count,
      collectCount: content.statistics.collect_count,
      repostCount: content.statistics.repost_count,
    };
    const music = {
      id: content.music.id,
      title: content.music.title,
      author: content.music.author,
      album: content.music.album,
      coverLarge: content.music.cover_large.url_list,
      coverMedium: content.music.cover_medium.url_list,
      coverThumb: content.music.cover_thumb.url_list,
      duration: content.music.duration,
      isCommerceMusic: content.music.is_commerce_music,
      isOriginalSound: content.music.is_original_sound,
      isAuthorArtist: content.music.is_author_artist,
    };
    if (content.image_post_info) {
      return {
        status: "success",
        type: "image",
        id: content.aweme_id,
        createTime: content.create_time,
        description: content.desc,
        hashtag: content.text_extra
          .filter((x) => x.hashtag_name !== undefined)
          .map((v) => v.hashtag_name),
        author,
        statistics,
        music,
        MetaData: {
          music: content.music.play_url.url_list,
          images: content.image_post_info.images.map(
            (v) => v.display_image.url_list[0]
          ),
        },
      };
    } else {
      // Video Result
      const video = {
        ratio: content.video.ratio,
        duration: content.video.duration,
        playAddr: content.video.play_addr.url_list,
        downloadAddr: content.video.download_addr.url_list,
        cover: content.video.cover.url_list,
        dynamicCover: content.video.dynamic_cover.url_list,
        originCover: content.video.origin_cover.url_list,
      };
      return {
        status: "success",
        type: "video",
        id: content.aweme_id,
        createTime: content.create_time,
        description: content.desc,
        hashtag: content.text_extra
          .filter((x) => x.hashtag_name !== undefined)
          .map((v) => v.hashtag_name),
        author,
        statistics,
        music,
        MetaData: {
          music: content.music.play_url.url_list,
          video,
        },
      };
    }
  } catch (err) {
    console.error("Error:", err);
    console.error("Response body:", body);
  }
};
module.exports = { getVideo };
