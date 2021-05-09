import React, { useEffect, useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showPersons, setShowPersons] = useState([]);

  useEffect(() => {
    setShowPersons(persons);
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
      <div>
        filter shown with <input onChange={filter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {showPersons.map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <h2>Phonebook</h2>

  //     <Filter ... />

  //     <h3>Add a new</h3>

  //     <PersonForm
  //       ...
  //     />

  //     <h3>Numbers</h3>

  //     <Persons ... />
  //   </div>
  // );
};

export default App;