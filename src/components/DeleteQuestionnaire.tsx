"use client";
import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation'

const DeleteAnswer: React.FC = ({ presets }) => {
  const router = useRouter();
  const fpresets = presets.map((x, i) => {
    return { ...x, delete: () => handleDelete(i) };
  });
  const deleteQuestionList = async (id: number) => {
    const res = await fetch(`/api/presets/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      const resj = await res.json();
    } else {
      alert('Error: delete presetes');
    }
  }

  const handleDelete = async (index: number) => {
    const updatedPresets = [...presets];
    const preset = updatedPresets[index];
    console.log('debug', preset)
    const res = await deleteQuestionList(preset.id);
    alert(`質問集「${preset.title}」が削除されました！`);
    router.refresh();
  };
  return (
    <div>
      {presets.length > 0 ? (
        <ListGroup>
          {fpresets.map((preset, index) => (
            <ListGroup.Item
              key={index}
              className='d-flex justify-content-between align-items-center'
            >
              <span>{preset.title}</span>
              <Button variant='danger' onClick={() => preset.delete()}>
                削除
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>現在、保存されている質問集はありません。</p>
      )}
    </div>
  );
};

export default DeleteAnswer;
