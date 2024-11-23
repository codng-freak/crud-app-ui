import { ToastContainer } from "react-toastify";
import Filter from "../Components/Filter";
import NoteCardContainer from "../Components/NoteCardContainer";
import 'react-toastify/dist/ReactToastify.css';

function HomePage({
    notes,
    paginationData,
    filterText,
    setFilterText = () => {}
}) {
    return (
        <>
            <Filter setFilterText={setFilterText} filterText={filterText} />
            <NoteCardContainer notes={notes} paginationData={paginationData} />
        </>
    )
}

export default HomePage;
