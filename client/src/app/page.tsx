'use client';
import { FormEvent, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [editName, setEditName] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editId, setEditId] = useState('');

  const [resMas, setResMas] = useState(null);

  const fetchData = () => {
    fetch('http://localhost:8080/')
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  const onDelete = (id: any) => {
    fetch(`http://localhost:8080/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.msg) {
          setResMas(response.msg);
          fetchData(); // Refresh the data after deletion
        }
      })
      .catch((error) => console.error('Error deleting book:', error));
  };
  const addBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:8080/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, author }),
    })
      .then((res) => res.json())
      .then((res) => {
        setResMas(res.msg);
        fetchData();
      });
  };
  const edd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:8080/update/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editName, author: editAuthor }),
    })
      .then((res) => res.json())
      .then((res) => {
        setResMas(res.new);
        fetchData();
      });
  };
  return (
    <main>
      <div className="border bg-slate-50">
        <button
          onClick={fetchData}
          className="p-4 bg-yellow-300 ">
          fetch data
        </button>
        <form
          onSubmit={(e) => addBook(e)}
          className="bg-blue-100">
          <input
            required
            className="border"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            className="border"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button className="bg-red-400 p-4 ">Add new book</button>
        </form>
        <form
          onSubmit={(e) => edd(e)}
          className="bg-blue-100">
          <input
            required
            className="border"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            required
            className="border"
            value={editAuthor}
            onChange={(e) => setEditAuthor(e.target.value)}
          />
          <button className="bg-green-500 p-2">Edit</button>
        </form>
        {data ? (
          <div>
            {data.data.map((e: { _id }) => (
              <div
                className="border-2"
                key={e._id}>
                <p>{e._id}</p>
                <p>{e.name}</p>
                <p>{e.author}</p>
                <button
                  className="bg-red-500 p-2"
                  onClick={() => onDelete(e._id)}>
                  Delete
                </button>
                <button
                  className="bg-blue-500 p-2"
                  onClick={() => setEditId(e._id)}>
                  edit
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No data</p>
        )}
      </div>
    </main>
  );
}
