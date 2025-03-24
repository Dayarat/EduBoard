// import { useEffect, useState } from 'react';
// import { Box, Paper, Typography } from '@mui/material';

// interface IReminderData {
//   id: number;
//   student: string;
//   study: string;
//   extra: string;
//   sleep: string;
//   social: string;
//   physical: string;
//   gpa: string;
//   stress: string;
// }

// interface RecommendationProps {
//   data: IReminderData[];
// }

// const Recommendations = ({ data }: RecommendationProps) => {
//   const [recommendations, setRecommendations] = useState<
//     { student: string; recommendations: string[] }[]
//   >([]);

//   // Function to generate recommendations
//   const generateRecommendations = (data: IReminderData[]) => {
//     return data.map((student) => {
//       const recs = [];

//       if (parseFloat(student.sleep) < 6) {
//         recs.push('Increase sleep hours for better focus and memory.');
//       }
//       if (parseFloat(student.study) > 6 && parseFloat(student.gpa) < 2.5) {
//         recs.push('Reduce study hours and adopt efficient study techniques.');
//       }
//       if (student.stress === 'High') {
//         recs.push('Engage in more physical activity or relaxation techniques.');
//       }

//       return {
//         student: student.student,
//         recommendations: recs,
//       };
//     });
//   };

//   useEffect(() => {
//     if (data.length > 0) {
//       setRecommendations(generateRecommendations(data));
//     }
//   }, [data]);

//   return (
//     <Box>
//       <Paper sx={{ p: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           Personalized Recommendations
//         </Typography>
//         {recommendations.map((rec) => (
//           <Box key={rec.student} sx={{ mb: 2 }}>
//             <Typography variant="subtitle1">Student: {rec.student}</Typography>
//             {rec.recommendations.length > 0 ? (
//               <ul>
//                 {rec.recommendations.map((r, index) => (
//                   <li key={index}>{r}</li>
//                 ))}
//               </ul>
//             ) : (
//               <Typography variant="body2" color="textSecondary">
//                 No recommendations at this time.
//               </Typography>
//             )}
//           </Box>
//         ))}
//       </Paper>
//     </Box>
//   );
// };

// export default Recommendations;
