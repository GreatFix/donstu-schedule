import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

// Init VK  Mini App
const initApp = async() => {
  await bridge.send("VKWebAppInit");

  const res = await bridge.send("VKWebAppStorageGet", {"keys": ["GROUP_ID", "GROUP_NAME", "FACULTY"]});
  res.keys.forEach((obj)=>{
      localStorage.setItem(obj.key, obj.value);
  }) 
}

initApp();


ReactDOM.render(<App />, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
