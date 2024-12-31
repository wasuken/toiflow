'use client';
import React, { useState } from 'react';
import QAPresetForm from '@/components/QAPresetForm';

const QAPresetCreatePage: React.FC = () => {
  const [presetName, setPresetName] = useState('');
  const [questions, setQuestions] = useState<string[]>(['']);

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleChangePresetName = (pname: string) => {
    setPresetName(pname);
  };

  const handleChangeQuestion = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // LocalStorageに保存
    const storedPresets = JSON.parse(localStorage.getItem('qaPresets') || '[]');
    const newPreset = { name: presetName, questions };
    localStorage.setItem(
      'qaPresets',
      JSON.stringify([...storedPresets, newPreset])
    );

    alert('QuestionListが保存されました！');
    setPresetName('');
    setQuestions(['']);
  };
  return (
    <div className='container mt-5'>
      <h1>QuestionList作成</h1>
      <QAPresetForm
        handleAddQuestion={handleAddQuestion}
        handleRemoveQuestion={handleRemoveQuestion}
        handleChangeQuestion={handleChangeQuestion}
        handleChangePresetName={handleChangePresetName}
        handleSubmit={handleSubmit}
        presetName={presetName}
        questions={questions}
      />
    </div>
  );
};

export default QAPresetCreatePage;
