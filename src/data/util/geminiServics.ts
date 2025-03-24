import { GoogleGenerativeAI } from '@google/generative-ai';

interface StudentData {
  student: string;
  study: string;
  extra: string;
  sleep: string;
  social: string;
  physical: string;
  gpa: string;
  stress: string;
}

interface AvgData {
  averageGPA: number;
  averageStudyHours: number;
  averageStressLevel: number;
  averageEngagement: number;
}

export const getAIPersonalizedRecommendations = async (
  studentData: StudentData,
  avgData: AvgData,
) => {
  try {
    const userIndex = sessionStorage.getItem('userIndex');
    const index = userIndex ? parseInt(userIndex) : undefined;

    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI('AIzaSyBdWuHgLE6k5qjGLRzqc9f2EnaFScIh7sI');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let prompt = '';

    if (index !== undefined) {
      prompt = `
        I am a parent of the below child (student), please provide personalized recommendations to the student based on the lifestyle data.
        Analyze this student's data and provide 5-10 specific, actionable recommendations to improve the academic performance and wellbeing.
        Be concise but helpful in your suggestions.

        Important: Return only the recommendations in plain text format (no markdown, no bold, no headings). Each recommendation should be on a new line without numbering or bullet points.

        Student Data:
        - Name: ${studentData.student}
        - Study Hours: ${studentData.study} hours/day
        - Extra Activities: ${studentData.extra} hours/day
        - Sleep: ${studentData.sleep} hours/night
        - Social: ${studentData.social} hours/day
        - Physical Activity: ${studentData.physical} hours/week
        - GPA: ${studentData.gpa}
        - Stress Level: ${studentData.stress}

        Recommendations:
      `;
    } else {
      prompt = `
        I am a teacher of the below children (students), please provide recommendations to the students metrics based on their lifestyle data.
        Analyze this students' data and provide 5-10 specific, actionable recommendations to improve the academic performance and wellbeing of my students.
        Be concise but helpful in your suggestions.

        Important: Return only the recommendations in plain text format (no markdown, no bold, no headings). Each recommendation should be on a new line without numbering or bullet points.

        Student average data:
        - Average GPA: ${avgData.averageGPA}
        - Average Study Hours: ${avgData.averageStudyHours} hours/day
        - Average Social Engagement: ${avgData.averageEngagement} hours/day
        - Average Stress Level: ${avgData.averageStressLevel}

        Recommendations:
      `;
    }

    console.log('Prompt:', prompt);

    const result = await model.generateContent(prompt);
    console.log('Result:', result);
    const response = await result.response;
    const text = response.text();

    // Format the response into an array of recommendations
    const recommendations = text
      .split('\n')
      .filter((line: string) => line.trim().length > 0 && line.trim() !== 'Recommendations:')
      .map((line: string) => line.replace(/^\d+\.\s*/, '').trim());

    console.log('Recommendations:', recommendations);

    return recommendations;
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    return ['Could not generate recommendations at this time.', 'Please try again later.'];
  }
};
