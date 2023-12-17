import axios from 'axios';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { CircularProgressProps } from '@mui/material/CircularProgress';
import { VisuallyHiddenInput } from './VisuallyHiddenInput';


import { route } from '@/common/config/route';
import { UploadCommentResponse } from '../interfaces';
import CircularProgressWithLabel from './CircularProgressWithLabel';

export default function CircularIntegration(
  props: CircularProgressProps & { onUploadSuccess: (data: UploadCommentResponse) => void }
) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [percentCompleted, setPercentCompleted] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log({
      event,
      target: event.target,
      files: event.target.files,
      file: event.target.files?.[0],
      success,
      loading,
      percentCompleted
    });
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      event.target.value = ''; // Clear file input to allow uploading the same file again

      const formData = new FormData();
      formData.append('file', file);

      axios
        .post(route.comments.upload, formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
            setPercentCompleted(percentCompleted);
          }
        })
        .then((response) => {
          props.onUploadSuccess(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  useEffect(() => {
    if (percentCompleted === 100) {
      setSuccess(true);
      setLoading(false);
      setPercentCompleted(0);
    }
  }, [percentCompleted]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button component="label" variant="contained" startIcon={<CloudUpload />} disabled={loading}>
          Upload
          <VisuallyHiddenInput type="file" accept={'.csv'} onChange={handleFileUpload} />
        </Button>
        {loading && <CircularProgressWithLabel value={percentCompleted} />}
      </Box>
    </Box>
  );
}
