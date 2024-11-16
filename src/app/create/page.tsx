"use client";
import React from "react";
import QAPresetApply from "@/components/QAPresetApply";

const QAPresetApplyPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>QAリスト適用</h1>
      <QAPresetApply />
    </div>
  );
};

export default QAPresetApplyPage;
