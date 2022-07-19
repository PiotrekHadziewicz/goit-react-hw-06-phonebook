export const ContactList = ({ contacts, filter, deleteHandler }) => {
  return (
    <ul>
      {{ filter } === ''
        ? contacts.items.map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button type="button" onClick={() => deleteHandler(contact.id)}>
                Delete
              </button>
            </li>
          ))
        : contacts.items
            .filter(contact =>
              contact.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map(contact => (
              <li key={contact.id}>
                {contact.name}: {contact.number}
                <button
                  type="button"
                  onClick={() => deleteHandler(contact.id)}
                >
                  Delete
                </button>
              </li>
            ))}
    </ul>
  );
};
