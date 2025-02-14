export async function listQuestionnaire() {
  const res = await fetch(`http://localhost:3000/api/presets`, {
    next: { 
      revalidate: 3600 
    }
  });
  if (!res.ok) {
    throw new Error('Error: fetch question list');
  } 
  return res.json();
};
export async function listQuestionnaireAndAnswers() {
  const res = await fetch(`http://localhost:3000/api/results`, {
    next: { 
      revalidate: 3600 
    }

  });
  if (!res.ok) {
    throw new Error('Error: fetch result list');
  }
  return res.json();
};
