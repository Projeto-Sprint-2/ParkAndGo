const btnAddMarket = document.getElementById('btn-add-market');
const modalAddMarket = document.getElementById('modal-add-mercado');

btnAddMarket.addEventListener('click', openDialog);

function openDialog() {
    modalAddMarket.showModal()
}