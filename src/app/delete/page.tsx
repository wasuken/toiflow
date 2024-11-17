"use client";
import React, { useState, useEffect } from "react";
import QAPresetDelete from "../../components/QAPresetDelete";

const QAPresetDeletePage: React.FC = () => {
  const [presets, setPresets] = useState<any[]>([]);

  useEffect(() => {
    const storedPresets = JSON.parse(localStorage.getItem("qaPresets") || "[]");
    setPresets(storedPresets);
  }, []);

  const handleDelete = (index: number) => {
    const updatedPresets = [...presets];
    const presetName = updatedPresets[index].name;
    updatedPresets.splice(index, 1);
    localStorage.setItem("qaPresets", JSON.stringify(updatedPresets));
    setPresets(updatedPresets);
    alert(`プリセット「${presetName}」が削除されました！`);
  };
  return (
    <div className="container mt-5">
      <h1>QAプリセット削除</h1>
      <QAPresetDelete
	presets={presets.map((x,i) => {
	  return {...x, delete: () => handleDelete(i)}
	})}
      />
    </div>
  );
};

export default QAPresetDeletePage;
