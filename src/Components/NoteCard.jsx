import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


function NoteCard({
    note
}) {
    const navigate = useNavigate();
    const noteBody = `${note?.body?.split(" ").slice(0, 20).join(" ")} ...`
    const categoryType = {
        BUSINESS: "success",
        IMPORTANT: "error",
        PERSONAL: "warning"
    }

    return (
        <Card
        sx={{
          borderRadius: '12px',
          boxShadow: 3,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <CardContent>
          {/* Title */}
          <Typography variant="h6" gutterBottom>
            {note?.title}
          </Typography>

          {/* Date */}
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {moment(note?.created_at).format('DD-MM-YYYY hh:mm A')}
          </Typography>

          {/* Description */}
          <Typography variant="body2" paragraph>
            {noteBody}
          </Typography>

          {/* Tag */}
          <Chip
            label={note?.category}
            color={categoryType[note?.category]}
            size="small"
          />
        </CardContent>

        {/* Actions */}
        <Box sx={{ textAlign: 'right', padding: 1 }}>
          <Button size="small" variant="contained" color="primary" onClick={() => {
            navigate('/add-note', {
                state: {note}
            })
          }}>
            View
          </Button>
        </Box>
      </Card>
    );
}

export default NoteCard;
