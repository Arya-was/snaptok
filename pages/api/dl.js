import { getVideo } from "../../utils/tiktokApi.js";

const TiktokURLregex =
  /https:\/\/(?:m|www|vm|vt|lite)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video|photo)\/|\?shareId=|\&item_id=)(\d+))|\w+)/;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "url is required" });
    }
    if (!TiktokURLregex.test(url)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid TikTok URL" });
    }
    const result = await getVideo(url);
    return res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
