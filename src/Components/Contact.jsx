import React from "react";
import "./Contact.css";

const Contact = ({ contact }) => {
  const { name, popularity, pictureUrl, id, wonOscar, wonEmmy } = contact;
  return (
    <tr key={id} className="Contact">
      <td>
        <picture>
          <img src={pictureUrl} alt={name} />
        </picture>
      </td>
      <td>{name}</td>
      <td>{popularity}</td>
    </tr>
  );
};

export default Contact;
