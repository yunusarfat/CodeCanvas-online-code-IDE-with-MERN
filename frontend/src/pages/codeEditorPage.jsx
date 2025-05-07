import React, { useState, useEffect, useRef } from "react";
import EditorNavbar from "../components/EditorNavbar";
import Editor from "@monaco-editor/react";
import { MdOutlineLightMode } from "react-icons/md";
import { FaExpandAlt } from "react-icons/fa";
import "../app.css";
import { api_base_url } from "../helper";
import { useParams } from "react-router-dom";

const CodeEditorPage = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState(` <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
            </head>
            <body>
            
            </body>
            </html>`);
  const [cssCode, setCssCode] = useState("body {background-color:#f4f4f4;}");
  const [jsCode, setJsCode] = useState("//comment");
  const { projectID } = useParams();

  const iframeRef = useRef(null);

  const changeTheme = () => {
    if (isLightMode) {
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
  };
  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;
    const iframe = document.getElementById("iframe");
    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };
  useEffect(() => {
    setTimeout(() => {
      run();
    }, 200);
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    fetch(api_base_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHtmlCode(data.project.htmlCode);
        setCssCode(data.project.cssCode);
        setJsCode(data.project.jsCode);
      });
  }, [projectID]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Prevent the default save file dialog

        // Ensure that projectID and code states are updated and passed to the fetch request
        fetch(api_base_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectID, // Make sure projectID is correct
            htmlCode: htmlCode, // Passing the current HTML code
            cssCode: cssCode, // Passing the current CSS code
            jsCode: jsCode, // Passing the current JS code
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Project saved successfully");
            } else {
              alert("Something went wrong");
            }
          })
          .catch((err) => {
            console.error("Error saving project:", err);
            alert("Failed to save project. Please try again.");
          });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [projectID, htmlCode, cssCode, jsCode]);

  return (
    <div>
      <EditorNavbar />
      
      <div className="flex">
        <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
          <div className="tabs text-white flex p-5 justify-between items-center gap-2 w-full h-[50px] bg-[#1A1919]">
            <div className="tabs flex items-center gap-2">
              <div
                onClick={() => setTab("html")}
                className={`cursor-pointer tab rounded py-1 px-3 text-lg ${
                  tab === "html" ? "bg-white text-black" : "bg-[#ab9f9f]"
                }`}
              >
                HTML
              </div>
              <div
                onClick={() => setTab("css")}
                className={`cursor-pointer tab rounded py-1 px-3 text-lg ${
                  tab === "css" ? "bg-white text-black" : "bg-[#ab9f9f]"
                }`}
              >
                CSS
              </div>
              <div
                onClick={() => setTab("js")}
                className={`cursor-pointer tab rounded py-1 px-3 text-lg ${
                  tab === "js" ? "bg-white text-black" : "bg-[#ab9f9f]"
                }`}
              >
                JS
              </div>
            </div>
            <div className="flex items-center gap-2">
              <i
                className="text-lg cursor-pointer bg-[#ab9f9f] p-2 rounded"
                onClick={changeTheme}
              >
                <MdOutlineLightMode />
              </i>
              <i
                className="text-lg cursor-pointer bg-[#ab9f9f] p-2 rounded"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <FaExpandAlt />
              </i>
            </div>
          </div>

          {/* Editor area */}
          {tab === "html" && (
            <Editor
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="html"
              value={htmlCode}
              onChange={(value) => setHtmlCode(value)}
            />
          )}
          {tab === "css" && (
            <Editor
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="css"
              value={cssCode}
              onChange={(value) => setCssCode(value)}
            />
          )}
          {tab === "js" && (
            <Editor
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="javascript"
              value={jsCode}
              onChange={(value) => setJsCode(value)}
            />
          )}
        </div>

        {/* Live Preview */}
        <iframe
          ref={iframeRef}
          id="iframe"
          title="Output"
          className={`${
            isExpanded ? "hidden" : "block w-1/2"
          } min-h-[82vh] bg-white text-black`}
        ></iframe>
      </div>
    </div>
  );
};

export default CodeEditorPage;
