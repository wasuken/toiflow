"use client"
import React from "react";
import QAPresetForm from "@/components/QAPresetForm";

const QAPresetCreatePage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>QAリストプリセット作成</h1>
      <QAPresetForm />
    </div>
  );
};

export default QAPresetCreatePage;
