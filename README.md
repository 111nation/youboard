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

### User log in

Users can log in using Firebase's `createNewUserEmailAndPassword` and `signInWithEmailAndPassword` functions. Each user is allocated their own document corresponding to their `uid` under the `/users/` collection in the Firestore Database. This document will store user profile details like their custom username and email. 
Each follow request will be a document under `/follows/` in the Firestore Database. Each follow document will contain data on which account initiated the follow and which account the follow belongs to. Using queries, we will be able to easily query all follow lists of related accounts.

<div width="40%"><video src="https://github.com/user-attachments/assets/09cfeb77-971a-457a-b1ea-b58f79272bed"></video></div>

