import React, { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";

const QAPresetDelete: React.FC = () => {
  const [presets, setPresets] = useState<any[]>([]);

  useEffect(() => {
    const storedPresets = JSON.parse(localStorage.getItem("qaPresets") || "[]");
    setPresets(storedPresets);
  }, []);

  const handleDelete = (presetName: string) => {
    const updatedPresets = presets.filter((preset) => preset.name !== presetName);
    localStorage.setItem("qaPresets", JSON.stringify(updatedPresets));
    setPresets(updatedPresets);
    alert(`プリセット「${presetName}」が削除されました！`);
  };

  return (
    <div>
      <h3>削除可能なQAプリセット</h3>
      {presets.length > 0 ? (
        <ListGroup>
          {presets.map((preset, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <span>{preset.name}</span>
              <Button
                variant="danger"
                onClick={() => handleDelete(preset.name)}
              >
                削除
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>現在、保存されているプリセットはありません。</p>
      )}
    </div>
  );
};

export default QAPresetDelete;
