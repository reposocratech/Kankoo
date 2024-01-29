import axios from "axios";

export const sendMail = (url, msg, email, asunto) => {
  let data = { msg, email, asunto };
  axios
    .post(url, data)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};
