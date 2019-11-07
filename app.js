const { RTMClient } = require("@slack/client");

const { token } = require("./config");

const rtm = new RTMClient(token);

let data = [
  {
    name: "왕장",
    price: 5000
  }
];

rtm.start();

rtm.on("message", message => {
  var text = message.text;

  if (text === "!점심목록") {
    rtm.sendMessage(dataToText(), message.channel);
  } else if (text.includes("!점심추가")) {
    const value = text.replace("!점심추가 ", "");
    const item = value.split(", ");
    if (item.length !== 2) {
      rtm.sendMessage("형식을 지켜주세요.", message.channel);
      return;
    }
    try {
      const newItem = {
        name: item[0],
        price: item[1]
      };
      data = [...data, newItem];
    } catch (err) {
      rtm.sendMessage("알수 없는 에러 발생 삐빠뿌", message.channel);
    }
  } else if (text.includes("!점심삭제")) {
    const id = parseInt(text.replace("!점심삭제 ", ""));
    if (id <= data.length && id > 0) {
      data = data.filter(el => data.indexOf(el) + 1 !== id);
      // data = data.filter(el => el.id !== id);
      rtm.sendMessage("메뉴를 삭제했어요. 삐빅", message.channel);
    } else {
      rtm.sendMessage("그런건 없는데요...?", message.channel);
    }
  } else if (text === "!점심") {
    if (!data.length) rtm.sendMessage("점심이 없어요", message.channel);
    rtm.sendMessage(randomItem(), message.channel);
  }
});

function dataToText() {
  let msg = "";
  if (!data.length) return "점심이 없어요.";

  data.forEach((el, i) => {
    msg += `\`${i + 1}. ${ObjectToText(el)} \` \n`;
  });

  return msg;
}

function randomItem() {
  const item = data[Math.floor(Math.random() * data.length)];
  return ObjectToText(item);
}

function ObjectToText(obj) {
  return `이름 : ${obj.name}, 가격 : ${obj.price}`;
}
