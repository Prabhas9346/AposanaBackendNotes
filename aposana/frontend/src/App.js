import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Notes from './components/Notes';
import ArchievedNotes from './components/ArchievedNotes';
import TrashedNotes from './components/TrashedNotes';

import './App.css';

const App = () => (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/SignUp/" element={<SignUp />} />
            <Route path="/Notes/:label?" element={<Notes />} />
            <Route path="/Archieved" element={<ArchievedNotes />} />
            <Route path="/Trashed" element={<TrashedNotes />} />{' '}
            {/* Update this line */}
        </Routes>
    </BrowserRouter>
);

export default App;
