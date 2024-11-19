import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

const QAPresetForm: React.FC = ({
  handleAddQuestion,
  handleRemoveQuestion,
  handleChangeQuestion,
  handleSubmit,
  handleChangePresetName,
  presetName,
  questions,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='presetName'>
        <Form.Label>プリセット名</Form.Label>
        <Form.Control
          type='text'
          placeholder='プリセット名を入力してください'
          value={presetName}
          onChange={(e) => handleChangePresetName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Label>質問リスト</Form.Label>
      {questions.map((question, index) => (
        <Row key={index} className='mb-3'>
          <Col xs={9}>
            <Form.Control
              type='text'
              placeholder={`質問 ${index + 1}`}
              value={question}
              onChange={(e) => handleChangeQuestion(index, e.target.value)}
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

export default QAPresetForm;
