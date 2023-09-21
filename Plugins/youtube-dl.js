const YT = require("../System/Ytdl-Core.js");
const fs = require("fs");
const yts = require("youtube-yts");
const ffmpeg = require("fluent-ffmpeg");
const { getBuffer } = require("../System/Function2.js");

let mergedCommands = [
  "play",
  "song",
  "ytmp3",
  "mp3",
  "ytaudio",
  "yta",
  "ytmp4",
  "vmp4",
  "ytvideo",
  "ytv",
  "video",
];

module.exports = {
  name: "mediaDownloader",
  alias: [...mergedCommands],
  uniquecommands: ["song", "video", "ytmp3", "ytmp4"],
  description: "All file dowloader commands",
  start: async (Rudhra, m, { inputCMD, text, doReact, prefix, pushName }) => {
    switch (inputCMD) {
      case "play":
      case "song":
        if (!text) {
          await doReact("❌");
          return m.reply(
            `Please provide a song name !\n\nExample: *${prefix}song despacito*`
          );
        }
        await doReact("📥");
        thumbRudhra = "https://graph.org/file/d0a287fa875c809f234ce.jpg";
        songInfo = await yts(text);
        song = songInfo.videos[0];
        videoUrl = song.url;
        videoId = videoUrl.split("v=")[1];

        await Rudhra.sendMessage(
          m.from,
          {
            image: { url: song.thumbnail },
            caption: `\n*Downloading:* *${song.title}*
            
⬡  Duration: *${song.timestamp}*

⬡  Channel Name: *${song.author.name}*

⬡  Video Uploaded: *${song.ago}*\n`,
          },
          { quoted: m }
        );

        YT.mp3(videoId).then((file) => {
          const inputPath = file.path;
          const outputPath = inputPath + ".mp3";

          ffmpeg(inputPath)
            .format("mp3")
            .on("error", (err) => {
              console.error("Error converting to mp3:", err);
            })
            .on("end", async () => {
              const thumbnailBuffer = await getBuffer(song.thumbnail);
            
            Rudhra.sendMessage(
              m.from,
              {
                audio: fs.readFileSync(outputPath),
                mimetype: "audio/mp4",
                contextInfo: {
                  externalAdReply: {
                    title: song.title.substr(0, 30),
                    body: song.description.substr(0, 30),
                    mediaType: 2,
                    thumbnail: thumbnailBuffer,
                    mediaUrl: song.url
                  }
                }
              },
              { quoted: m }
              );

              fs.unlinkSync(inputPath);
              fs.unlinkSync(outputPath);
            })

            .save(outputPath);
        });

        break;

      case "ytmp3":
      case "mp3":
      case "ytaudio":
        if (
          !text ||
          (!text.includes("youtube.com/watch?v=") &&
            !text.includes("youtu.be/"))
        ) {
          await doReact("❌");
          return m.reply(
            `Please provide a valid YouTube Video link to download as audio!\n\nExample: *${prefix}mp3 put_link*`
          );
        }
        await doReact("📥");
        songInfo = await yts(text);
        song = songInfo.videos[0];
        videoUrl = song.url;
        videoId = videoUrl.split("v=")[1];
        thumbRudhra = "https://graph.org/file/d0a287fa875c809f234ce.jpg";

        await Rudhra.sendMessage(
          m.from,
          {
            image: { url: song.thumbnail },
            caption: `\n*Downloading:* *${song.title}*
            
⬡  Duration: *${song.timestamp}*

⬡  Channel Name: *${song.author.name}*

⬡  Video Uploaded: *${song.ago}*\n`,
          },
          { quoted: m }
        );

        YT.mp3(videoId).then((file) => {
          const inputPath = file.path;
          const outputPath = inputPath + ".mp3";

          ffmpeg(inputPath)
            .format("mp3")
            .on("error", (err) => {
              console.error("Error converting to mp3:", err);
            })
            .on("end", async () => {
              const thumbnailBuffer = await getBuffer(thumbRudhra);

              await Rudhra.sendPresenceUpdate("recording", m.from);

              Rudhra.sendMessage(
                m.from,
                {
                  audio: fs.readFileSync(inputPath),
                  mimetype: "audio/mpeg",
                  ptt: true,
                },
                { quoted: m }
              );

              fs.unlinkSync(inputPath);
              fs.unlinkSync(outputPath);
            })

            .save(outputPath);
        });

        break;

      case "ytmp4":
      case "vmp4":
      case "ytvideo":
        if (
          !text ||
          (!text.includes("youtube.com/watch?v=") &&
            !text.includes("youtu.be/"))
        ) {
          await doReact("❌");
          return m.reply(
            `Please provide a valid YouTube Video link to download as audio!\n\nExample: *${prefix}mp4 put_link*`
          );
        }
        await doReact("📥");
        songInfo = await yts(text);
        song = songInfo.videos[0];
        videoUrl = song.url;
        videoId = videoUrl.split("v=")[1];
        result = await yts(videoId);

        await Rudhra.sendMessage(
          m.from,
          {
            image: { url: song.thumbnail },
            caption: `\n*Downloading:* *${song.title}*
            
⬡  Duration: *${song.timestamp}*

⬡  Channel Name: *${song.author.name}*

⬡  Video Uploaded: *${song.ago}*\n`,
          },
          { quoted: m }
        );

        const ytaud3 = await YT.mp4(videoUrl);
        Rudhra.sendMessage(
          m.from,
          {
            video: { url: ytaud3.videoUrl },
            caption: `${song.title} By: Rudhra`,
          },
          { quoted: m }
        );

        break;

      case "video":
        if (!text) {
          await doReact("❌");
          return m.reply(
            `Please provide an YouTube video name !\n\nExample: *${prefix}video dandilions*`
          );
        }
        await doReact("📥");

        songInfo = await yts(text);
        song = songInfo.videos[0];
        videoUrl = song.url;
        videoId = videoUrl.split("v=")[1];

        await Rudhra.sendMessage(
          m.from,
          {
            image: { url: song.thumbnail },
            caption: `\n*Downloading:* *${song.title}*
            
⬡  Duration: *${song.timestamp}*

⬡   Channel Name: *${song.author.name}*

⬡   Video Uploaded: *${song.ago}*\n`,
          },
          { quoted: m }
        );

        const ytaud2 = await YT.mp4(videoUrl);
        Rudhra.sendMessage(
          m.from,
          {
            video: { url: ytaud2.videoUrl },
            caption: `${song.title} By: Rudhra`,
          },
          { quoted: m }
        );

        break;

      case "yts":
      case "ytsearch":
        if (!args[0]) {
          await doReact("❌");
          return m.reply(`Please provide a search term!`);
        }
        await doReact("🔍");
        let search = await yts(text);
        let thumbnail = search.all[0].thumbnail;
        let num = 1;

        var txt = `*[ YouTube Search ]*\n\n⬡  Search Term: *${args.join(
          " "
        )}*\n\n*⬡  Total Results:* *${search.all.length}*\n`;

        for (let i of search.all) {
          txt += `\n⬡  Result: *${num++}*\n⬡  Title: *${
            i.title
          }*\n⬡  Duration: *${i.timestamp}*\n⬡  Link: ${i.url}\n\n`;
        }

        let buttonMessage = {
          image: { url: thumbnail },
          caption: txt,
        };

        Rudhra.sendMessage(m.from, buttonMessage, { quoted: m });
        break;

      default:
        break;
    }
  },
};
    
