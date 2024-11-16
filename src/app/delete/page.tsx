"use client";
import React from "react";
import QAPresetDelete from "../../components/QAPresetDelete";

const QAPresetDeletePage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>QAプリセット削除</h1>
      <QAPresetDelete />
    </div>
  );
};

export default QAPresetDeletePage;
