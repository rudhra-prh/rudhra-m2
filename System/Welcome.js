const {checkWelcome}= require('./MongoDB/MongoDb_Core');

module.exports = async (Rudhra, anu) => {
  try {
    let metadata = await Rudhra.groupMetadata(anu.id);
    let participants = anu.participants;
    let desc = metadata.desc;
    if (desc == undefined) desc = "No Description";

    for (let num of participants) {
      try {
        ppuser = await Rudhra.profilePictureUrl(num, "image");
      } catch {
        ppuser = botImage4;
      }

      if (anu.action == "add") {
        const WELstatus = await checkWelcome(anu.id);
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} Joined/Got Added in: ${
            metadata.subject
          }\n`
        );
        Rudhratext = `
Hello @${WAuserName.split("@")[0]} ,

Welcome to *${metadata.subject}*.


${desc}

*Thank You.*
  `;
        if (WELstatus) {
          await Rudhra.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: Rudhratext,
            mentions: [num],
          });
        }
      } else if (anu.action == "remove") {
        const WELstatus = await checkWelcome(anu.id);
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} Left/Got Removed from: ${
            metadata.subject
          }\n`
        );
        Rudhratext = `
  @${WAuserName.split("@")[0]}  left the group.
  `;
        if (WELstatus) {
          await Rudhra.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: Rudhratext,
            mentions: [num],
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
