"use client";
import React from "react";




export default function AppleMusic() {


  return (
        <iframe
          allow="autoplay *; encrypted-media *;"
          height="450"
          style={{
            width: "100%",
            maxWidth: "660px",
            overflow: "hidden",
            background: "transparent",
          }}
          sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts 
          allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src="https://embed.music.apple.com/us/playlist/forrest-frank-essentials/pl.ec51bd4e66d041ec93d4595f97389702"
        ></iframe>
  );
}
