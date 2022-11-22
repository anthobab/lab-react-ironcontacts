// import logo from "./logo.svg";
import "./App.css";
import contacts from "./contacts.json";
import Contact from "./Components/Contact";
import { useState } from "react";

function App() {
  const [contactsArray, setContactsArray] = useState(contacts.slice(5, 10));
  const [sorted, setSorted] = useState("no");

  const handleAddRandomContacts = () => {
    const copyCurrentContactsArray = [...contactsArray];

    copyCurrentContactsArray.push(
      contacts.filter((el) => {
        console.log(!copyCurrentContactsArray.includes(el));
        return !copyCurrentContactsArray.includes(el);
      })[
        Math.floor(
          Math.random() * (contacts.length - copyCurrentContactsArray.length)
        )
      ]
    );

    setContactsArray(copyCurrentContactsArray);
  };

  const handleSortByPopularity = () => {
    const copy = [...contactsArray];
    copy.sort((a, b) => {
      return sorted === "popularityAcs"
        ? a.popularity - b.popularity
        : b.popularity - a.popularity;
    });

    sorted === "popularityAcs"
      ? setSorted("popularityDesc")
      : setSorted("popularityAcs");

    setContactsArray(copy);
  };

  const handleSortByName = () => {
    const copy = [...contactsArray];
    copy.sort((a, b) =>
      sorted === "nameAcs"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    );

    sorted === "nameAcs" ? setSorted("nameDesc") : setSorted("nameAcs");
    setContactsArray(copy);
  };

  const handleDelete = (id) => {
    setContactsArray([...contactsArray].filter((el) => el.id !== id));
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div className="button-container"></div>
      {contacts.length - contactsArray.length ? (
        <button onClick={handleAddRandomContacts}>Add Random Contact</button>
      ) : (
        ""
      )}
      <button onClick={handleSortByPopularity}>Sort by popularity</button>
      <button onClick={handleSortByName}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactsArray.map((contact) => (
            <tr key={contact.id} className="Contact">
              <td>
                <picture>
                  <img src={contact.pictureUrl} alt={contact.name} />
                </picture>
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? "🏆" : ""}</td>
              <td>{contact.wonEmmy ? "🏆" : ""}</td>
              <td>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
