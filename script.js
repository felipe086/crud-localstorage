const getLocalStorage = () => JSON.parse(localStorage.getItem('db_Student')) ?? []

const setLocalStorage = (dbStudent) => localStorage.setItem('db_Student', JSON.stringify(dbStudent))

const createAluno = (student) => {
    const dbStudent = getLocalStorage()
    dbStudent.push(student)
    setLocalStorage(dbStudent)
}

const searchStudent = () => getLocalStorage()

const updateStudent = (index, student) => {
    const dbStudent = searchStudent()
    dbStudent[index] = student
    setLocalStorage(dbStudent)
}

const deleteStudent = (index) => {
    const dbStudent = searchStudent()
    dbStudent.splice(index, 1)
    setLocalStorage(dbStudent)
}

const validFields = () => {
    return document.getElementById('form').reportValidity()
}

const saveStudent = () => {
    if (validFields()) {
        const student = {
            name: document.getElementById('txtName').value,
            email: document.getElementById('txtEmail').value,
            course: document.getElementById('txtCourse').value,
            semester: document.getElementById('txtSemester').value
        }
        createAluno(student)
        updateTable()
    }
}

const clearFields = () => {
    const fields = document.querySelectorAll('.data')
    fields.forEach(field => field.value = "")
    updateTable()
}

const createRow = (student, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.semester}º</td>
            <td> <input type="image" src="/img/editar.svg" alt="Editar" id="editarCadastro-${index}"> </td>
            <td> <input type="image" src="/img/deletar.svg" alt="Deletar" id="deletarCadastro-${index}"></td>
        `
    document.querySelector('#tableStudent>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableStudent>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbStudent = searchStudent()
    clearTable()
    dbStudent.forEach(createRow)
}

const editAluno = (index) => {
    const student = searchStudent()[index]
    student.index = index
    preencherCampos(student)
}

const preencherCampos = (student) => {
    document.getElementById('txtName').value = student.name
    document.getElementById('txtEmail').value = student.email
    document.getElementById('txtCourse').value = student.course
    document.getElementById('txtSemester').value = student.semester
}

const editDelete = (event) => {
    if (event.target.type == 'image') {
        const [action, index] = event.target.id.split('-')

        if (action == 'editarCadastro') {
            editAluno(index)
        } else {
            const student = searchStudent()[index]
            const response = confirm(`Deseja realmente excluir o Aluno: ${student.name}. ?`)
            if (response) {
                deleteStudent(index)
                updateTable()
            }
        }
    }
}
updateTable()

document.getElementById('register').addEventListener('click', saveStudent)
document.getElementById('cancel').addEventListener('click', clearFields)
document.querySelector('#tableStudent>tbody').addEventListener('click', editDelete)