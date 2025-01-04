'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ApplyLayout from '@/components/QAPresetApply';
import { UserQuestionAnswer, Question, QuestionPreset } from '@/types';

const QAPresetApply: React.FC = () => {
  // TODO 剥がして下のコンポーネントに移動する？
  const [text, setText] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState('');
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [storedPresets, setStoredPresets] = useState<QuestionPreset[]>([]);
  const router = useRouter();

  const fetchQuestionList = async () => {
    const res = await fetch(`/api/presets`);
    if (res.ok) {
      const resj = await res.json();
      setStoredPresets(resj.data);
    } else {
      alert('Error: fetch question list');
    }
  };

  useEffect(() => {
    fetchQuestionList();
  }, []);

  const handlePresetChange = (presetName: string) => {
    const selected = storedPresets.find(
      (preset: QuestionPreset) => preset.title === presetName
    );
    if (selected) {
      setSelectedPreset(selected.title);
      setQuestionList(selected.questionList);
      setAnswers(new Array(selected.questionList.length));
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const qaList = questionList.map((q, i) => {
      return {
        questionId: q.id,
        answer: answers[i],
      };
    });
    const res = await fetch('/api/results', {
      method: 'POST',
      body: JSON.stringify({ text, qaList }),
    });
    if (res.ok) {
      alert('Success create.');
      setSelectedPreset('');
      setQuestionList([]);
      setAnswers([]);
    } else {
      alert('Failed create.');
    }
  };

  return (
    <div className='container mt-5'>
      <h1>QAリスト適用</h1>

      <ApplyLayout
        text={text}
        onTextChange={setText}
        selectedPreset={selectedPreset}
        questionList={questionList}
        answers={answers}
        storedPresets={storedPresets}
        onPresetChange={handlePresetChange}
        onAnswerChange={handleAnswerChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default QAPresetApply;
