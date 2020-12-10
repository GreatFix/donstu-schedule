import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

// Init VK  Mini App
bridge.send("VKWebAppInit");
bridge.send("VKWebAppStorageSet",{"key":"GROUP_ID", "value":"34915"});
bridge.send("VKWebAppStorageGet", {"keys": ["GROUP_ID"]}).then((res)=>{
  res.keys.forEach((obj)=>{
    localStorage.setItem(obj.key, obj.value);
  })
}) 
ReactDOM.render(<App />, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
