import { useState, useEffect } from "react";
import personServices from "./services/persons";

const Filter = (props) => (
  <div>
    filter shown with{" "}
    <input value={props.newFilter} onChange={props.handleFilterChange} />
  </div>
);

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number:{" "}
      <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = (props) => (
  <div>
    {props.persons
      .filter((person) => person.name.toLowerCase().includes(props.newFilter))
      .map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => props.deletePerson(person.id)}>delete</button>
        </p>
      ))}
  </div>
);

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [sucessMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const msg = `${personObject.name} is already added to phonebook, replace the old number with a new one?`;

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      if (window.confirm(msg)) {
        const existingPerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        personServices
          .update(existingPerson.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            );
            displaySuccessMsg(`Updated ${newName}`);
          })
          .catch(() => {
            displayErrorMsg(
              `Information of ${newName} has already been removed from server`
            );
          });
      }
    } else {
      personServices.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      displaySuccessMsg(`Added ${newName}`);
    }
    setNewNumber("");
    setNewName("");
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`delete ${person.name}`)) {
      personServices
        .deleteP(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          displaySuccessMsg(`Deleted ${person.name}`);
        })
        .catch(() => {
          displayErrorMsg(
            `Information of ${person.name} has already been removed from server`
          );
        });
    }
  };

  const displaySuccessMsg = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const displayErrorMsg = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={sucessMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
