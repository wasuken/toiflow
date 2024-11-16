import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";

const QAPresetApply: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState("");
  const [qaList, setQaList] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    // デフォルトの "5W1H" をLocalStorageに保存
    const defaultPreset = {
      name: "5W1H",
      questions: ["Who?", "What?", "Where?", "When?", "Why?", "How?"],
    };
    const storedPresets = JSON.parse(localStorage.getItem("qaPresets") || "[]");
    if (!storedPresets.some((preset: any) => preset.name === "5W1H")) {
      localStorage.setItem("qaPresets", JSON.stringify([defaultPreset, ...storedPresets]));
    }
  }, []);

  const handlePresetChange = (presetName: string) => {
    const storedPresets = JSON.parse(localStorage.getItem("qaPresets") || "[]");
    const selected = storedPresets.find((preset: any) => preset.name === presetName);
    if (selected) {
      setSelectedPreset(selected.name);
      setQaList(selected.questions);
      setAnswers(new Array(selected.questions.length).fill(""));
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ selectedPreset, qaList, answers });
    alert("QAリスト適用が完了しました！");
  };

  const storedPresets = JSON.parse(localStorage.getItem("qaPresets") || "[]");

  return (
    <div>
      <Form onSubmit={handleSubmit}>
	<Form.Group className="mb-3">
          <Form.Label>テキスト</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="文章を入力してください"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
	</Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>プリセットを選択</Form.Label>
          <Form.Select
            value={selectedPreset}
            onChange={(e) => handlePresetChange(e.target.value)}
            required
          >
            <option value="" disabled>
              プリセットを選択してください
            </option>
            {storedPresets.map((preset: any, index: number) => (
              <option key={index} value={preset.name}>
                {preset.name}
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
                  <strong>{question}</strong>
                  <Form.Control
                    type="text"
                    placeholder={`${question}の答えを入力`}
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    required
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Button variant="success" type="submit" className="mt-4">
              完了
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default QAPresetApply;
