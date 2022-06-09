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
import { SimpleAlert } from './components/alert';


export const Main = (props) => {

  return (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <SimpleAlert />
      <BrowserRouter>
        <Routes>
          <Route exact path='/create/attachment/:id' element={<PrivateRoute/>}>
            <Route path="/create/attachment/:id" element={<CreateAttachment />} />
          </Route>
          <Route exact path='/create/document' element={<PrivateRoute/>}>
            <Route path="/create/document" element={<CreateDocument />} />
          </Route>
          <Route exact path='/attachment/:contract_id/:id' element={<PrivateRoute/>}>
            <Route path="/attachment/:contract_id/:id" element={<Attachment />} />
          </Route>
          <Route exact path='/document/:id' element={<PrivateRoute/>}>
            <Route path="/document/:id" element={<Document />} />
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
