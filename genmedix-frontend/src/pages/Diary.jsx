import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useStoreActions, useStoreState } from 'easy-peasy';

const Diary = () => {
  const user = useStoreState(state => state.user)
  const name = user.displayName
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('')
  const title = useStoreState(state => state.title)
  const setTitle = useStoreActions(actions => actions.setTitle)
  const description = useStoreState(state => state.description)
  const setDescription = useStoreActions(actions => actions.setDescription)
  const notes = useStoreState(state => state.notes)
  const setNotes = useStoreActions(actions => actions.setNotes)
  const fetchNotes = useStoreActions(actions => actions.fetchNotes)
  const addNote = useStoreActions(actions => actions.addNote)
  const deleteNote = useStoreActions(actions => actions.deleteNote)
  const saveEdit = useStoreActions(actions => actions.saveEdit)
  const isOpen = useStoreState(state => state.isOpen)
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (name) {
      fetchNotes(name)
    }
  }, [name]);

  const openModal = (id, type) => {
    setIsModalOpen(true);
    setModalType(type)
    if (id) {
      const note = notes.filter(note => note.id === id)
      setEditId(note[0].id); // Set the index of the note being edited
      setTitle(note[0].title); // Populate the modal fields with the note's current title
      setDescription(note[0].description); // Populate the modal fields with the note's current description
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null); // Reset the edit index when modal is closed
    setTitle('');
    setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newNote = {
      title: title,
      description: description,
      createdAt: new Date(),
      userId: name
    }

    addNote(newNote)
    closeModal();
  };

  const handleDelete = (id) => {
    deleteNote(id)
  };

  const handleEdit = async (id) => {
    const updatedNote = { id, title: title, description: description, }
    saveEdit(updatedNote)
    setNotes(notes.map(note => note.id === id ? {...note, title: title, description:description} : note));
    closeModal();
  };

  return (
    <div className="bg-gray-800 h-screen leading-7 text-white w-screen overflow-auto">
      <Header />
      <section className={`pb-8 h-[92%] w-[85%] md:w-[80%] mx-auto overflow-auto transition-all duration-500 ease-in-out ${isOpen && 'md:ml-60'}`}>
        <h1 className="text-2xl font-bold mb-4">Diary</h1>
        <p className="mb-4">Welcome to your personal diary. Here you can create, edit, and view your diary entries.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => openModal(null, 'newNote')} // Pass null as index when adding a new note
        >
          Add Note
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-4 sm:mx-auto">
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Add Note</h2>
                <input
                  type="text"
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="w-full h-40 p-2 mb-4 border rounded text-blue-400"
                  placeholder="Write your note here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  {
                    modalType === 'newNote' &&
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      type='submit'
                    >
                      Save
                    </button>
                  }
                </div>
              </form>
              {
                modalType === 'editNote' &&
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(editId)}
                >
                  Edit
                </button>
              }
            </div>
          </div>
        )}

        <div className="mt-4">
          {notes.map(note => (
            <div key={note.id} className="border border-blue-400 border-4 p-4 rounded mb-2">
              <h3 className="font-bold">{note.title}</h3>
              <p>{note.description.length > 50 ? `${note.description.slice(0, 50)}...` : note.description}</p> {/* Displaying only first 50 characters of description */}
              <div className="flex mt-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                  onClick={() => {
                    openModal(note.id, 'editNote')
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Diary;
