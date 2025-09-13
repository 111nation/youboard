# youboard.

<i align="center">a student focused social media inspired by pinterest</i>

### Idea 
youboard. is a pinterest-like social media targetted towards students who want to share their `#studentliving` life and want to have a platform to meet other students on/off campus.

### Tools & Skills
- React.js
- Figma (UI/UX)
- Firebase

### UI/UX
_Various stages done in order to create the UI and UX experience_

<table>
  <tr>
    <td  width="50%"><img width="95%" align="center" alt="2025-07-17-214312_hyprshot" src="https://github.com/user-attachments/assets/10d09a13-76e0-43c5-a861-ad7a6c7219da" /></td>
    <td>Wireframe: Defining the basic UI layout. The wireframe helps visualise how well the UX is</td>
  </tr>

<tr>
  <td width="50%"><img alt="2025-07-18-175514_hyprshot" src="https://github.com/user-attachments/assets/1544667c-5a87-4c22-aff6-cb0d3f29ded1" /></td>
  <td>Colour Palette: Reusable colours, text and components.</td>
</tr>

<tr>
  <td width="50%"><img alt="2025-07-18-212935_hyprshot" src="https://github.com/user-attachments/assets/7d2c7cf5-3fa7-405f-a06d-4c7814f2e275" /></td>
  <td>Final Figma Design: Result is a beautiful UI design.</td>
</tr>
</table>

### Setting Up 
Make sure you have `npm` installed and run `npm start` to start the React project.

### First Viral Post?

_Seems like the X algorithm really liked my designs!_
<br />
<br />
<img width="50%" alt="image" src="https://github.com/user-attachments/assets/47e0c3e4-3f4b-4694-a9ed-d0e0b0cd6a6e" />

### Users and Profile display

Each user is allocated their own document corresponding to their `uid` under the `/users/` collection in the Firestore Database. Users go through the User class in `src/user.js` to sign in or create a new account. The user class handles storing and retrieving a user's email and username. After successful login, the current user's assigned class is saved under `currentUser` and `localStorage`. Saving the user's information under `currentUser` prevents reading from the Firestore Database wastefully when a page is changed or refreshed, or we need the current user's data. The user class also serves the purpose of fetching other users' data in a structured format.

All existing users' information can be viewed under the `src/pages/Profile/Profile.js` page, which is routed under `/:user`. For example, `/@dualipa` will open the page of *dualipa*. The *Profile page* loads the user's information **once**, then passes it down to child elements, for example, `src/components/Profiles/BigProfile.js`. This data gets passed down instead of being reread from the database. There might be multiple sub-components that take up their own read request! Pop-ups will be used to guide users through errors or loading. The pop-up component is under `src/components/PopUp/PopUp.js`

<div width="40%"><video src="https://github.com/user-attachments/assets/09cfeb77-971a-457a-b1ea-b58f79272bed"></video></div>

