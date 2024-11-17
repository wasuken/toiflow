"use client";
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const AboutPage: React.FC = () => {
  return (
    <Container className="mt-5">
      {/* サービス概要 */}
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">toiflow について</h1>
          <p>
            toiflow は、特定の文章を構造化して管理・分析するためのツールです。複数のQAリストプリセットを作成・適用し、文章を効率的に分解・整理することができます。このサービスは、簡単に利用できるUIと柔軟な機能を備えています。
          </p>
        </Col>
      </Row>

      {/* 特徴セクション */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">特徴</h2>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>QAリストプリセット作成</Card.Title>
              <Card.Text>
                ユーザー独自の質問リストを作成できます。5W1H などのデフォルトリストも利用可能です。
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>QAリストの適用</Card.Title>
              <Card.Text>
                作成したリストを特定の文章に適用し、簡単に分解・分析できます。
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>柔軟な管理</Card.Title>
              <Card.Text>
                プリセットの追加・編集・削除が簡単に行えます。不要なプリセットは即座に削除可能。
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 操作方法セクション */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">操作方法</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>QAリストプリセット作成</Card.Title>
              <Card.Text>
                1. メイン画面で「QAリストプリセット作成」を選択します。
                <br />
                2. プリセット名を入力し、質問リストを追加します。
                <br />
                3. 「保存」をクリックするとプリセットが保存されます。
              </Card.Text>
              <Button variant="primary" href="/create">
                作成ページに移動
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>QAリストの適用</Card.Title>
              <Card.Text>
                1. メイン画面で「QAリスト適用」を選択します。
                <br />
                2. 適用したいプリセットを選択します。
                <br />
                3. 文章を入力し、各質問に回答します。
                <br />
                4. 「完了」をクリックすると適用結果が保存されます。
              </Card.Text>
              <Button variant="success" href="/create">
                適用ページに移動
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* フッター */}
      <Row className="mt-5">
        <Col>
          <footer className="text-center">
            <p>&copy; 2024 toiflow. All Rights Reserved.</p>
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
