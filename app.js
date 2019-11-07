const { RTMClient } = require("@slack/client");

const botAPIToken = "xoxb-7569711284-823584234279-F9jHYl8EOJ1USMeDUsB38AmD";

const token = process.env.SLACK_TOKEN || botAPIToken;


let data = [
  {
    name: "던킨도너츠",
    price: "1500"
  }
];

rtm.start();

rtm.on("message", message => {
  var text = message.text;

  if (text === "!점심 목록") {
    rtm.sendMessage(dataToText(), message.channel);
  } else if (text === "!점심 추가") {
    const data = [];
  } else if (text.includes("!점심 삭제")) {
    const idx = text.replace("!점심 삭제 ", "");
    console.log(idx);
    console.log(data.length);
    if (idx <= data.length) {
      data = data.filter((el, i) => i !== idx);
      rtm.sendMessage("메뉴를 삭제했어요. 삐빅", message.channel);
    } else {
      rtm.sendMessage("그런건 없는데요...?", message.channel);
    }
  }
});

function dataToText() {
  let msg = "";
  data.forEach((el, i) => {
    const text = `${i + 1}. 이름 : ${el.name}, 가격 : ${el.price} \n`;
    msg += text;
  });

  return msg;
}
