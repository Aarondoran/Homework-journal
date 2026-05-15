let homework = []/*Loads homework variable */

    const fileInput = document.getElementById('fileInput')/*File input code here*/
    fileInput.addEventListener('change', loadHomework)

/*Add homework function by laoding the users inputs*/
    function addHomework() {
      const title = document.getElementById('title').value.trim()
      const subject = document.getElementById('subject').value.trim()
      const dueDate = document.getElementById('dueDate').value
      const notes = document.getElementById('notes').value.trim()

    /*Check if user typed everything in */
        if (!title || !subject || !dueDate) {
        alert('Please complete all required fields.')
        return
      }

      homework.unshift({
        id: Date.now(),
        title,
        subject,
        dueDate,
        notes,
        completed: false
      })

   /*Runs load homework function*/
        renderHomework()

      document.getElementById('title').value = ''
      document.getElementById('subject').value = ''
      document.getElementById('dueDate').value = ''
      document.getElementById('notes').value = ''
    }

  /*Load homework fucntion*/  
function renderHomework() {
      const homeworkList = document.getElementById('homeworkList')

      if (homework.length === 0) {
        homeworkList.innerHTML = `
          <div class="panel empty">
            <h2>No Homework Yet</h2>
            <p>Add homework assignments to get started.</p>
          </div>
        `
        return
      }

      homeworkList.innerHTML = '<div class="homework-grid"></div>'

      const grid = homeworkList.querySelector('.homework-grid')

      homework.forEach(item => {
        const card = document.createElement('div')
        card.className = 'homework-card'

        card.innerHTML = `
          <div class="status ${item.completed ? 'completed-status' : 'pending'}">
            ${item.completed ? 'Completed' : 'Pending'}
          </div>

          <div class="subject">${item.subject}</div>

          <h3 class="${item.completed ? 'completed-title' : ''}">
            ${item.title}
          </h3>

          <div class="due-date">
            Due: ${item.dueDate}
          </div>

          <div class="notes">
            ${item.notes || 'No notes added.'}
          </div>

          <div class="card-actions">
            <button class="done-btn" onclick="toggleComplete(${item.id})">
              ${item.completed ? 'Undo' : 'Done'}
            </button>

            <button class="delete-btn" onclick="deleteHomework(${item.id})">
              Delete
            </button>
          </div>
        `

        grid.appendChild(card)
      })
    }

  /*Function for completing homework button */
function toggleComplete(id) {
      homework = homework.map(item => {
        if (item.id === id) {
          item.completed = !item.completed
        }

        return item
      })

      renderHomework()
    }

   /*to delete homework items*/
function deleteHomework(id) {
      homework = homework.filter(item => item.id !== id)
      renderHomework()
    }

    /*to save homework items*/
function saveHomework() {
      const data = JSON.stringify(homework, null, 2)
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'homework-data.json'
      link.click()

      URL.revokeObjectURL(url)
    }

   /*to load homework*/
function loadHomework(event) {
      const file = event.target.files[0]

      if (!file) return

      const reader = new FileReader()

      reader.onload = function(e) {
        try {
          const data = JSON.parse(e.target.result)

          if (Array.isArray(data)) {
            homework = data
            renderHomework()
          } else {
            alert('Invalid file format.')
          }
        } catch {
          alert('Could not load homework file.')
        }
      }

      reader.readAsText(file)
    }

 /*runs load homework function*/
renderHomework()
