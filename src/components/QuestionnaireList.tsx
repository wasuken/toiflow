"use client";
import React, { useCallback } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import CopyButton from './CopyButton';

interface QuestionnaireListProps {
  presetName: string;
  text: string;
  qaList: string[];
  answers: string[];
  onAnswerChange: (index: number, value: string) => void;
  onTextChange: (text: string) => void;
  onSave: () => void;
  onBack: () => void;
}

const QuestionnaireList: React.FC<QuestionnaireListProps> = ({
  presetName,
  qaList,
  text,
  answers,
  onAnswerChange,
  onTextChange,
  onSave,
  onBack,
}) => {
  const genTextToCopy = useCallback(() => {
    let qrst = '';
    for (let i = 0; i < qaList.length; i++) {
      qrst += `- Q. ${qaList[i]}
  - A. ${answers[i]}
`;
    }
    const textToCopy = `# テキスト

${text}

# QA

${qrst}
`;
    return textToCopy;
  }, [text, qaList, answers]);

  return (
    <div className='mt-3'>
      <h3>質問集名: {presetName}</h3>
      <h3>入力されたテキスト</h3>
      {/* textarea を再表示して編集可能に */}
      <Form.Control
        as='textarea'
        rows={3}
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        className='mb-4'
      />
      <ListGroup>
        {qaList.map((question, index) => (
          <ListGroup.Item key={index}>
            <strong>{question}</strong>
            <Form.Control
              type='text'
              value={answers[index]}
              onChange={(e) => onAnswerChange(index, e.target.value)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className='mt-4'>
        <Button variant='primary' onClick={onSave}>
          保存
        </Button>
        <Button variant='secondary' className='ms-3' onClick={onBack}>
          戻る
        </Button>
        <CopyButton textToCopy={genTextToCopy()} />
      </div>
    </div>
  );
};

export default QuestionnaireList;
