import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showPersons, setShowPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
      setShowPersons(response.data);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const checkDuplicates = () => {
    const names = [];
    persons.forEach((p) => names.push(p.name));
    return !names.includes(newName);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const ok = checkDuplicates();
    ok
      ? setPersons(persons.concat({ name: newName, number: newNumber }))
      : window.alert(`${newName} is already added to phonebook`);
    setShowPersons(showPersons.concat({ name: newName, number: newNumber }));

    console.log(showPersons);
    console.log(persons);
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

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <Filter filter={filter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons showPersons={showPersons} />
    </div>
  );
};

export default App;
