document.addEventListener('DOMContentLoaded', function () {
    const supabase = createClient('https://yspcyealkcwasxviwpml.supabase.co', 'your-api-key');

    const homeworkList = document.getElementById('homeworkList');
    const notesList = document.getElementById('notesList');
    const homeworkForm = document.getElementById('homeworkForm');
    const notesForm = document.getElementById('notesForm');

    // Load data from Supabase on page load
    loadFromSupabase();

    // Event listener for adding homework
    homeworkForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const homeworkTitle = document.getElementById('homeworkTitle').value.trim();
        if (homeworkTitle) {
            addHomework(homeworkTitle);
        }
    });

    // Event listener for adding notes
    notesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const notesTitle = document.getElementById('notesTitle').value.trim();
        if (notesTitle) {
            addNotes(notesTitle);
        }
    });

    // Function to add homework to Supabase
    async function addHomework(title) {
        const { data, error } = await supabase.from('homework').upsert([
            { title: title }
        ]);
        if (!error) {
            loadFromSupabase();
            document.getElementById('homeworkTitle').value = '';
        } else {
            console.error('Error adding homework:', error.message);
        }
    }

    // Function to add notes to Supabase
    async function addNotes(title) {
        const { data, error } = await supabase.from('notes').upsert([
            { title: title }
        ]);
        if (!error) {
            loadFromSupabase();
            document.getElementById('notesTitle').value = '';
        } else {
            console.error('Error adding notes:', error.message);
        }
    }

    // Function to delete an item from Supabase
    async function deleteItem(table, id) {
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (!error) {
            loadFromSupabase();
        } else {
            console.error(`Error deleting item from ${table}:`, error.message);
        }
    }

    // Function to update an item in Supabase
    async function updateItem(table, id, title) {
        const { error } = await supabase.from(table).upsert([{ id, title }]);
        if (!error) {
            loadFromSupabase();
        } else {
            console.error(`Error updating item in ${table}:`, error.message);
        }
    }

    // Function to load data from Supabase
    async function loadFromSupabase() {
        const { data: homeworkData, error: homeworkError } = await supabase.from('homework').select('*');
        const { data: notesData, error: notesError } = await supabase.from('notes').select('*');

        if (!homeworkError) {
            renderList(homeworkList, homeworkData, 'homework');
        } else {
            console.error('Error fetching homework:', homeworkError.message);
        }

        if (!notesError) {
            renderList(notesList, notesData, 'notes');
        } else {
            console.error('Error fetching notes:', notesError.message);
        }
    }

    // Function to render a list
    function renderList(listElement, data, type) {
        listElement.innerHTML = '';
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.title;

            // Add buttons for update and delete
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', () => {
                const newTitle = prompt(`Enter new title for ${type}:`, item.title);
                if (newTitle) {
                    updateItem(type, item.id, newTitle);
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                if (confirm(`Are you sure you want to delete this ${type}?`)) {
                    deleteItem(type, item.id);
                }
            });

            listItem.appendChild(updateButton);
            listItem.appendChild(deleteButton);

            listElement.appendChild(listItem);
        });
    }

    // Subscribe to real-time changes
    supabase.from('homework').on('INSERT', () => loadFromSupabase());
    supabase.from('homework').on('UPDATE', () => loadFromSupabase());
    supabase.from('homework').on('DELETE', () => loadFromSupabase());

    supabase.from('notes').on('INSERT', () => loadFromSupabase());
    supabase.from('notes').on('UPDATE', () => loadFromSupabase());
    supabase.from('notes').on('DELETE', () => loadFromSupabase());
});
