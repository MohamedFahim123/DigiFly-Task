"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { BsArrowReturnLeft, BsArrowReturnRight } from "react-icons/bs";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaIndent,
  FaItalic,
  FaListOl,
  FaListUl,
  FaOutdent,
  FaUnderline,
} from "react-icons/fa";

const buttonsArr = [
  { command: "bold", icon: <FaBold />, title: "Bold" },
  { command: "italic", icon: <FaItalic />, title: "Italic" },
  { command: "underline", icon: <FaUnderline />, title: "Underline" },
  { command: "justifyLeft", icon: <FaAlignLeft />, title: "Align Left" },
  { command: "justifyCenter", icon: <FaAlignCenter />, title: "Align Center" },
  { command: "justifyRight", icon: <FaAlignRight />, title: "Align Right" },
  { command: "indent", icon: <FaIndent />, title: "Indent" },
  { command: "outdent", icon: <FaOutdent />, title: "Outdent" },
  {
    command: "insertUnorderedList",
    icon: <FaListUl />,
    title: "Unordered List",
  },
  { command: "insertOrderedList", icon: <FaListOl />, title: "Ordered List" },
];

const EditorContent = () => {
  const [content, setContent] = useState<string>("");
  const [activeStyles, setActiveStyles] = useState<string[]>([]);
  const [selectedFont, setSelectedFont] = useState<string>("Poppins");
  const { lang } = useLanguage();

  const inputRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([""]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const updateHistory = (newContent: string) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newContent];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleChange = (event: React.FormEvent) => {
    const editorContent = (event.target as HTMLElement).innerHTML;
    setContent(editorContent);
    updateHistory(editorContent);
    updateActiveStyles();
  };

  const applyStyle = (command: string, value?: string) => {
    document.execCommand(command, false, value || "");

    setActiveStyles((prevStyles) => {
      const isActive = document.queryCommandState(command);
      return isActive
        ? [...prevStyles, command]
        : prevStyles.filter((style) => style !== command);
    });

    inputRef.current?.focus();
    updateHistory(inputRef.current?.innerHTML || "");
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const font = event.target.value;
    setSelectedFont(font);
    applyStyle("fontName", font);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
      if (inputRef.current) inputRef.current.innerHTML = history[newIndex];
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
      if (inputRef.current) inputRef.current.innerHTML = history[newIndex];
    }
  };

  const updateActiveStyles = () => {
    const stylesToCheck = [
      "bold",
      "italic",
      "underline",
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
    ];

    const active = stylesToCheck.filter((style) =>
      document.queryCommandState(style)
    );
    setActiveStyles(active);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    updateActiveStyles();
  }, [content]);

  return (
    <div className="editorContent mt-6 shadow-md">
      <div className="bg-[#6D5CBC0D] border border-gray-200 flex flex-wrap">
        <select
          className="outline-none border-gray-200 border w-32 p-3 bg-[#6D5CBC0D]"
          value={selectedFont}
          onChange={handleFontChange}
        >
          <option value="Poppins">Poppins</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>

        <select className="outline-none border-gray-200 border w-20 p-3 bg-[#6D5CBC0D]">
          {Array.from({ length: 21 }, (_, i) => i + 10).map((size) => (
            <option key={size} value={`${size}px`}>
              {size}px
            </option>
          ))}
        </select>

        <button
          onClick={undo}
          className="text-xl p-3 w-16 flex border-gray-200 border justify-center items-center hover:bg-[#49BD88] hover:text-white active:bg-[#49BD88] transition"
          title="Undo"
        >
          <BsArrowReturnRight />
        </button>
        <button
          onClick={redo}
          className="text-xl p-3 w-16 flex justify-center border-gray-200 border items-center hover:bg-[#49BD88] hover:text-white active:bg-[#49BD88] transition"
          title="Redo"
        >
          <BsArrowReturnLeft />
        </button>

        {buttonsArr.map(({ command, icon, title }) => (
          <button
            key={command}
            onClick={() => applyStyle(command)}
            className={`text-xl w-16 flex justify-center border-gray-200 border items-center p-2 hover:bg-[#49BD88] hover:text-white active:bg-[#49BD88] transition ${
              activeStyles.includes(command) ? "bg-[#49BD88] text-white" : ""
            }`}
            title={title}
          >
            {icon}
          </button>
        ))}
      </div>

      <div
        contentEditable
        onInput={handleChange}
        onBlur={updateActiveStyles}
        className={`color-[#1A1A1A] bg-[#6D5CBC05] border border-gray-200 p-6 min-h-[300px] focus:outline-none w-full`}
        ref={inputRef}
        dir={lang === "en" ? "ltr" : "rtl"}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default EditorContent;
