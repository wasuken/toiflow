"use client";
import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

import { Question, QuestionPreset } from '@/types';

interface CreateAnswerProps {
  storedPresets: QuestionPreset[];
}

const CreateAnswer: React.FC<CreateAnswerProps> = ({
  storedPresets,
}) => {
  const [text, setText] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState('');
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

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
      setText();
    } else {
      alert('Failed create.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>テキスト</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          placeholder='文章を入力してください'
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
          required
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>質問集を選択</Form.Label>
        <Form.Select
          value={selectedPreset}
          onChange={(e) => handlePresetChange(e.target.value)}
          required
        >
          <option value='' disabled>
            質問集を選択してください
          </option>
          {storedPresets.map((preset: QuestionPreset, index: number) => (
            <option key={index} value={preset.title}>
              {preset.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {questionList.length > 0 && (
        <>
          <h3>質問に答えてください</h3>
          <ListGroup>
            {questionList.map((question, index) => (
              <ListGroup.Item key={index}>
                <strong>{question.name}</strong>
                <Form.Control
                  type='text'
                  placeholder={`${question.name}の答えを入力`}
                  value={answers[index] ?? ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  required
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant='success' type='submit' className='mt-4'>
            完了
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateAnswer;
