import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import { useRouter } from 'next/router';

export default function Home() {
  const [tutors, setTutors] = useState([]);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/items')
      .then(response => response.json())
      .then(data => setTutors(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, subject }),
    })
      .then(response => response.json())
      .then(data => setTutors([...tutors, data]));
  };

  const handleDelete = (id) => {
    fetch(`/api/items/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTutors(tutors.filter(tutor => tutor.id !== id)));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Campus Tutoring Marketplace</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            Subject:
            <input type="text" value={subject} onChange={(event) => setSubject(event.target.value)} />
          </label>
          <button type="submit">Post Listing</button>
        </form>
        <ul>
          {tutors.map(tutor => (
            <li key={tutor.id}>
              {tutor.name} - {tutor.subject}
              <button onClick={() => handleDelete(tutor.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
