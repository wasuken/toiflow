import React from "react";
import { Button, ListGroup } from "react-bootstrap";

const QAPresetDelete: React.FC = ({ presets }) => {
  return (
    <div>
      {presets.length > 0 ? (
        <ListGroup>
          {presets.map((preset, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <span>{preset.name}</span>
              <Button
                variant="danger"
                onClick={() => preset.delete()}
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
