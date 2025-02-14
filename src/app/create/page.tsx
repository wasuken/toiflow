import React, { useState, useEffect } from 'react';
import CreateAnswer from '@/components/CreateAnswer';
import { UserQuestionAnswer, Question, QuestionPreset } from '@/types';
import { listQuestionnaire } from '@/lib/api';

const QAPresetApply: React.FC = async () => {
  const storedPresets = await listQuestionnaire();

  return (
    <div className='container mt-5'>
      <h1>回答作成</h1>

      <CreateAnswer
        storedPresets={storedPresets.data}
      />
    </div>
  );
};

export default QAPresetApply;
