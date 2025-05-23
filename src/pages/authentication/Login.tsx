import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import PasswordTextField from 'components/common/PasswordTextField';
import Facebook from 'components/icons/authentication/Facebook';
import { useForm, SubmitHandler } from 'react-hook-form';
import paths from 'routes/paths';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  email: string;
  password: string;
}

const checkBoxLabel = { inputProps: { 'aria-label': 'Checkbox' } };

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<LoginFormValues> = (data) => {
    const { email, password } = data;

    // Clear previous session data
    sessionStorage.removeItem('userIndex');

    if (email === 'parent30@gmail.com' && password === '12345678') {
      sessionStorage.setItem('userIndex', '30'); // Store as string
      navigate('/dashboard', { state: { index: 30 } });
    } else if (email === 'parent20@gmail.com' && password === '12345678') {
      sessionStorage.setItem('userIndex', '20');
      navigate('/dashboard', { state: { index: 20 } });
    } else if (email === 'teacher@gmail.com' && password === '12345678') {
      // No index needed for teacher
      navigate('/dashboard');
    } else if (email === 'parent13@gmail.com' && password === '12345678') {
      sessionStorage.setItem('userIndex', '13');
      navigate('/dashboard', { state: { index: 13 } });
    } else if (email === 'test@gmail.com' && password === '12345678') {
      // No index needed for test user
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <Box sx={{ width: { xs: 1, sm: 506 }, px: { xs: 2, sm: 0 }, py: 10 }}>
      <Typography variant="h1">Get's started.</Typography>
      <Typography
        variant="subtitle1"
        component="p"
        sx={{
          color: 'neutral.main',
          mt: 2,
          mb: 6.75,
        }}
      >
        Don’t have an account?{' '}
        <Typography variant="button" component={Link} href={paths.signup} color="secondary">
          Sign up
        </Typography>
      </Typography>

      <Stack gap={1.75} mb={3} direction={{ xs: 'column', sm: 'row' }}>
        <Button
          variant="outlined"
          size="large"
          startIcon={<IconifyIcon icon="flat-color-icons:google" />}
          sx={{ width: { sm: 1 / 2 }, py: 2.375, px: 4.375 }}
        >
          Sign in with Google
        </Button>

        <Button
          variant="contained"
          size="large"
          startIcon={<Facebook />}
          sx={{ width: { sm: 1 / 2 }, py: 2.25, px: 2.875, bgcolor: 'primary.dark' }}
        >
          Sign in with Facebook
        </Button>
      </Stack>

      <Divider>or</Divider>

      {/* Integrate handleLogin into the form submission */}
      <Box component="form" onSubmit={handleSubmit(handleLogin)}>
        <Paper sx={(theme) => ({ padding: theme.spacing(2.5), my: 3, boxShadow: 1 })}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <TextField
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                fullWidth
                {...register('email')}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <PasswordTextField
                id="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                fullWidth
                {...register('password')}
              />
            </Grid>
          </Grid>
        </Paper>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3.75}>
          <FormControlLabel
            control={
              <Checkbox
                {...checkBoxLabel}
                sx={{
                  color: 'neutral.light',
                }}
                icon={<IconifyIcon icon="fluent:checkbox-unchecked-24-regular" />}
                checkedIcon={<IconifyIcon icon="fluent:checkbox-checked-24-regular" />}
              />
            }
            label={
              <Typography variant="h6" component="p" sx={{ color: 'neutral.light' }}>
                Remember me
              </Typography>
            }
          />

          <Typography variant="h6" component={Link} href="#!" color="secondary">
            Forgot your password?
          </Typography>
        </Stack>

        <Button variant="contained" type="submit" fullWidth color="secondary" sx={{ py: 2.25 }}>
          <Typography variant="h4" component="span">
            Sign in
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
