import { Box, Button, Card, CardActions, CardContent, Divider, FormControl, InputLabel, MenuItem, Select, Stack, styled, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteNoteData, saveNoteData, updateNoteData } from "../service/NoteService";
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(() => ({
    borderRadius: '12px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Access shadows from theme
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }));

function AddNotes({
    getNotes = () => {}
}) {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [formObj, setFormObj] = useState({
        title: "",
        body: "",
        category: ""
    });


    useEffect(() => {
        if (state?.note) {
            setFormObj((prev) => ({
                ...prev,
                id: state?.note?.id,
                title: state?.note?.title,
                body: state?.note?.body,
                category: state?.note?.category
            }))
        }
    }, [state])


    function changeHandler(name, value) {
        setFormObj((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function saveNote() {
        if (formObj?.id) {
            await updateNoteData(formObj).then((res) => {
                if (res?.status === 200) {
                    toast.success('Note updated successfully.');
                } else {
                    toast.error('Error while updating note.');
                }
            });
        } else {
            await saveNoteData(formObj).then((res) => {
                if (res?.status === 201) {
                    toast.success('Note created successfully.');
                    resetState();
                } else {
                    toast.error('Error while creating note.');
                }
            });
        }
        getNotes();
    }

    async function deleteNode() {
        await deleteNoteData(formObj?.id).then((res) => {
            if (res?.status === 200) {
                resetState();
                getNotes();
                navigate('/')
            } else {
                toast.error('Unable to delete note.')
            }
        })
    }

    function resetState() {
        setFormObj((prev) => ({
            ...prev,
            title: "",
            body: "",
            category: ""
        }))
    }

    return (
        <Box width={700} height={600} ml={70} mt={10}>
            <ToastContainer />
            <StyledCard variant="outlined">
                <CardContent>
                    <Typography variant="h5" textAlign="center" fontWeight="bold">
                        Add New Note
                    </Typography>
                    <Divider sx={{ mt: 1.5, mb: 1.5}} />
                    <Stack spacing={2}>
                        <TextField fullWidth type="text" label="Title" name="title" onChange={(event) => changeHandler(event?.target?.name, event?.target?.value)} value={formObj?.title} />
                        <TextField fullWidth multiline rows={6} label="Content" name="body" onChange={(event) => changeHandler(event?.target?.name, event?.target?.value)} value={formObj?.body} />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Note's Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"

                                id="demo-simple-select"
                                defaultValue="0"
                                label="Note's Category"
                                onChange={(e) => changeHandler("category", e?.target?.value)}
                                value={formObj?.category}
                            >
                                <MenuItem value="0" disabled>Pick a category</MenuItem>
                                <MenuItem value="BUSINESS">Business</MenuItem>
                                <MenuItem value="PERSONAL">Personal</MenuItem>
                                <MenuItem value="IMPORTANT">Important</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack >
                </CardContent>
                <CardActions>
                    {formObj?.id ? (
                        <Stack spacing={3} direction={"row"} ml="auto" mr="auto">
                            <Button fullWidth variant="outlined" color="primary" onClick={saveNote}>Update</Button>
                            <Button fullWidth variant="outlined" color="error" onClick={deleteNode}>Delete</Button>
                        </Stack>
                    ) : (
                        <Button fullWidth variant="contained" color="primary" onClick={saveNote}>Add Note</Button>
                    )}
                </CardActions>
            </StyledCard>
        </Box>
    )
}

export default AddNotes;
