import React from 'react';
import '../App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../redux/store';
import { NotFound, PrivateRoute, PublicRoute } from '../routes';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../them';
import { CssBaseline } from '@mui/material';
import { Login, Profile, Register, Documents, Document, Attachment, CreateDocument, CreateAttachment} from './pages';


export const Main = (props) => {

  return (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route exact path='/create/attachment' element={<PrivateRoute/>}>
            <Route path="/create/attachment" element={<CreateAttachment />} />
          </Route>
          <Route exact path='/create/document' element={<PrivateRoute/>}>
            <Route path="/create/document" element={<CreateDocument />} />
          </Route>
          <Route exact path='/attachment' element={<PrivateRoute/>}>
            <Route path="/attachment" element={<Attachment />} />
          </Route>
          <Route exact path='/document' element={<PrivateRoute/>}>
            <Route path="/document" element={<Document />} />
          </Route>
          <Route exact path='/profile' element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route exact path='/documents' element={<PrivateRoute/>}>
            <Route path="/documents" element={<Documents />} />
          </Route>
          <Route exact path='/login' element={<PublicRoute/>}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route exact path='/' element={<PublicRoute/>}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route exact path='/reg' element={<PublicRoute/>}>
            <Route path="/reg" element={<Register />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>)
};
