import { createStore, action, thunk } from 'easy-peasy'
// import api from './api/posts'
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from './firebase'

export default createStore({
    email: [],
    setEmail: action((state, payload) => {
        state.email = payload
    }),
    password: '',
    setPassword: action((state, payload) => {
        state.password = payload
    }),
    error: '',
    setError: action((state, payload) => {
        state.error = payload
    }),
    user: '',
    setUser: action((state, payload) => {
        state.user = payload
    }),
    isOpen: false,
    setIsOpen: action((state, payload) => {
        state.isOpen = payload
    }),
    intro: true,
    setIntro: action((state, payload) => {
        state.intro = payload
    }),
    chatMessages: [],
    setChatMessages: action((state, payload) => {
        state.chatMessages = payload
    }),
    stayLoggedOut: false,
    setStayLoggedOut: action((state, payload) => {
        state.stayLoggedOut = payload
    }),
    isModalOpen: [],
    setIsModalOpen: action((state, payload) => {
        state.isModalOpen = payload
    }),
    modalType: '',
    setModalType: action((state, payload) => {
        state.modalType = payload
    }),
    title: '',
    setTitle: action((state, payload) => {
        state.title = payload
    }),
    description: '',
    setDescription: action((state, payload) => {
        state.description = payload
    }),
    notes: [],
    setNotes: action((state, payload) => {
        state.notes = payload
    }),
    editId: '',
    setEditId: action((state, payload) => {
        state.editId = payload
    }),
    dataScores: null,
    setDataScores: action((state, payload) => {
        state.dataScores = payload
    }),
    fetchScores: thunk(async (actions) => {
        const docRef = doc(db, "totalScore", "totalScore");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            actions.setDataScores(docSnap.data());
        } else {
            console.log("No such document!");
        }
    }),
    addScore: thunk(async (actions, totalScore) => {
        const docRef = doc(db, "totalScore", "totalScore");

        await updateDoc(docRef, {
            Happiness: arrayUnion(totalScore),
            Overall_well_being: arrayUnion(totalScore),
            Some_stuff: arrayUnion(totalScore)
        });
        actions.fetchScores()
    }),
    fetchNotes: thunk(async (actions, name) => {
        const q = query(collection(db, "notes"), where("userId", "==", name));

        const querySnapshot = await getDocs(q);
        const newNotes = []
        querySnapshot.docs.map(doc => {
            const newNote = doc.data()
            newNotes.push({ id: doc.id, ...newNote })
        })

        actions.setNotes(newNotes);
    }),
    addNote: thunk(async (actions, newNote, helpers) => {
        const { notes } = helpers.getState();
        if (newNote.title.trim() !== '') {
            // update existing firestore db
            await addDoc(collection(db, "notes"), newNote);
            actions.setNotes([newNote, ...notes]);
        }
        actions.setTitle('');
        actions.setDescription('');
    }),

    deleteNote: thunk(async (actions, id, helpers) => {
        const { notes } = helpers.getState();
        try {
            await deleteDoc(doc(db, "notes", id));
            actions.setNotes(notes.filter(note => note.id !== id));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }),
    saveEdit: thunk(async (actions, updatedNote, helpers) => {
        const { notes } = helpers.getState();
        const { id } = updatedNote;
        try {
            const note = doc(db, "notes", id);
            await updateDoc(note, updatedNote);
        } catch (error) {
            console.error("Error updating document: ", error);
        }

        actions.setTitle('');
        actions.setDescription('');
    }),

    onSendMessage: thunk((actions, chatmessage, helpers) => {
        const { chatMessages } = helpers.getState();
        actions.setChatMessages([
            ...chatMessages,
            chatmessage
        ])
    }),
})
