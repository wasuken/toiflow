import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import Button from 'react-bootstrap/Button';

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy); // クリップボードにコピー
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2秒後に状態をリセット
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  };

  return (
    <Button
      variant={copied ? 'success' : 'primary'} // コピー済みの場合、ボタン色を変更
      onClick={handleCopy}
      className='ms-3'
    >
      <FiCopy size={20} style={{ marginRight: 8 }} />
      {copied ? 'Copied!' : 'Copy(Markdown)'}
    </Button>
  );
};

export default CopyButton;
