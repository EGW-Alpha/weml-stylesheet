const getColorScheme = (isDark) => {
  return isDark ? "dark" : "light";
};

const fileList = [
  { name: "AH128", url: "AH128.html" },
  { name: "W-List", url: "w-list.html" },
];
let filePreviewIframe = document.getElementById("weml-file-preview");
let fileListWrapperElement = document.getElementById("weml-file-list");
const darkColorSchemeHandler = window.matchMedia(
  "(prefers-color-scheme: dark)"
);
let colorScheme = getColorScheme(darkColorSchemeHandler.matches);
const toggleIframeColorScheme = () => {
  const iFrameMeta = document.createElement("meta");
  iFrameMeta.name = "color-scheme";
  iFrameMeta.content = "light dark";

  // let filePreviewIframeBody;
  // if (filePreviewIframe.contentDocument) {
  //   // eslint-disable-next-line prefer-destructuring
  //   filePreviewIframeBody =
  //     filePreviewIframe.contentDocument.getElementsByTagName("body")[0];
  // } else if (filePreviewIframe.contentWindow) {
  //   // eslint-disable-next-line prefer-destructuring
  //   filePreviewIframeBody =
  //     filePreviewIframe.contentWindow.document.getElementsByTagName("body")[0];
  // }
  // filePreviewIframeBody.style.backgroundColor =
  //   colorScheme === "dark" ? "hsl(228, 5%, 15%)" : "#FFF";
  // filePreviewIframeBody.style.color =
  //   colorScheme === "dark" ? "hsl(228, 5%, 80%)" : "#222";
  filePreviewIframe.contentDocument
    ?.getElementsByTagName("head")[0]
    .append(iFrameMeta);
};

const togglePreview = (url) => {
  filePreviewIframe.src = `${window.location.origin}/wemls/${url}`;
};

const toggleIframeScripts = () => {
  const styleUrl = `${window.location.origin}/css/weml.css`;
  const scriptUrl = `${window.location.origin}/js/weml.js`;
  let filePreviewIframeHead;
  if (filePreviewIframe.contentDocument) {
    // eslint-disable-next-line prefer-destructuring
    filePreviewIframeHead =
      filePreviewIframe.contentDocument.getElementsByTagName("head")[0];
  } else if (filePreviewIframe.contentWindow) {
    // eslint-disable-next-line prefer-destructuring
    filePreviewIframeHead =
      filePreviewIframe.contentWindow.document.getElementsByTagName("head")[0];
  }

  const iFrameWEMLMeta = document.createElement("meta");
  iFrameWEMLMeta.name = "color-scheme";
  iFrameWEMLMeta.content = "light dark";

  const iFrameWEMLStylesheet = document.createElement("link");
  iFrameWEMLStylesheet.href = styleUrl;
  iFrameWEMLStylesheet.rel = "stylesheet";

  const iFrameWEMLScript = document.createElement("script");
  iFrameWEMLScript.type = "text/javascript";
  iFrameWEMLScript.src = scriptUrl;
  filePreviewIframeHead?.append(
    iFrameWEMLMeta,
    iFrameWEMLStylesheet,
    iFrameWEMLScript
  );
};

darkColorSchemeHandler.addEventListener("change", (event) => {
  colorScheme = getColorScheme(event.matches);
  toggleIframeColorScheme();
});
window.addEventListener("load", async () => {
  filePreviewIframe = document.getElementById("weml-file-preview");
  fileListWrapperElement = document.getElementById("weml-file-list");
  const fileListElement = document.createElement("ol");
  fileListWrapperElement.appendChild(fileListElement);

  fileList.forEach((file, index) => {
    if (index === 0) {
      const currentFile =
        JSON.parse(localStorage.getItem("current-weml-preview")) || file;
      togglePreview(currentFile.url);
    }
    const link = document.createElement("a");
    link.onclick = (e) => {
      e.preventDefault();
      localStorage.setItem("current-weml-preview", JSON.stringify(file));
      togglePreview(file.url);
    };
    link.href = "#";
    link.text = file.name;
    const li = document.createElement("li");
    li.appendChild(link);
    fileListElement.appendChild(li);
  });
  filePreviewIframe.addEventListener("load", () => {
    toggleIframeColorScheme();
    toggleIframeScripts();
  });
});
