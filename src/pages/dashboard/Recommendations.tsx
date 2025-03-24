import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import { CheckCircle, TipsAndUpdates } from '@mui/icons-material';
import { parseCSV } from 'data/util/getData';
import { getAIPersonalizedRecommendations } from 'data/util/geminiServics';

interface IReminderData {
  id: number;
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

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<
    { student: string | null; recommendations: string[]; loading: boolean }[]
  >([]);
  const [data, setData] = useState<IReminderData[]>([]);
  const [avgData, setAvgData] = useState<AvgData>({
    averageGPA: 0,
    averageStudyHours: 0,
    averageStressLevel: 0,
    averageEngagement: 0,
  });
  const [loading, setLoading] = useState(true);
  const userIndex = sessionStorage.getItem('userIndex');
  const loggedInIndex = userIndex ? parseInt(userIndex) : undefined;

  // Initialize avgData
  useEffect(() => {
    if (loggedInIndex === undefined) {
      console.log('Initializing avgData from localStorage');
      setAvgData({
        averageGPA: parseFloat(localStorage.getItem('averageGPA') || '0'),
        averageStudyHours: parseFloat(localStorage.getItem('averageStudyHours') || '0'),
        averageStressLevel: parseFloat(localStorage.getItem('averageStressLevel') || '0'),
        averageEngagement: parseFloat(localStorage.getItem('averageEngagement') || '0'),
      });
    }
  }, [loggedInIndex]);

  // Fetch student data if logged in as parent
  useEffect(() => {
    if (loggedInIndex !== undefined) {
      const fetchData = async () => {
        try {
          const parsedData = await parseCSV('/student_lifestyle_dataset.csv', loggedInIndex);
          setData(parsedData);
        } catch (error) {
          console.error('Error fetching dataset:', error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [loggedInIndex]);

  // Generate recommendations
  useEffect(() => {
    const generateRecommendations = async () => {
      try {
        setLoading(true);

        if (loggedInIndex === undefined) {
          // Teacher view - use avgData
          const aiRecs = await getAIPersonalizedRecommendations(
            {
              student: 'All Students',
              study: avgData.averageStudyHours.toString(),
              extra: '',
              sleep: '',
              social: avgData.averageEngagement.toString(),
              physical: '',
              gpa: avgData.averageGPA.toString(),
              stress: avgData.averageStressLevel.toString(),
            },
            avgData,
          );

          console.log('AI Recommendations:', aiRecs);

          setRecommendations([
            {
              student: null,
              recommendations: aiRecs,
              loading: false,
            },
          ]);
        } else {
          // Parent view - use individual student data
          if (data.length > 0) {
            const recommendationsWithAI = await Promise.all(
              data.map(async (student) => {
                const aiRecs = await getAIPersonalizedRecommendations(student, avgData);
                return {
                  student: student.student,
                  recommendations: aiRecs,
                  loading: false,
                };
              }),
            );
            setRecommendations(recommendationsWithAI);
          }
        }
      } catch (error) {
        console.error('Error generating recommendations:', error);
        setRecommendations([
          {
            student: null,
            recommendations: ['Failed to load recommendations. Please try again later.'],
            loading: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInIndex === undefined || data.length > 0) {
      generateRecommendations();
    }
  }, [data, avgData, loggedInIndex]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        {loggedInIndex === undefined
          ? 'AI-Powered Personalized Recommendations for Teacher'
          : 'AI-Powered Personalized Recommendations for Parents'}
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : recommendations.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No recommendations available.
        </Typography>
      ) : (
        <Box sx={{ display: 'grid', gap: 3 }}>
          {recommendations.map((rec, index) => (
            <Card key={rec.student || `rec-${index}`} elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <TipsAndUpdates color="primary" sx={{ mr: 1 }} />
                  {loggedInIndex === undefined
                    ? 'General Recommendations for All Students'
                    : `Recommendations for student ${rec.student}`}
                </Typography>

                {rec.loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={20} sx={{ mr: 2 }} />
                    <Typography>Generating personalized recommendations...</Typography>
                  </Box>
                ) : rec.recommendations.length > 0 ? (
                  <List dense>
                    {rec.recommendations.map((r, i) => (
                      <ListItem key={i} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body1">
                          {r
                            .replace(/\*\*/g, '')
                            .replace(/^[-•]\s*/, '')
                            .trim()}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No recommendations available for this student.
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Recommendations;
