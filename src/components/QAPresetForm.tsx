import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

const QAPresetForm: React.FC = () => {
  const [presetName, setPresetName] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleChangeQuestion = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // LocalStorageに保存
    const storedPresets = JSON.parse(localStorage.getItem("qaPresets") || "[]");
    const newPreset = { name: presetName, questions };
    localStorage.setItem("qaPresets", JSON.stringify([...storedPresets, newPreset]));

    alert("QAリストプリセットが保存されました！");
    setPresetName("");
    setQuestions([""]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="presetName">
        <Form.Label>プリセット名</Form.Label>
        <Form.Control
          type="text"
          placeholder="プリセット名を入力してください"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Label>質問リスト</Form.Label>
      {questions.map((question, index) => (
        <Row key={index} className="mb-3">
          <Col xs={9}>
            <Form.Control
              type="text"
              placeholder={`質問 ${index + 1}`}
              value={question}
              onChange={(e) => handleChangeQuestion(index, e.target.value)}
              required
            />
          </Col>
          <Col xs={3}>
            <Button
              variant="danger"
              onClick={() => handleRemoveQuestion(index)}
              disabled={questions.length === 1}
            >
              削除
            </Button>
          </Col>
        </Row>
      ))}

      <Button variant="primary" onClick={handleAddQuestion}>
        質問を追加
      </Button>

      <div className="mt-4">
        <Button variant="success" type="submit">
          保存
        </Button>
      </div>
    </Form>
  );
};

export default QAPresetForm;
