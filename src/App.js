import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store/store";

import SchoolCampaign from "./Campaigns/School/SchoolCampaign";
import ToysCampaign from "./Campaigns/Toys/ToysCampaign";

import {
  Home,
  Login,
  About,
  Contact,
  Thanks,
  Error404,
  Register,
  BackOfficeDashboard,
  UsersTable,
  UserForm,
  CategoriesList,
  SlidesList,
  MembersList,
  OrganizationInfo,
  News,
  NewsTable,
} from "./Pages";

import {
  ActivitiesForm,
  ActivityDetail,
  ActivitiesList,
  HomeForm,
  Edit,
  Layout,
  CategoriesForm,
  NewsForm,
  NewsDetail,
  SlidesForm,
  TestimonialForm,
  MembersForm,
  ListMembers,
  ProjectsForm,
  Protected,
} from "./Components";

const ROLES = {
  'Admin': 1,
  'Standard': 2
}

function App() {
  return (
    <>
      <BrowserRouter>

        <Provider store={store}>
          <Layout>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/thanks" element={<Thanks />} />
              <Route path="/school-campaign" element={<SchoolCampaign />} />
              <Route path="/toys-campaign" element={<ToysCampaign />} />

              <Route element={<Protected allowedRoles={[ROLES.Admin]} />}>
                <Route path="/backoffice" element={<BackOfficeDashboard />} />
                <Route path="/backoffice/home" element={<HomeForm />} />

                <Route path="/backoffice/create-categories" element={<CategoriesForm />} />
                <Route path="/backoffice/edit-categories/:id" element={<CategoriesForm />} />

                <Route path="/backoffice/organization" element={<OrganizationInfo />} />
                <Route path="/backoffice/organization/edit/:id" element={<Edit />} />

                <Route path="/backoffice/create-slide" element={<SlidesForm />} />
                <Route path="/backoffice/edit-slide/:id" element={<SlidesForm />} />

                <Route path="/backoffice/create-testimonials" element={<TestimonialForm />} />
                <Route path="/backoffice/edit-testimonials/:id" element={<TestimonialForm />} />

                <Route path="/backoffice/user" element={<UserForm />} />
                <Route path="/backoffice/user/:id" element={<UserForm />} />
                <Route path="/backoffice/users" element={<UsersTable />} />

                <Route path="/backoffice/categories" element={<CategoriesList />} />

                <Route path="/backoffice/members" element={<MembersList />} />
                <Route path="/backoffice/create-member" element={<MembersForm />} />
                <Route path="/backoffice/edit-member/:id" element={<MembersForm />} />

                <Route path="/create-project" element={<ProjectsForm />} />

                <Route path="/backoffice/slides" element={<SlidesList />} />
                <Route path="/backoffice/create-activity" element={<ActivitiesForm />} />

                <Route path="/backoffice/news" element={<NewsTable />} />
                <Route path="/backoffice/create-news" element={<NewsForm />} />
                <Route path="/backoffice/edit-news/:id" element={<NewsForm />} />

              </Route>


              <Route path="/activities" element={<ActivitiesList />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />

              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />

              <Route path="/members" element={<ListMembers />} />

              <Route path="*" element={<Error404 />} />
            </Routes>
          </Layout>
        </Provider>

      </BrowserRouter>
    </>
  );
}

export default App;
