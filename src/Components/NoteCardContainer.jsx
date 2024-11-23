import { Box, Grid2 } from "@mui/material";
import NoteCard from "./NoteCard";


function NoteCardContainer({
    notes,
    paginationData
}) {
    return (
        <Box mt={3}>
            <Grid2 container spacing={3}>
                {notes?.map((each) => (
                    <>
                        <Grid2 size={4} key={`Note-${each?.id}`}>
                            <NoteCard note={each} key={each?.id} />
                        </Grid2>
                    </>
                ))}
            </Grid2>
        </Box>
    )
}


export default NoteCardContainer;
