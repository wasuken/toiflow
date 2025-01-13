'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserAnswerList from '@/components/UserAnswerList';

const QAPresetResultPage: React.FC = () => {
  const [presetName, setPresetName] = useState('');
  const [text, setText] = useState('');
  const [qaList, setQaList] = useState<UserQuestionAnswer[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();
  const fetchResultList = async () => {
    const res = await fetch(`/api/results`);
    if (res.ok) {
      const resj = await res.json();
      setQaList(resj.data);
    } else {
      alert('Error: fetch result list');
    }
  };
  useEffect(() => {
    fetchResultList();
  }, []);

  useEffect(() => {
    fetchResultList();
  }, []);

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };
  const handleTextChange = (value: string) => {
    setText(value);
  };

  const handleSave = () => {
    const updatedResults = {
      text,
      selectedPreset: presetName,
      qaList,
      answers,
    };
    localStorage.setItem('qaResults', JSON.stringify(updatedResults));
    alert('結果が保存されました！');
  };

  const handleBack = () => {
    router.push('/create');
  };

  return (
    <div className='container mt-5'>
      <h1>回答一覧</h1>
      <UserAnswerList
        qaList={qaList}
      />

    </div>
  );
};

export default QAPresetResultPage;
