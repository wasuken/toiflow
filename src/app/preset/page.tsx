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

  const postQuestionList = async () => {
    const res = await fetch(`/api/preset`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({ questions, title: presetName }),
    });
    if (res.ok) {
      alert('QuestionListが保存されました！');
      setPresetName('');
      setQuestions(['']);
    }else{
      alert('[/api/preset] POST Error.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postQuestionList();
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
