import { Box, MenuItem, Select } from "@mui/material";


function Filter({
    filterText,
    setFilterText = () => {}
}) {
    return (
        <Box display='flex' justifyContent='center'>
                <Select
                    sx={{
                        width: '400px',
                        marginTop: '20px'
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => setFilterText(e?.target?.value)}
                    value={filterText}
                >
                    <MenuItem value="">All Notes</MenuItem>
                    <MenuItem value="BUSINESS">Business</MenuItem>
                    <MenuItem value="PERSONAL">Personal</MenuItem>
                    <MenuItem value="IMPORTANT">Important</MenuItem>
                </Select>
        </Box>
    )
}

export default Filter;
