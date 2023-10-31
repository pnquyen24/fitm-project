import React, { useState, useEffect } from "react";

function InputInfo() {
  let [input, setInput] = useState("");
  let [noti, setNoti] = useState("");
  let [Click, setClick] = useState("");
  useEffect(() => {
    if (input.length < 8) {
      setNoti("chưa hợp lệ");
    } else setNoti("hợp lệ");
  }, [input]);

  return (
    <div className="Page">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <span>
        {" "}
        {input} là {noti}{" "}
      </span>
      <button disabled={noti === "chưa hợp lệ" ? true : false}>
        {" "}
        {noti === "chưa hợp lệ" ? "Không cho bấm" : "Cho bấm"}{" "}
      </button>
    </div>
  );
}
export default InputInfo;
