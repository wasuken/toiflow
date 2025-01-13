import React from 'react';
import { ListGroup, Card, Button, Form } from 'react-bootstrap';

interface UserQuestionAnswer {
  id: number;
  questionId: number;
  answer: string;
  question: {
    id: number;
    name: string;
  };
}

interface UserAnswerList {
  id: number;
  memo: string;
  answerList: UserQuestionAnswer[];
  createdAt: string;
  updatedAt: string;
}

interface UserAnswerListProps {
  qaList: UserAnswerList[];
}

const UserAnswerList: React.FC<UserAnswerListProps> = ({
  qaList,
}) => {
  return (
    <div>
      {qaList.length === 0 ? (
        <Card className="text-center p-4">
          <Card.Body>
            <Card.Text>回答データがありません。</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        qaList.map((answerList) => (
          <Card key={answerList.id} className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">回答 #{answerList.id}</h5>
                <small className="text-muted">
                  作成日: {new Date(answerList.createdAt).toLocaleDateString()}
                </small>
              </div>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>メモ</Form.Label>
                <Form.Control
                  type="text"
                  value={answerList.memo}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>
              <ListGroup>
                {answerList.answerList.map((qa) => (
                  <ListGroup.Item key={qa.id}>
                    <div className="fw-bold">{qa.question.title}</div>
                    <div className="text-break">{qa.answer}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default UserAnswerList;
