import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import AddNotes from "./pages/AddNotes";
import { useEffect, useState } from "react";
import { getNotesData } from "./service/NoteService";

function App() {
    const [notes, setNotes] = useState([]);
    const [paginationData, setPaginationData] = useState({
        records: 0
    });
    const [filterText, setFilterText] = useState("");

    const filteredNotes = filterText === "" ? notes : notes?.filter((each) => each?.category === filterText);

    useEffect(() => {
        getNotes();
    }, []);

    async function getNotes(){
        await getNotesData().then((res) => {
            if (res?.status === 200) {
                setNotes(res?.data?.results);
                setPaginationData((prev) => ({
                    ...prev,
                    records: res?.data?.count
                }))
            }
        })
    }

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage notes={filteredNotes} paginationData={paginationData} setFilterText={setFilterText} filterText={filterText} />} />
            <Route path="/add-note" element={<AddNotes getNotes={getNotes} />} />
        </Route>
    ))

    return <RouterProvider router={router} />
}

export default App;
