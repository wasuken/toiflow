import UserAnswerList from '@/components/UserAnswerList';
import { listQuestionnaireAndAnswers } from '@/lib/api';

const QAPresetResultPage = async () => {
  const qaList = await listQuestionnaireAndAnswers();

  return (
    <div className='container mt-5'>
      <h1>回答一覧</h1>
      <UserAnswerList
        qaList={qaList.data}
      />
    </div>
  );
};

export default QAPresetResultPage;
