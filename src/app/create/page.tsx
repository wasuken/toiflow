"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApplyLayout from "@/components/QAPresetApply";

const QAPresetApply: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [qaList, setQaList] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [storedPresets, setStoredPresets] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const defaultPreset = {
      name: "5W1H",
      questions: ["Who?", "What?", "Where?", "When?", "Why?", "How?"],
    };
    const presets = JSON.parse(localStorage.getItem("qaPresets") || "[]");
    if (!presets.some((preset: any) => preset.name === "5W1H")) {
      const updatedPresets = [defaultPreset, ...presets];
      localStorage.setItem("qaPresets", JSON.stringify(updatedPresets));
      setStoredPresets(updatedPresets);
    } else {
      setStoredPresets(presets);
    }
  }, []);

  const handlePresetChange = (presetName: string) => {
    const selected = storedPresets.find((preset: any) => preset.name === presetName);
    if (selected) {
      setSelectedPreset(selected.name);
      setQaList(selected.questions);
      setAnswers(new Array(selected.questions.length).fill(""));
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ text, selectedPreset, qaList, answers });
    localStorage.setItem("qaResults", JSON.stringify({text, selectedPreset, qaList, answers}));
    router.push('/delete');
  };

  return (
    <ApplyLayout
      text={text}
      selectedPreset={selectedPreset}
      qaList={qaList}
      answers={answers}
      storedPresets={storedPresets}
      onTextChange={setText}
      onPresetChange={handlePresetChange}
      onAnswerChange={handleAnswerChange}
      onSubmit={handleSubmit}
    />
  );
};

export default QAPresetApply;