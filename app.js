const { RTMClient } = require("@slack/client");

const botAPIToken = "xoxb-7569711284-823584234279-xPoQEkUaG2Be4q8EldGcXZI2";

const token = process.env.SLACK_TOKEN || botAPIToken;

const rtm = new RTMClient(token);

let data = [
  {
    id: 1,
    name: "던킨도너츠",
    price: "1500"
  },
  {
    id: 2,
    name: "신메뉴",
    price: "99999"
  }
];

rtm.start();

rtm.on("message", message => {
  var text = message.text;

  if (text === "!점심 목록") {
    rtm.sendMessage(dataToText(), message.channel);
  } else if (text.includes("!점심 추가")) {
  } else if (text.includes("!점심 삭제")) {
    const id = parseInt(text.replace("!점심 삭제 ", ""));
    if (id <= data.length && id > 0) {
      data = data.filter(el => el.id !== id);
      rtm.sendMessage("메뉴를 삭제했어요. 삐빅", message.channel);
    } else {
      rtm.sendMessage("그런건 없는데요...?", message.channel);
    }
  }
});

function dataToText() {
  let msg = "";
  if (!data.length) return "점심이 없어요.";

  data.forEach(el => {
    const text = `${el.id}. 이름 : ${el.name}, 가격 : ${el.price} \n`;
    msg += text;
  });

  return msg;
}
