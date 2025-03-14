import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Box, 
  CssBaseline, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableCell,
  ListItemButton, 
  TableContainer, 
  TableHead, 
  TableRow, 
  createTheme, 
  ThemeProvider 
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ImageIcon from '@mui/icons-material/Image';

// Create a black and blue theme
const theme = createTheme({
  palette: {
    mode: 'dark', // Dark mode
    primary: {
      main: '#2196F3', // Blue
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1E1E1E', // Slightly lighter dark for paper components
    },
    text: {
      primary: '#FFFFFF', // White text
      secondary: '#B0B0B0', // Light gray text
    },
  },
});

const drawerWidth = 240;

const Dashboard = () => {
  const [predictions, setPredictions] = useState([]);

  // Mock data for predictions (replace with API calls)
  useEffect(() => {
    const mockData = [
      { id: 1, filename: 'audio1.mp3', type: 'audio', result: 'Real', timestamp: '2023-10-01' },
      { id: 2, filename: 'video1.mp4', type: 'video', result: 'Fake', timestamp: '2023-10-02' },
      { id: 3, filename: 'audio2.mp3', type: 'audio', result: 'Fake', timestamp: '2023-10-03' },
      { id: 4, filename: 'video2.mp4', type: 'video', result: 'Real', timestamp: '2023-10-04' },
    ];
    setPredictions(mockData);
  }, []);

  // Data for the pie chart
  const pieChartData = [
    { name: 'Real', value: predictions.filter(p => p.result === 'Real').length },
    { name: 'Fake', value: predictions.filter(p => p.result === 'Fake').length },
  ];

  const COLORS = ['#00C49F', '#FF8042']; // Colors for the pie chart
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* Side Navigation Bar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { 
              width: drawerWidth, 
              boxSizing: 'border-box',
              backgroundColor: '#1E1E1E', // Dark background for drawer
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: '#2196F3' }} /> {/* Blue icon */}
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <MicIcon sx={{ color: '#2196F3' }} /> {/* Blue icon */}
                </ListItemIcon>
                <ListItemText primary="Audio Prediction" />
              </ListItem>
              <ListItem button >
                <ListItemIcon>
                  <ImageIcon sx={{ color: '#2196F3' }} /> {/* Blue icon */}
                </ListItemIcon>
                <ListItemButton onClick={() => navigate('/clientImagePrediction')}>
              <ListItemText primary="Image Prediction" />
                </ListItemButton>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <VideocamIcon sx={{ color: '#2196F3' }} /> {/* Blue icon */}
                </ListItemIcon>
                <ListItemButton onClick={() => navigate('/clientVideoPrediction')}>
              <ListItemText primary="Video Prediction" />
                </ListItemButton>
                
              </ListItem>
            </List>
            <Divider />
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#121212' }}>
          <Toolbar />
          <Container maxWidth="lg">
            {/* Dashboard Header */}
            <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF' }}>
              Prediction Dashboard
            </Typography>

            {/* Total Predictions Card */}
            <Paper sx={{ p: 2, mb: 3, backgroundColor: '#1E1E1E' }}>
              <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
                Total Predictions: {predictions.length}
              </Typography>
            </Paper>

            {/* Pie Chart for Analysis */}
            <Paper sx={{ p: 2, mb: 3, backgroundColor: '#1E1E1E' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                Prediction Analysis
              </Typography>
              <PieChart width={400} height={300}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Paper>

            {/* Recent Predictions Table */}
            <Paper sx={{ p: 2, backgroundColor: '#1E1E1E' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                Recent Predictions
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#FFFFFF' }}>Filename</TableCell>
                      <TableCell sx={{ color: '#FFFFFF' }}>Type</TableCell>
                      <TableCell sx={{ color: '#FFFFFF' }}>Result</TableCell>
                      <TableCell sx={{ color: '#FFFFFF' }}>Timestamp</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {predictions.map((prediction) => (
                      <TableRow key={prediction.id}>
                        <TableCell sx={{ color: '#FFFFFF' }}>{prediction.filename}</TableCell>
                        <TableCell sx={{ color: '#FFFFFF' }}>{prediction.type}</TableCell>
                        <TableCell sx={{ color: '#FFFFFF' }}>{prediction.result}</TableCell>
                        <TableCell sx={{ color: '#FFFFFF' }}>{prediction.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;