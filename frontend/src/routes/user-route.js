import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import VerifyAccount from '../pages/VerifyAccount';
import React from 'react';
import SearchResults from '../pages/SearchResults';
import VideoPlayback from '../pages/VideoPlayback';
import UserProfile from '../pages/UserProfile';
import GoogleAuth from '../pages/GoogleAuth';
import ResetPassword from '../pages/ResetPassword';
import ResetPasswordCallback from '../pages/ResetPasswordCallback';
import PageNotFound from '../pages/PageNotFound';
function UserRoutes() {
    return (
        <Routes>
            <Route index element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register'>
                <Route index element={<Register />} />
                <Route
                    path='confirm-email/:token'
                    element={<VerifyAccount />}
                />
            </Route>
            <Route path='/google-auth' element={<GoogleAuth />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/account'>
                <Route path='reset-password'>
                    <Route index element={<ResetPassword />} />
                    <Route path=':token' element={<ResetPasswordCallback />} />
                </Route>
            </Route>
            <Route path='/videos'>
                <Route index element={<SearchResults />} />
                <Route path=':id' element={<VideoPlayback />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
}

export default UserRoutes;
