import { getAll, create, update, remove } from "./services/phonebook";
import React, { useEffect, useState } from "react";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";
import Notification from "./component/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showPersons, setShowPersons] = useState([]);
  const [message, setMessage] = useState({});

  useEffect(() => {
    getAll().then((res) => {
      setPersons(res);
      setShowPersons(res);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const checkDuplicates = () => {
    const ok = persons.filter((p) => p.name === newName);
    console.log(ok);
    return ok[0];
    // const names = [];
    // persons.forEach((p) => names.push(p.name));
    // return !names.includes(newName);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const ok = checkDuplicates();
    console.log(ok);
    if (!ok) {
      const newPerson = { name: newName, number: newNumber };
      create(newPerson)
        .then((res) => {
          setPersons(persons.concat(res));
          setShowPersons(showPersons.concat(res));
          setMessage({ type: "popup", body: `Added ${newName}` });
          setTimeout(() => {
            setMessage({});
          }, 3000);
        })
        .catch((err) => {
          const msg = String(err.response.data.error);
          setMessage({ type: "error", body: msg });
          setTimeout(() => {
            setMessage({});
          }, 3000);
        });
    } else {
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with new one?`
      ) &&
        update(ok.id, { ...ok, number: newNumber }).then((res) => {
          setPersons(persons.map((p) => (p.id !== ok.id ? p : res)));
          setShowPersons(showPersons.map((p) => (p.id !== ok.id ? p : res)));
          setMessage({ type: "popup", body: `Modified ${newName}` });
          setTimeout(() => {
            setMessage({});
          }, 3000);
        });
    }
  };

  const filter = (e) => {
    setShowPersons(persons);
    const n = e.target.value;
    const sp = persons.filter((p) =>
      p.name.toLowerCase().includes(n.toLowerCase())
    );
    setShowPersons(sp);
    console.log(sp);
  };

  const deletePersonWith = (person) => {
    window.confirm(`Delete ${person.name}`) &&
      remove(person.id)
        .then((res) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          setShowPersons(showPersons.filter((p) => p.id !== person.id));
        })
        .catch((err) => {
          setMessage({
            type: "error",
            body: `Information of ${person.name} has already been removed from the server`,
          });
          setTimeout(() => {
            setMessage({});
            window.location.reload();
          }, 3000);
        });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {showPersons.map((person) => {
        return (
          <Persons
            key={person.id}
            person={person}
            deletePerson={() => deletePersonWith(person)}
          />
        );
      })}
    </div>
  );
};

export default App;
