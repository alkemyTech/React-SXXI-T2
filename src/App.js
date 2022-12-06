import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ActivitiesForm from './Components/Activities/ActivitiesForm';
import CategoriesForm from './Components/Categories/CategoriesForm';
import NewsForm from './Components/News/NewsForm';
import SlidesForm from './Components/Slides/SlidesForm';
import TestimonialForm from './Components/Testimonials/TestimonialsForm';
import UsersForm from './Components/Users/UsersForm';
import SchoolCampaign from './Campaigns/School/SchoolCampaign';
import ToysCampaign from './Campaigns/Toys/ToysCampaign';
import MembersForm from './Components/Members/MembersForm';
import ProjectsForm from './Components/Projects/ProjectsForm';
import Login from './Pages/Login'
import CategoriesList from './Pages/CategoriesList/CategoriesList';
import Edit from './Components/BackOffice/Organization/Edit'
import { BackOfficeDashboard, OrganizationInfo, Register, News, NewsTable } from './Pages';
import { Contact } from './Pages/Contact/Contact';
import { HomeForm } from './Components/BackOffice/HomeForm/HomeForm';
import { Home } from './Pages/Home';
import { About } from './Pages/About/About';
import { Thanks } from './Pages/Thanks/Thanks';
import ActivitiesList from './Components/Activities/ActivitiesList';
import ActivitieDetail from './Components/Activities/ActivitieDetail'
import NewsDetail from './Components/News/NewsDetail';

import SlidesList from './Pages/SlidesList/SlidesList';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />    
          <Route path="/login" element={<Login/>} />
          <Route path="/about" element={<About />} />
          <Route path="/create-activity" element={<ActivitiesForm/>} />
          <Route path="/backoffice/create-categories" element={<CategoriesForm/>} />
          <Route path="/backoffice/edit-categories/:id" element={<CategoriesForm/>} />
          <Route path="/create-news" element={<NewsForm/>} />
          <Route path="/backoffice" element={<BackOfficeDashboard/>} />
          <Route path="/backoffice/organizacion" element={<OrganizationInfo/>} />
          <Route path="/backoffice/organization/edit/:id" element={<Edit/>} />
          <Route path="/backoffice/create-slide" element={<SlidesForm/>} />
          <Route path="/backoffice/news" element={<NewsTable />} />
          <Route path="/backoffice/edit-slide/:id" element={<SlidesForm/>} />
          <Route path="/backoffice/create-testimonials" element={<TestimonialForm/>} />
          <Route path="/backoffice/edit-testimonials/:id" element={<TestimonialForm/>} />
          <Route path="/backoffice/home" element={<HomeForm />} />
          <Route path="/backoffice/user/:id" element={<UsersForm/>} />
          <Route path="/backoffice/user" element={<UsersForm/>} />
          <Route path="/backoffice/categories" element={<CategoriesList/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/thanks" element={<Thanks/>} />
          <Route path="/backoffice/slides" element={<SlidesList/>} />
          <Route path="/backoffice/create-member" element={<MembersForm/>} />
          <Route path="/backoffice/edit-member/:id" element={<MembersForm/>} />
          <Route path="/create-project" element={<ProjectsForm/>} />
          <Route path="/school-campaign" element={<SchoolCampaign/>} />
          <Route path="/toys-campaign" element={<ToysCampaign/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/activities" element={<ActivitiesList/>} />
          <Route path="/activities/:id" element={<ActivitieDetail/>} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;