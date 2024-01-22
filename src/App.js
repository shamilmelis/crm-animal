import React from 'react'
import {Routes, Route} from "react-router-dom";
import MyOrganizationPage from "./Pages/My-Organization-Page";
import HomePage from "./Pages/Home-Page";
import BuyPage from "./Pages/Buy-Page";
import TasksPage from "./Pages/Tasks-Page";
import OrganizInfo from "./Pages/Organiz-Info";
import AnnouncementPage from "./Pages/Announcement-Page";
function App() {
  return (
    <>
      <Routes>
          <Route path={'/'} element={<MyOrganizationPage></MyOrganizationPage>}></Route>
          <Route path={'/tasks'} element={<TasksPage></TasksPage>}></Route>
          <Route path={'/myorgs/v-teplye-ryki'} element={<OrganizInfo></OrganizInfo>}></Route>
          <Route path={'/myorgs/v-teplye-ryki/announcement/:id'} element={<AnnouncementPage></AnnouncementPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
