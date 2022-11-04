import {BrowserRouter, Route, Routes} from 'react-router-dom';
import 'antd/dist/antd.css';
import './sass/main.scss';
import ActivitiesForm from './Components/Activities/ActivitiesForm';
import CategoriesForm from './Components/Categories/CategoriesForm';
import NewsForm from './Components/News/NewsForm';
import SlidesForm from './Components/Slides/SlidesForm';
import TestimonialForm from './Components/Testimonials/TestimonialsForm';
import UserForm from './Components/Users/UsersForm';
import SchoolCampaign from './Campaigns/School/SchoolCampaign';
import ToysCampaign from './Campaigns/Toys/ToysCampaign';
import MembersForm from './Components/Members/MembersForm';
import ProjectsForm from './Components/Projects/ProjectsForm';
import Login from './Components/Login/Login'
import { BackOfficeDashboard } from './Pages/backoffice/BackOfficeDashboard';
import { Register } from './Pages/Register'
import { OrganizationInfo } from './Pages/backoffice/OrganizationInfo'
import { Contact } from './Components/Contact/Contact';




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" exact component={} />           Esta ruta debe ser para el Home */}
          <Route path="/login" element={<Login/>} />
          <Route path="/create-activity" element={<ActivitiesForm/>} />
          <Route path="/create-category" element={<CategoriesForm/>} />
          <Route path="/create-news" element={<NewsForm/>} />
          <Route path="/backoffice" element={<BackOfficeDashboard/>} />
          <Route path="/backoffice/organizacion" element={<OrganizationInfo/>} />
          <Route path="/backoffice/create-slide" element={<SlidesForm/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/create-testimonials" element={<TestimonialForm/>} />
          <Route path="/create-user" element={<UserForm/>} />
          <Route path="/create-member" element={<MembersForm/>} />
          <Route path="/create-project" element={<ProjectsForm/>} />
          <Route path="/school-campaign" element={<SchoolCampaign/>} />
          <Route path="/toys-campaign" element={<ToysCampaign/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/subscribe-form" element={<SubscribeForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
