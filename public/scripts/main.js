import Modal from './modal.js'
const modal = Modal()

const modalTitle = document.querySelector(".modal h2")
const modalDescription = document.querySelector(".modal p")
const modalButton = document.querySelector(".modal button")
const modalForm = document.querySelector(".modal form")

const checkButtons = document.querySelectorAll(".actions a.check")
checkButtons.forEach (button => {
    button.addEventListener("click", (event) => handleClick(event))
})

const deleteButtons = document.querySelectorAll(".actions a.delete")
deleteButtons.forEach (button => {
    button.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true) {
    event.preventDefault()
    const text = check ? "Marcar como lida" : "Excluir"
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id
    const actionId = check? "read" : "delete"

    modalForm.setAttribute("action", `/question/${roomId}/${questionId}/${actionId}`)

    modalTitle.innerHTML = `${text} está pergunta`
    modalDescription.innerHTML = `Tem certesa que deseja ${text.toLowerCase()} está pergunta?`
    modalButton.innerHTML = `Sim, ${text}`
    check? modalButton.classList.remove("red") : modalButton.classList.add("red") 

    modal.open()
}
