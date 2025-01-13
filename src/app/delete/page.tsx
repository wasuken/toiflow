'use client';
import React, { useState, useEffect } from 'react';
import QAPresetDelete from '../../components/QAPresetDelete';
import { QuestionPreset } from '@/types';

const QAPresetDeletePage: React.FC = () => {
  const [presets, setPresets] = useState<QuestionPreset[]>([]);

  const fetchQuestionList = async () => {
    const res = await fetch(`/api/presets`);
    if (res.ok) {
      const resj = await res.json();
      setPresets(resj.data);
    } else {
      alert('Error: fetch question list');
    }
  };
  useEffect(() => {
    fetchQuestionList();
  }, []);

  const handleDelete = (index: number) => {
    const updatedPresets = [...presets];
    const presetName = updatedPresets[index].name;
    updatedPresets.splice(index, 1);
    localStorage.setItem('qaPresets', JSON.stringify(updatedPresets));
    setPresets(updatedPresets);
    alert(`質問集「${presetName}」が削除されました！`);
  };
  return (
    <div className='container mt-5'>
      <h1>質問集削除</h1>
      <QAPresetDelete
        presets={presets.map((x, i) => {
          return { ...x, delete: () => handleDelete(i) };
        })}
      />
    </div>
  );
};

export default QAPresetDeletePage;
