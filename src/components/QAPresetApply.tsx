import React from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

import { QuestionPreset } from '@/types';

interface QAPresetApplyProps {
  text: string;
  selectedPreset: string;
  qaList: QuestionPreset[];
  answers: string[];
  storedPresets: QuestionPreset[];
  onTextChange: (text: string) => void;
  onPresetChange: (presetName: string) => void;
  onAnswerChange: (index: number, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const QAPresetApply: React.FC<QAPresetApplyProps> = ({
  text,
  selectedPreset,
  qaList,
  answers,
  storedPresets,
  onTextChange,
  onPresetChange,
  onAnswerChange,
  onSubmit,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>テキスト</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          placeholder='文章を入力してください'
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>プリセットを選択</Form.Label>
        <Form.Select
          value={selectedPreset}
          onChange={(e) => onPresetChange(e.target.value)}
          required
        >
          <option value='' disabled>
            プリセットを選択してください
          </option>
          {storedPresets.map((preset: QuestionPreset, index: number) => (
            <option key={index} value={preset.title}>
              {preset.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {qaList.length > 0 && (
        <>
          <h3>質問に答えてください</h3>
          <ListGroup>
            {qaList.map((question, index) => (
              <ListGroup.Item key={index}>
                <strong>{question.name}</strong>
                <Form.Control
                  type='text'
                  placeholder={`${question.name}の答えを入力`}
                  value={answers[index]}
                  onChange={(e) => onAnswerChange(index, e.target.value)}
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

export default QAPresetApply;
