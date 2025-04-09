import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const IncidentTracking = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const incidents = [
    {
      id: 'INC-2025-001',
      product: 'Organic Milk',
      issueType: 'Quality Issue',
      status: 'Under Investigation',
      dateReported: '2025-04-08',
      priority: 'High',
      steps: [
        {
          label: 'Complaint Received',
          description: 'Customer reported issue with product quality',
          date: '2025-04-08',
          completed: true,
        },
        {
          label: 'Initial Assessment',
          description: 'Quality team reviewing the complaint',
          date: '2025-04-09',
          completed: true,
        },
        {
          label: 'Investigation',
          description: 'Detailed analysis of the reported issue',
          date: '2025-04-10',
          completed: false,
        },
        {
          label: 'Resolution',
          description: 'Implementing corrective actions',
          date: null,
          completed: false,
        },
      ],
    },
    // Add more incidents as needed
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return 'success';
      case 'Under Investigation':
        return 'warning';
      case 'Pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleOpenDialog = (incident) => {
    setSelectedIncident(incident);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Incident Tracking
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Incident ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Issue Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Date Reported</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>{incident.id}</TableCell>
                <TableCell>{incident.product}</TableCell>
                <TableCell>{incident.issueType}</TableCell>
                <TableCell>
                  <Chip
                    label={incident.status}
                    color={getStatusColor(incident.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={incident.priority}
                    color={getPriorityColor(incident.priority)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{incident.dateReported}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenDialog(incident)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedIncident && (
          <>
            <DialogTitle>
              Incident Details - {selectedIncident.id}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Product: {selectedIncident.product}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Issue Type: {selectedIncident.issueType}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Status: {selectedIncident.status}
                </Typography>

                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                  Progress Timeline
                </Typography>
                <Stepper orientation="vertical">
                  {selectedIncident.steps.map((step, index) => (
                    <Step key={index} active={step.completed}>
                      <StepLabel>
                        {step.label}
                        {step.date && (
                          <Typography variant="caption" display="block">
                            {step.date}
                          </Typography>
                        )}
                      </StepLabel>
                      <StepContent>
                        <Typography>{step.description}</Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>

                <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Add Comment"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button variant="contained" color="primary">
                Update Status
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default IncidentTracking;
