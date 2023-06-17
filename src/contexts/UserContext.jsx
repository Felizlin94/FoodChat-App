import { createContext } from "react";
import iconChatCatYellow from "../assets/icons/foodchat_LOGO_yellow.svg";

const userAccounts = [
   {
    Id: 1,
    Username: "Snoopy",
    Password: "puppy",
    Info: {
      avatar: iconChatCatYellow,
      gender: "boy",
      age: "18",
      MBTI: "ENTJ",
      aboutMe:
        "Oh hey! I just wanna know how you doin now? Before we hung everything were like a sign. From you weren’t they oh why can’t I get off u?",
      citySelected: ["Hualien", "Taitung"],
      cuisineSelected: ["Breakfast & brunch", "American Food"],
    },
  },
  {
    Id: 2,
    Username: "Anya",
    Password: "peanuts",
    Info: {
      avatar: iconChatCatYellow,
      gender: "girl",
      age: "6",
      MBTI: "INFP",
      aboutMe:
        "We were both young when I first saw you. I close my eyes, and the flashback starts I'm standing there. On a balcony in summer air.",
      citySelected: ["Taipei", "Keelung"],
      cuisineSelected: ["Café & desserts"],
    },
  },
  {
    Id: 3,
    Username: "Qoo",
    Password: "123",
    Info: {
      avatar: iconChatCatYellow,
      gender: "boy",
      age: "5",
      MBTI: "ESFJ",
      aboutMe:
        "蘭陵美酒鬱金香，玉碗盛來琥珀光。但使主人能醉客，不知何處是他鄉。朱雀橋邊野草花，烏衣巷口夕陽斜。舊時王謝堂前燕，飛入尋常百姓家。",
      citySelected: ["Taichung", "Tainan"],
      cuisineSelected: [
        "Breakfast & brunch",
        "Japanese Food",
        "Local Traditional",
        "Midnight Snack",
        "Korean Food",
      ],
    },
  },
];

const UserContext = createContext("");

export { userAccounts, UserContext };
