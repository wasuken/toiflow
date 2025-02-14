import DeleteQuestionnaire from '../../components/DeleteQuestionnaire';
import { QuestionPreset } from '@/types';
import { listQuestionnaire } from '@/lib/api'

const QAPresetDeletePage  = async () => {
  const presets = await listQuestionnaire();
  return (
    <div className='container mt-5'>
      <h1>質問集削除</h1>
      <DeleteQuestionnaire
        presets={presets.data}
      />
    </div>
  );
};

export default QAPresetDeletePage;
