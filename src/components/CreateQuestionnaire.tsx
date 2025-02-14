"use client";
import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

const CreateQuestionnaire: React.FC = ({
}) => {
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
    const res = await fetch(`/api/presets`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ questions, title: presetName }),
    });
    if (res.ok) {
      alert('QuestionListが保存されました！');
      setPresetName('');
      setQuestions(['']);
    } else {
      alert('[/api/preset] POST Error.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postQuestionList();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='presetName'>
        <Form.Label>タイトル</Form.Label>
        <Form.Control
          type='text'
          placeholder='タイトルを入力してください'
          value={presetName}
          onChange={(e) => handleChangePresetName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Label>質問集</Form.Label>
      {questions.map((question, index) => (
        <Row key={index} className='mb-3'>
          <Col xs={9}>
            <Form.Control
              type='text'
              placeholder={`質問 ${index + 1}`}
              value={question}
              onChange={(e) => handleChangeQuestion(index, e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  e.preventDefault();
                  handleAddQuestion();
                }
              }}
              required
            />
          </Col>
          <Col xs={3}>
            <Button
              variant='danger'
              onClick={() => handleRemoveQuestion(index)}
              disabled={questions.length === 1}
            >
              削除
            </Button>
          </Col>
        </Row>
      ))}

      <Button variant='primary' onClick={handleAddQuestion}>
        質問を追加
      </Button>

      <div className='mt-4'>
        <Button variant='success' type='submit'>
          保存
        </Button>
      </div>
    </Form>
  );
};

export default CreateQuestionnaire;
