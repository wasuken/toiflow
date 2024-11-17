"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QAPresetResult from "@/components/QAPresetResult";

const QAPresetResultPage: React.FC = () => {
  const [presetName, setPresetName] = useState("");
  const [text, setText] = useState('');
  const [qaList, setQaList] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadResults = () => {
      const storedResults = JSON.parse(localStorage.getItem("qaResults") || "{}");
      setText(storedResults.text || "");
      setPresetName(storedResults.selectedPreset || "");
      setQaList(storedResults.qaList || []);
      setAnswers(storedResults.answers || []);
    };
    loadResults();
  }, []);

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };
  const handleTextChange = (value: string) => {
    setText(value);
  }

  const handleSave = () => {
    const updatedResults = { text, selectedPreset: presetName, qaList, answers };
    localStorage.setItem("qaResults", JSON.stringify(updatedResults));
    alert("結果が保存されました！");
  };

  const handleBack = () => {
    router.push("/create");
  };

  return (
    <QAPresetResult
      presetName={presetName}
      text={text}
      qaList={qaList}
      answers={answers}
      onAnswerChange={handleAnswerChange}
      onTextChange={handleTextChange}
      onSave={handleSave}
      onBack={handleBack}
    />
  );
};

export default QAPresetResultPage;
